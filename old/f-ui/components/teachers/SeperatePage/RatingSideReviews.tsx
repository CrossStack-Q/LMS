import React from "react";
import { Star } from "lucide-react";

const RatingSideReviews = () => {
    const overallRating = 4.9;
    const totalReviews = 236;

    const categories = [
        { label: "Qualifications", value: 4.9 },
        { label: "Expertise", value: 4.8 },
        { label: "Communication", value: 5.0 },
        { label: "Value for money", value: 4.9 },
    ];

    return (
        <div className="p-3 rounded-xl bg-gray-50 flex gap-4">
            {/* Left rating */}
            <div className="text-center w-20">
                <div className="text-3xl font-bold">{overallRating}</div>

                <div className="flex justify-center gap-[1px] my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            fill="#f5c242"
                            stroke="#f5c242"
                        />
                    ))}
                </div>

                <div className="text-[11px] text-gray-500">
                    {totalReviews} Reviews
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-2 w-full">
                {categories.map((cat) => (
                    <div key={cat.label} className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">{cat.label}</span>

                        <div className="flex items-center gap-2 w-28">
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div
                                    className="h-full rounded bg-yellow-400"
                                    style={{ width: `${(cat.value / 5) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs font-semibold">{cat.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingSideReviews;
