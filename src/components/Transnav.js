import React from "react";
import "./navestyle.css";
export default function Transnav() {
  return (
    <div className="navbar">
      <p>About</p>
      <a
        href="#experience"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <p>Experience</p>
      </a>
      <p>Projects</p>
    </div>
  );
}
