import React from "react";
import { CheckCircle, Star } from "lucide-react";

interface ReviewSideCardProps {
    name: string;
    role: string;
    avatar: string;
    review: string;
    highlighted?: boolean;
}

const ReviewSideCard: React.FC<ReviewSideCardProps> = ({
    name,
    role,
    avatar,
    review,
    highlighted = false,
}) => {
    return (
        <div className="p-2">
            {/* Avatar */}
            <div className="flex gap-2">
                <img
                    src={avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-gray-900">{name}</span>
                            <CheckCircle className="w-4 h-4 text-indigo-500" />
                        </div>

                        {highlighted && (
                            <div className="flex">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-zinc-500 fill-zinc-500" />
                            </div>
                        )}
                    </div>

                    {/* Role */}
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
                </div>

                {/* Review Body */}
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">{review}</p>
            
        </div>
    );
};

export default ReviewSideCard;
