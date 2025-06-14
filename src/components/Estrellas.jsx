import { useState } from "react";
import "./css/Estrellas.css";

const Estrellas = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const eraseRating = () => {
    setRating(0);
  };

  return (
    <>
      <div className="stars-container">
        {Array(5)
          .fill()
          .map((_, index) => (
            <i
              key={index}
              className={`fa-star star ${
                rating >= index + 1 ? "fa-solid" : "fa-regular"
              }`}
              style={{
                cursor: "pointer",
                color: rating >= index + 1 ? "#ffaa56" : "gray",
              }}
              onClick={() => handleRatingChange(index + 1)}
            ></i>
          ))}
        <button
          className="erase-button"
          onClick={eraseRating}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            color: "gray",
            fontSize: "1rem",
            paddingLeft: "5px", 
          }}
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
    </>
  );
};

export default Estrellas;
