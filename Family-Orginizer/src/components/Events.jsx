import Layout from "./Layout";
import Login from "./login";
import useToken from "./useToken";
import UseFetchData from "./FetchEvents";
import { nanoid } from "nanoid";
import AddEventModal from "./addEvent";
import { useState, useEffect } from "react";
import EditEventModal from "./editevent";
import CoordsModal from "./addCoords";

function getUserFromToken(token) {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username;
  } catch {
    return null;
  }
}

function getRoleFromToken(token) {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

function Home() {
  const { token, setToken } = useToken();
  const { events } = UseFetchData(token);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [coordsModalOpen, setCoordsModalOpen] = useState(false);
  const [coordsEventId, setCoordsEventId] = useState(null);

  const openCoordsModal = (id) => {
    setCoordsEventId(id);
    setCoordsModalOpen(true);
  };

  const saveCoords = (eventId, lat, lng) => {
    setEventPositions((prev) => ({
      ...prev,
      [eventId]: { lat, lng },
    }));
  };

  const currentUser = getUserFromToken(token);
  const currentRole = getRoleFromToken(token);

  const [eventPositions, setEventPositions] = useState({});

  useEffect(() => {
    const stored = sessionStorage.getItem("eventPositions");
    if (stored) {
      setEventPositions(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("eventPositions", JSON.stringify(eventPositions));
  }, [eventPositions]);

  const handleAddCoords = (eventId) => {
    const latStr = window.prompt("Latitude (lat) (example 49.1234)");
    const lngStr = window.prompt("Longitude (lng) (example 6.9876)");

    if (!latStr || !lngStr) return;

    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid number");
      return;
    }

    setEventPositions((prev) => ({
      ...prev,
      [eventId]: { lat, lng },
    }));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => {
      const text = (
        (event.event || "") +
        " " +
        (event.location || "") +
        " " +
        (event.date || "") +
        " " +
        (event.requiredItems || "")
      ).toLowerCase();

      const matchesSearch =
        searchTerm.trim() === "" || text.includes(searchTerm.toLowerCase());
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today && matchesSearch;
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  const handleSaveEvent = (eventData) => {
    return fetch("http://localhost:3002/new-event-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((data) => data.json())
      .then(window.location.reload());
  };

  const handleDeleteEvent = (_id) => {
    return fetch("http://localhost:3002/delete-event/${_id}", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    })
      .then((data) => data.json())
      .then(window.location.reload());
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditModal(true);
  };
  const handleUpdateEvent = (event) => {
    return fetch("http://localhost:3002/update-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }).then((data) => data.json());
    // .then(window.location.reload());
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 backdrop-blur-xl min-h-screen">
      <Layout />

      <div className="max-w-3xl mx-auto mt-10 bg-white/80 backdrop-blur rounded-3xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">All Events</h2>
        <button
          onClick={() => setShowModal(true)}
          className="fixed top-4 right-8 bg-gradient-to-br from-indigo-500 to-sky-500 
            text-white px-6 py-3 rounded-full shadow-xl 
            hover:scale-105 active:scale-95 transition-all"
        >
          + Add Event
        </button>
        <AddEventModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
        />
        <EditEventModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          event={selectedEvent}
          onSave={(updatedEvent) => {
            handleUpdateEvent(updatedEvent);

            setShowEditModal(false);
          }}
        />
        <CoordsModal
          isOpen={coordsModalOpen}
          eventId={coordsEventId}
          onClose={() => setCoordsModalOpen(false)}
          onSave={saveCoords}
        />
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Search for Name, Location, Date or Requirements"
            className="input flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {upcomingEvents.length === 0 && (
          <p className="text-gray-500 text-center">No upcoming Events</p>
        )}

        <ul className="space-y-4">
          {upcomingEvents.map((event) => (
            <li
              key={nanoid()}
              className="flex justify-between items-start rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col gap-1 ">
                <span className="text-lg font-semibold text-gray-800">
                  {event.event}
                </span>

                <span className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString("de-DE")}:{" "}
                  {event.startTime} – {event.endTime}
                </span>

                <span className="text-sm text-gray-600">
                  📍 {event.location}
                </span>

                <span className="text-xs text-gray-500 mt-1">
                  Requirements: {event.requiredItems + ""}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Added by: {event.organiser}
                </span>
              </div>
              {(currentRole === "admin" || currentUser === event.organiser) && (
                <div className="justify-items-end">
                  <div className="mt-1">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="self-start px-3 py-1 bg-red-400 text-white rounded-3xl hover:bg-red-500"
                    >
                      X
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className=" self-start px-3 py-1 bg-indigo-400 text-white rounded-3xl hover:bg-indigo-500"
                    >
                      edit Event
                    </button>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => openCoordsModal(event._id)}
                      className=" self-start px-3 py-1 bg-indigo-400 text-white rounded-3xl hover:bg-indigo-500"
                    >
                      add on Map
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
