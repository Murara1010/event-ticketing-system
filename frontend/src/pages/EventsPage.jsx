import { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events/1")
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {event && <EventCard data={event} />}
    </div>
  );
}