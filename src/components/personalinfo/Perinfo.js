import React,{useState,useEffect} from "react";

import "../block.css";
import { getDatabase, ref, child, get } from "firebase/database";
import TypingAnimation from "../TypingAnimation";

export default function Perinfo() {
  const [data, setData] = useState(`A Software Development Engineer at Angel One, with a BTech in Computer Science from the Indian Institute of Technology, Dharwad, completed in August 2024. Academic background includes technical roles such as DevOps Engineer at o9 Solutions, Inc., where contributions were made to development and deployment projects.  

Skilled in concurrent programming, architecture, and system development, with prior experience creating educational video content on Java and Python for Bit.Byte.Binary. Dedicated to leveraging a strong engineering foundation and technical skills to deliver impactful software solutions.`);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `about`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const roles = ["Software Developer", "Full Stack Developer", "Game Developer", "Problem Solver"];

  return (
    <div className="blocks" id="home">
      <div className="imgholder">
        <img
          src="https://avatars.githubusercontent.com/u/66108270?v=4"
          alt="profile Pic"
        />
      </div>
      <div className="textholder">
        <h1>Niteesh Kamal Chaudhary</h1>
        <h2>
          <TypingAnimation texts={roles} speed={150} />
        </h2>
        <p>
          {data}
        </p>
      </div>
    </div>
  );
}
