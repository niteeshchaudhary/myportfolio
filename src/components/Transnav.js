import React,{ useState, useEffect } from "react";
import "./navestyle.css";
import { getDatabase, ref, child, get } from "firebase/database";

export default function Transnav() {
  const [data, setData] = useState();
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `sections`))
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
    <div className="navbar">
      {data?.map((ele, index) => {
        return (
          <a
            href={`#${ele.toLowerCase()}`}
            key={"ele" + (index + 1)}
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            <p>{ele}</p>
          </a>
        );
      })}
    </div>
  );
}
