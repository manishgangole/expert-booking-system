import { useState } from "react";
import axios from "axios";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/bookings", {
        params: { email }
      });
      setBookings(res.data);
    } catch (error) {
      alert("Error fetching bookings");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>

      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={fetchBookings}>Search</button>

      <div>
        {bookings.map((booking) => (
          <div key={booking._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.timeSlot}</p>
            <p>Status: 
              <span style={{
                color:
                  booking.status === "Pending" ? "orange" :
                  booking.status === "Confirmed" ? "blue" :
                  "green"
              }}>
                {" "}{booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;