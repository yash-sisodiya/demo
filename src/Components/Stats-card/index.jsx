import React from "react";
import "./index.scss";

export default function StatsCard({ label, value }) {
  return (
    <div className="card">
      <div className="cardTitle">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}
