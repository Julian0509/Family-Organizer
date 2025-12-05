import Layout from "./Layout";
import Login from "./login";
import useToken from "./useToken";
import UseFetchData from "./FetchEvents";
import { nanoid } from "nanoid";
import AddEventModal from "./addEvent";
import { useState } from "react";

function Home() {
  const { token, setToken } = useToken();
  const { events, setEvent } = UseFetchData(token);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today; 
    })
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    const handleSaveEvent = (eventData) => {
    return fetch('http://localhost:3002/new-event-entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(data => data.json())
      .then(window.location.reload());
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
  <div className="bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 backdrop-blur-xl min-h-screen">
    <Layout />

    <div className="max-w-3xl mx-auto mt-10 bg-white/80 backdrop-blur rounded-3xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        All Events
      </h2>
      <button
        onClick={() => setShowModal(true)}
        className="fixed top-4 right-8 bg-gradient-to-br from-indigo-500 to-sky-500 
            text-white px-6 py-3 rounded-full shadow-xl 
            hover:scale-105 active:scale-95 transition-all">
            + Add Event
      </button>
      <AddEventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEvent}
      />

      {upcomingEvents.length === 0 && (
        <p className="text-gray-500 text-center">No upcoming Events</p>
      )}

      <ul className="space-y-4">
        {upcomingEvents.map((event) => (
          <li
            key={nanoid()}
            className="flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <span className="text-lg font-semibold text-gray-800">
              {event.event}
            </span>


            <span className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString("de-DE")}: {event.startTime} – {event.endTime}
            </span>

            <span className="text-sm text-gray-600">
              📍 {event.location}
            </span>

              <span className="text-xs text-gray-500 mt-1">
                Requirements: {event.requiredItems}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                Added by: {event.organiser}
              </span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};



export default Home; 
