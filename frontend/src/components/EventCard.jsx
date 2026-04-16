export default function EventCard({ data }) {
  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold">{data.event.name}</h2>
      <p>Organizer: {data.event.Organizer.name}</p>
      <p>Venue: {data.event.Venue.name}</p>
      <p>Capacity: {data.event.Venue.capacity}</p>
      <p className="text-green-600">Tickets Sold: {data.ticketsSold}</p>
      <p className="text-red-500">Remaining: {data.remainingCapacity}</p>
    </div>
  );
}