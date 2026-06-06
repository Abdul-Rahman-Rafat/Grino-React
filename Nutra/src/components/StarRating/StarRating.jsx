import { memo } from "react";

function StarRating({ rating = 0 }) {
  const roundedRating = Math.round(rating);

  return (
    <>
      {Array.from({ length: 5 }, (_, index) => (
        <i
          className={
            index < roundedRating ? "ri-star-s-fill" : "ri-star-s-fill empty"
          }
          key={index}
        ></i>
      ))}
    </>
  );
}

export default memo(StarRating);
