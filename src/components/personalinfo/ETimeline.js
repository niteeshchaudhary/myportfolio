import "../timeline.css";
import { useEffect } from "react";
export default function ETimeline() {
  return (
    <div id="experience" className="expblock" style={{ margin: "0 0 10rem 0" }}>
      <div style={{ margin: "3rem" }}>
        <h1>Experience</h1>
      </div>
      <div className="timeline">
        <div className="container left">
          <div className="content">
            <h2>Technical Team Member</h2>
            <h3>Career Development Cell, IIT Dharwad</h3>
            <h4>Aug 2022 - Present</h4>
            <p>
              Skills: <br />
              ·Django REST Framework <br />· React.js <br />· SQL <br />· Django
            </p>
          </div>
        </div>
        <div className="container right">
          <div className="content">
            <h2>Full-stack Developer</h2>
            <h3>Crony Technovest OPC Pvt. Ltd.</h3>
            <h4>Jan 2022 - Jul 2022</h4>
            <p>
              Skills:
              <br /> Node.js · Web Services API · React.js · Firebase · Cloud
              FirestoreSkills: Node.js · Web Services API · React.js · Firebase
              · Cloud Firestore Back End DeveloperBack End Developer Jan 2022 -
              Feb 2022 · 2 mosJan 2022 - Feb 2022 · 2 mos Skills: REST APIs ·
              Node.js
            </p>
          </div>
        </div>
        <div className="container left">
          <div className="content">
            <h2>AI Intern</h2>
            <h3>InMovidu Technologies Pvt Limited</h3>
            <h4>Dec 2021 - Jan 2022</h4>
            <p>
              Skills: <br />
              PyTorch · NLTK · Natural Language Processing (NLP) · TensorFlow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
