import { useState } from 'react';

export default function App() {
  const [api_message, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApiFetch = async () => {
    setLoading(true); // disable button
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/ai");
      const data = await res.json();
      setMsg(data.message);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching data.");
    } finally {
      setLoading(false); // re-enable button
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <button
        onClick={handleApiFetch}
        disabled={loading} // disable while loading
        className={`relative px-6 py-3 font-semibold text-white rounded-lg shadow-lg transition-transform duration-300
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
      >
        {loading ? "Fetching..." : "Fetch API Data"}
      </button>

      <div className="p-4 text-center text-gray-800 bg-white rounded-lg shadow-md">
        {api_message}
      </div>
    </div>
  );
}
