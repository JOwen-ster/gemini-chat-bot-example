import { useState } from 'react';

export default function App() {
  const [api_message, setMsg] = useState("");

  const handleApiFetch = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/greeting");
      const data = await res.json();
      setMsg(data.message);
    } catch (err) {
      console.error(err);
      setMsg("Error fetching data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50">
      <button
        onClick={handleApiFetch}
        className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-lg hover:scale-110 transition-transform duration-300"
      >
        Fetch API Data
      </button>

      <div className="p-4 w-80 text-center text-gray-800 bg-white rounded-lg shadow-md">
        {api_message ? api_message : "..."}
      </div>
    </div>
  );
}
