import "./card2.css";
import "./card1.css";
import { useState, useEffect } from "react";
import pro from "./projects.json";
import { getDatabase, ref, child, get } from "firebase/database";
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
    return (
      <div class="box"  key={"ele" + (index + 1)} >
        <div class="card">
         <a href={ele?.link} target="blank">
         <div className="img-box">
            <img src={ele?.thumb} alt={"pro" + (index + 1)} />
          </div>
          <div class="content">
            <h2 class="title">{ele?.name}</h2>
            <p class="copy">Click To check it on Github</p>
          </div>
        </a>
        </div>
      </div>
      
    );
  };
  return <>{data.map((ele, index) => display(ele, index))}</>;
}
