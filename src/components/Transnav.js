import React from "react";
import "./navestyle.css";
export default function Transnav() {
  return (
    <div className="navbar">
      <a
        href="#About"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <p>About</p>
      </a>
      <a
        href="#experience"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <p>Experience</p>
      </a>
      <a
        href="#projects"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        <p>Projects</p>
      </a>
    </div>
  );
}
