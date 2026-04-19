import "./card2.css";
import "./card1.css";
import { useState, useEffect } from "react";
import pro from "./projects.json";
import { getDatabase, ref, child, get } from "firebase/database";

const FALLBACK_PROJECT_IMAGE =
  "https://placehold.co/600x400/1a1a2e/ffffff?text=Project+Preview";

export default function Card2() {
  const [data, setData] = useState(pro);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `projects`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const display = (ele, index) => {
    const handleClick = (e) => {
      if (!ele?.link || ele?.link === "#") {
        e.preventDefault();
        alert("GitHub link not available for this project");
        return;
      }
      // Let the link work normally - don't prevent default
      console.log("Opening GitHub link:", ele.link);
    };

    return (
      <div className="box" key={"ele" + (index + 1)}>
        <div className="card">
          <a 
            href={ele?.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <div className="img-box">
              <img
                src={ele?.thumb || FALLBACK_PROJECT_IMAGE}
                alt={ele?.name || `Project ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_PROJECT_IMAGE;
                }}
              />
            </div>
            <div className="content">
              <h2 className="title">{ele?.name}</h2>
              <p className="copy">Click to view on GitHub</p>
            </div>
          </a>
        </div>
      </div>
    );
  };
  return <>{data.map((ele, index) => display(ele, index))}</>;
}
