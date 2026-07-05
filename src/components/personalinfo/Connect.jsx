import "../timeline.css";
import { useEffect } from "react";
export default function Connect() {
  return (
    <div className="expblock" id="contact us">
      <h2>Connect with me:</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "0 2rem",
        }}
      >
        <a href="https://www.linkedin.com/in/niteesh-kamal-chaudhary/">
          <img
            src="https://brandeps.com/icon-download/L/Linkedin-option-icon-vector-01.svg"
            alt="NKC"
            style={{
              maxWidth: "100%",
              minWidth: "1.7rem",
              width: "4rem",
              height: "4rem",
              padding: "1rem",
            }}
          />
        </a>
        <a href="https://www.linkedin.com/in/niteesh-kamal-chaudhary//">
          <img
            src="https://brandeps.com/icon-download/F/Facebook-option-icon-vector-01.svg"
            alt="NKC"
            style={{
              maxWidth: "100%",
              minWidth: "1.7rem",
              width: "4rem",
              height: "4rem",
              padding: "1rem",
            }}
          />
        </a>
        <a href="https://twitter.com/Niteesh12857418">
          <img
            src="https://brandeps.com/icon-download/T/Twitter-icon-vector-19.svg"
            alt="NKC"
            style={{
              maxWidth: "100%",
              minWidth: "1.7rem",
              width: "4rem",
              height: "4rem",
              padding: "1rem",
            }}
          />
        </a>
        <a href="https://www.linkedin.com/in/niteesh-kamal-chaudhary//">
          <img
            src="https://brandeps.com/logo-download/I/Instagram-Icon-logo-vector-01.svg"
            alt="NKC"
            style={{
              maxWidth: "100%",
              minWidth: "1.7rem",
              width: "4rem",
              height: "4rem",
              padding: "1rem",
            }}
          />
        </a>
      </div>
    </div>
  );
}
