import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "#1e293b",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Expert Booking
      </Link>

      <Link to="/my-bookings" style={{ color: "white", textDecoration: "none" }}>
        My Bookings
      </Link>
    </div>
  );
}

export default Navbar;