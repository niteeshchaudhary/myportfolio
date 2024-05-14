import React,{useState,useEffect} from "react";

import "../block.css";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Perinfo() {
  const [data, setData] = useState(`I am an aspiring software engineer who enjoys solving puzzles and
  problems. I have strong technical skills and an academic background in
  engineering, coding and development. I'm 
  interested in internship roles in software development, full stack
  development and game development. Please feel free to get in touch
  with me via email at nkchaudhary00@gmail.com`);

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
  return (
    <div className="blocks" id="About">
      <div className="imgholder">
        <img
          src="https://avatars.githubusercontent.com/u/66108270?v=4"
          alt="profile Pic"
        />
      </div>
      <div className="textholder">
        <h1>Niteesh Kamal Chaudhary</h1>
        <h2>Software Developer</h2>
        <p>
          {data}
        </p>
      </div>
    </div>
  );
}
