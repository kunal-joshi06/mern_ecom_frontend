import { useState, FC } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
  size?: number;
}

const StarRating: FC<StarRatingProps> = ({ rating, setRating, count = 5, size = 20 }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <HStack spacing={"2px"}>
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue.toString()}
              style={{ display: "none" }}
            ></Radio>
            <FaStar
              cursor={"pointer"}
              size={size}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
};

export default StarRating;
