import Layout from "./Layout";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "../styles/styling.css";
import Map from "./Map";
import useToken from "./useToken";
import UseFetchData from "./FetchEvents";
import Login from "./login";
import { nanoid } from "nanoid";

function Kalender() {
  const { token, setToken } = useToken();
  const { events } = UseFetchData(token);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventPositions, setEventPositions] = useState({});
  useEffect(() => {
    const stored = sessionStorage.getItem("eventPositions");
    if (stored) {
      setEventPositions(JSON.parse(stored));
    }
  }, []);

  const eventsForSelectedDay = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 backdrop-blur-xl min-h-screen flex flex-col">
      <Layout></Layout>
      <div className="flex flex-1 items-center justify-center mt-7 ">
        <div className="flex gap-10 w-full max-w-6xl px-6 ">
          <div className="shadow-xl rounded-3xl w-full max-w-[500px]  ">
            <Calendar
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
              tileContent={({ date, view }) => {
                if (view !== "month") return null;

                const hasEvent = events.some((event) => {
                  const eventDate = new Date(event.date);
                  return (
                    eventDate.getFullYear() === date.getFullYear() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getDate() === date.getDate()
                  );
                });

                return hasEvent ? (
                  <div className="flex justify-center mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  </div>
                ) : null;
              }}
            ></Calendar>
          </div>
          <div className="w-1/2 max-h-81 bg-[rgba(255,255,255,0.08)] rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] p-6 flex items-start justify-center border border-white/30 overflow-y-auto">
            <ul className="space-y-2 list-none m-0 p-0">
              {[...eventsForSelectedDay]
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((event) => (
                  <li
                    key={nanoid()}
                    className="border border-white rounded-xl p-3 shadow-sm bg-[rgba(255,255,255,0.4)]"
                  >
                    {" "}
                    <strong>{event.event}</strong> at{" "}
                    <strong>{event.location}</strong> from{" "}
                    <strong>
                      {event.startTime} - {event.endTime}
                    </strong>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Map positions={eventPositions} events={events}></Map>
      </div>
    </div>
  );
}

export default Kalender;
