import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ExpertDetail() {
  const { id } = useParams();

  const [expert, setExpert] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedDate = "2026-02-21";

  const availableSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM"
  ];

  useEffect(() => {
  fetchExpert();
  fetchBookedSlots();

  socket.emit("joinExpert", id);

  socket.on("slotBooked", (data) => {
    if (data.date === selectedDate) {
      setBookedSlots((prev) => [...prev, data.timeSlot]);
    }
  });

  return () => {
    socket.off("slotBooked");
  };
}, [id]);

  const fetchExpert = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/experts/${id}`);
      setExpert(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookedSlots = async () => {
    try {
      const res = await axios.get("http://localhost:5000/bookings", {
        params: { expertId: id }
      });

      const slots = res.data.map((booking) => booking.timeSlot);
      setBookedSlots(slots);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!expert) return <h2>Expert not found</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{expert.name}</h2>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: ⭐ {expert.rating}</p>

      <h3 style={{ marginTop: 20 }}>Available Slots ({selectedDate})</h3>

      <div>
        {availableSlots.map((slot) => (
          <button
            key={slot}
            disabled={bookedSlots.includes(slot)}
            style={{
              margin: 5,
              padding: 10,
              borderRadius: 6,
              backgroundColor: bookedSlots.includes(slot)
                ? "#9ca3af"
                : "#16a34a",
              color: "white",
              border: "none"
            }}
          >
            {slot}
          </button>
        ))}
      </div>

      <br />

      <Link to={`/book/${id}`}>
        <button style={{ padding: 10 }}>Book Now</button>
      </Link>
    </div>
  );
}

export default ExpertDetail;