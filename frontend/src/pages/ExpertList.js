import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExpertList() {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/experts")
      .then((res) => {
        setExperts(res.data.experts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching experts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading experts...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Experts</h2>

      {experts.map((expert) => (
        <div
          key={expert._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8
          }}
        >
          <h3>{expert.name}</h3>
          <p>Category: {expert.category}</p>
          <p>Experience: {expert.experience} years</p>
          <p>Rating: ⭐ {expert.rating}</p>

          {/* IMPORTANT: use expert._id */}
          <Link to={`/expert/${expert._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ExpertList;