import { useEffect } from "react";
import Card2 from "../cards/Card2";
export default function Portfolio() {
  return (
    <section id="projects">
      <h2 className="heading">Projects</h2>
      <div className="portfoliocontainer">
        <Card2 />
      </div>
    </section>
  );
}
