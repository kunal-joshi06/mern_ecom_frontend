import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

interface StarRatingProps {
    rating: number; // Rating out of 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const maxStars = 5;

    const stars = [];

    for (let i = 0; i < maxStars; i++) {
        const isFilled = i < rating;
        stars.push(
            <StarIcon
                key={i}
                className={`w-6 h-6 ${isFilled ? 'text-yellow-500' : 'text-gray-300'}`}
            />
        );
    }

    return (
        <div className="flex items-center">
            {stars}
        </div>
    );
};

export default StarRating;
