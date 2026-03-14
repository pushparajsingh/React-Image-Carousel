import React, { useState, useEffect } from "react";
import "./App.css";
import image1 from "./assets/image 1.png";
import image2 from "./assets/image 2.png";
import image3 from "./assets/image 3.png";
import image4 from "./assets/image 4.png";
import image5 from "./assets/image 5.png";
import image6 from "./assets/image 6.png";
import image7 from "./assets/image 7.png";
import image8 from "./assets/image 8.png";
import image9 from "./assets/image 9.png";

const imageList = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = window.setTimeout(() => {
      setCurrentIndex((x) => (x + 1) % imageList.length);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [currentIndex, isHovered]);

  const goNext = () => setCurrentIndex((x) => (x + 1) % imageList.length);
  const goPrev = () => setCurrentIndex((x) => (x - 1 + imageList.length) % imageList.length);

  return (
    <div className="app">
      <header className="header">
        <h2 style={{ fontSize:"2rem", margin:"8px 0px"}}>React Image Carousel</h2>
        <p className="subtitle">Hover the image to pause autoplay, or use the buttons/dots below.</p>
      </header>

      <div className="carousel">
        <div
          className="imageWrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className="carouselImage"
            src={imageList[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
          />
          <div className="caption">
            Slide {currentIndex + 1} of {imageList.length}
          </div>
        </div>

        <div className="controls">
          <button className="navButton" onClick={goPrev} aria-label="Previous image">
            ◀
          </button>
          <button className="navButton" onClick={goNext} aria-label="Next image">
            ▶
          </button>
        </div>

        <div className="dots">
          {imageList.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
