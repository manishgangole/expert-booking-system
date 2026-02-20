import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "2026-02-21",
    timeSlot: "",
    notes: ""
  });

  const slots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.timeSlot) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/bookings", {
        ...form,
        expert: id
      });

      alert("Booking successful!");
      navigate(`/expert/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book Session</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br /><br />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <br /><br />

        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <br /><br />

        <select name="timeSlot" onChange={handleChange}>
          <option value="">Select Time Slot</option>
          {slots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <br /><br />

        <textarea name="notes" placeholder="Notes" onChange={handleChange} />
        <br /><br />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;