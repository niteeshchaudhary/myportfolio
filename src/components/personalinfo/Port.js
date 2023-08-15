import "../portfolio.css";
import "https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js";
import { useEffect } from "react";
export default function Portfolio() {
  useEffect(() => {
    if (
      CSS.supports("animation-timeline: scroll()") ||
      !CSS.supports("animation-timeline: foo")
    ) {
      // Replace warning box with info box

      // As we're about to shift content out of .columns, we need it to hide its overflow
      document.querySelector(".columns").style.overflowY = "hidden";

      // Set up timeline
      // eslint-disable-next-line no-undef
      const timeline = new ScrollTimeline({
        scrollSource: document.documentElement,
        timeRange: 1,
        fill: "both",
      });

      // Loop all eligible columns
      document.querySelectorAll(".column-reverse").forEach(($column) => {
        // Flip item order in reverse columns
        $column.style.flexDirection = "column-reverse";

        // Hook Animation
        $column.animate(
          {
            transform: [
              "translateY(calc(150rem - 30rem))",
              "translateY(calc(-130rem + 10rem))",
            ],
          },
          {
            duration: 0.5,
            fill: "both",
            timeline,
          }
        );
      });
    }
  }, []);

  return (
    <div className="portfolio">
      <h1 style={{ color: "#fff" }}>Portfolio</h1>
      <div class="columns" data-scroll-container="">
        <div class="column column-reverse">
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/1.04213a58.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Cyber Blue</span> <span>2011</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/2.3ff1fdb6.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Gnostic Will</span> <span>2012</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/3.b606be87.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>French Kiss</span> <span>2013</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/4.24fd614c.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Half Life</span> <span>2014</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/5.d13f5e61.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Love Boat</span> <span>2015</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/6.786c7db4.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Golden Ray</span> <span>2016</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/7.df95fe5c.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Blame Game</span> <span>2017</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/8.e7faf38e.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Lone Dust</span> <span>2018</span>{" "}
            </figcaption>
          </figure>
        </div>
        <div class="column">
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/11.ba790930.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Empty Words</span> <span>2021</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/12.c3a8d893.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Nonage Line</span> <span>2009</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/13.3bd52250.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Blue Hell</span> <span>2010</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/14.b7263516.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Cold Blood</span> <span>2011</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/15.55bda21b.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Tulip Heat</span> <span>2012</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/16.eb88393b.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Red Wrath</span> <span>2013</span>{" "}
            </figcaption>
          </figure>
        </div>
        <div class="column column-reverse">
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/17.3450839a.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Bold Human</span> <span>2014</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/18.763d23f6.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Loyal Royal</span> <span>2015</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/19.be25549f.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Lone Cone</span> <span>2016</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/20.d7a9356b.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Dutch Green</span> <span>2017</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/21.4c8813a5.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Valley Hill</span> <span>2018</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/22.ec97ea6e.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Kale Hale</span> <span>2019</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/23.49e8893a.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Fake Cake</span> <span>2020</span>{" "}
            </figcaption>
          </figure>
          <figure class="column__item">
            <div class="column__item-imgwrap">
              <img
                src="https://tympanus.net/Development/ColumnScroll/24.057dafba.jpg"
                alt=""
                title=""
                height=""
                width=""
              />
            </div>
            <figcaption class="column__item-caption">
              {" "}
              <span>Book Belly</span> <span>2021</span>{" "}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
