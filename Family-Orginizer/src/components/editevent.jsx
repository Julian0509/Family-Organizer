import { useState, useEffect } from "react";

export default function EditEventModal({ isOpen, onClose, event, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [requiredItems, setItems] = useState([]);
  const [itemInput, setItemInput] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.event || "");
      setDate(event.date || "");
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setLocation(event.location || "");
      setItems(event.requiredItems || []);
    }
  }, [event]);

  if (!isOpen) return null;
  const addItem = () => {
    if (itemInput.trim() === "") return;
    setItems([...requiredItems, itemInput]);
    setItemInput("");
  };

  const removeItem = (index) => {
    setItems(requiredItems.filter((_, i) => i !== index));
  };

  return (
    <div className=" fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 border-radius-24">
      <div className="mt-10 bg-white/90 backdrop-blur-xl rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Event
        </h2>

        <form
          onSubmit={() =>
            onSave({
              ...event,
              event: title,
              date,
              startTime,
              endTime,
              location,
              requiredItems,
            })
          }
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Titel"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="flex gap-2">
            <input
              type="time"
              className="input w-1/2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
            <input
              type="time"
              className="input w-1/2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div>
            <label className="text-sm font-medium text-gray-700">
              Required Items
            </label>

            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="ex. Wallet"
                className="input"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addItem}
                className="px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {requiredItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 shadow"
            >
              Safe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
