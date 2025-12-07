import { useState, useEffect } from "react";

export default function CoordsModal({ isOpen, eventId, onClose, onSave }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLat("");
      setLng("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const latNum = parseFloat(lat.replace(",", "."));
    const lngNum = parseFloat(lng.replace(",", "."));

    if (isNaN(latNum) || isNaN(lngNum)) {
      setError("Bitte gültige Zahlen eingeben!");
      return;
    }

    onSave(eventId, latNum, lngNum);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50">
      <div className="mt-10 bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-lg font-semibold mb-4">Add Coordinates</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="49.1234"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              placeholder="6.9876"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white"
            >
              Speichern
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
