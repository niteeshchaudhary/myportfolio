import { useEffect } from "react";
import Card1 from "../cards/Cardt1";
export default function Portfolio() {
  return (
    <section id="projects">
      <h2 className="heading">Projects</h2>
      <div className="portfoliocontainer">
        <Card1 />
      </div>
    </section>
  );
}
