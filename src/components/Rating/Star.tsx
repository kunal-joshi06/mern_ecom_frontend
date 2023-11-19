import { useState, FC } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
  size?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, setRating, count = 5, size = 20 }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className='star-container'>
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label
            key={index}
            style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <input
              type='radio'
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              style={{ display: "none" }}
            />
            <FaStar
              cursor={"pointer"}
              size={size}
              transition="color 200ms"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
