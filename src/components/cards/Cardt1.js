import "./card1.css";
import { useState, useEffect } from "react";
import pro from "./projects.json";
import { getDatabase, ref, child, get } from "firebase/database";
export default function Card1() {
  const [data, setData] = useState(pro);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `projects`))
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

  const display = (ele, index) => {
    return (
      <div className="box" key={"ele" + (index + 1)}>
        <a href={ele?.link} target="blank">
          <div className="img-box">
            <img src={ele?.thumb} alt={"pro" + (index + 1)} />
          </div>
          <div className="content">
            <h2>
              {ele?.name}
              <span></span>
            </h2>
          </div>
        </a>
      </div>
    );
  };
  return <>{pro.map((ele, index) => display(ele, index))}</>;
}
