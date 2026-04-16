import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [events, setEvents] = useState([]);
  // FORM STATE
 const [form, setForm] = useState({
  name: "",
  organizerName: "",
  venueName: "",
  capacity: ""
}); 

//...STATE FOR BUYING TICKETS
const [buyer, setBuyer] = useState({
  name: "",
  email: ""
});

  //....................HTTP requests using Axios....................//
  

  // FORM Related HANDLE and functions

  // GET EVENTS
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:5000/api/events")
      .then(res => setEvents(res.data));
  };

  // HANDLE INPUT
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

  // ADD EVENT
  const addEvent = () => {
  axios.post("http://localhost:5000/api/events", {
  ...form,
  capacity: Number(form.capacity)
  })
  .then(() => {
    fetchEvents();
    setForm({ name: "", organizerName: "", venueName: "", capacity: "" });
  });
};

  // DELETE
  const deleteEvent = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(fetchEvents);
  };

  // end FORM related code 

  // Buy Related HANDLE and functions

  // HANDLE BUYER INPUT
const handleBuyerChange = (e) => {
  setBuyer({
    ...buyer,
    [e.target.name]: e.target.value
  });
};
// BUY TICKET FUNCTION
const buyTicket = (eventId) => {
  axios.post("http://localhost:5000/api/tickets", {
    name: buyer.name,
    email: buyer.email,
    eventId
  })
  .then(() => {
    fetchEvents(); // refresh counts
    setBuyer({ name: "", email: "" });
  })
  .catch(err => {
    alert(err.response?.data?.error || "Error buying ticket");
  });
  
};

// end buy related code

//....................END of HTTP requests using Axios....................//
  return (
    <div className="max-w-5xl mx-auto p-6">
  <h1 className="text-2xl font-bold mb-4">🎫 Event Ticketing System</h1>

      {/* FORM for user input */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-wrap gap-2">
        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-40"

        />

        <input
          name="organizerName"
          placeholder="Organizer"
          value={form.organizerName}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-40"
        />

        <input
          name="venueName"
          placeholder="Venue"
          value={form.venueName}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-40"
        />

        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-40"
        />

        <button
          onClick={addEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th >Event Name</th>
            <th>Organizer</th>
            <th>Venue</th>
            <th>Tickets Sold</th>
            <th>Remaining</th>
            <th>Actions</th>
          </tr>
        </thead>

              <tbody>
                {events.map(event => (
                  <tr key={event.id} className="border-t hover:bg-gray-100 transition">

                    <td>{event.name}</td>
                    <td>{event.organizer}</td>
                    <td>{event.venue}</td>
                    <td className="text-blue-600 font-semibold">{event.ticketsSold}</td>
                    <td className={`font-semibold ${  event.remaining <= 0 ? "text-red-600" : "text-green-600"}`}>  {event.remaining}
</td>

                    <td className="border rounded px-2 py-1 mr-1">
                      {/* BUY FORM */}
                      <input
                        name="name"
                        placeholder="Your name"
                        value={buyer.name}
                        onChange={handleBuyerChange}
                        className="border p-1 mr-1"
                      />

                      <input
                        name="email"
                        placeholder="Email"
                        value={buyer.email}
                        onChange={handleBuyerChange}
                        className="border p-1 mr-1"
                      />

                        <button
                          onClick={() => buyTicket(event.id)}
                          disabled={event.remaining <= 0}
                          className={`px-3 py-1 rounded text-white ${
                            event.remaining <= 0
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {event.remaining <= 0 ? "Full" : "Buy"}
                        </button>
                      {/* DELETE */}
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
      </table>

    </div>
  );
}