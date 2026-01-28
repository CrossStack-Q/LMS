import React from 'react'
import reviews from "@/lib/reviews.json"
import ReviewSideCard from './ReviewSideCard'
import { Review } from '@/types/review'
import RatingSideReviews from './RatingSideReviews'

type Props = {}

const TeacherSideReviews = (props: Props) => {
    return (
        <div className='w-96 p-4 bg-white rounded-xl'>
            <div className='flex justify-between p-2'>
                <span>
                    <span className='text-xl'>
                        Reviews
                    </span>
                    <span className='text-zinc-500'>
                        (236)
                    </span>
                </span>
                <span className='text-purple-600 cursor-pointer hover:text-blue-400'>
                    View all
                </span>
            </div>
            <div className="space-y-4">
                <RatingSideReviews/>
                {reviews.map((review: Review) => (
                    <ReviewSideCard
                        key={review.id}
                        name={review.name}
                        role="Student"
                        avatar={review.avatar}
                        review={review.comment}
                        highlighted={review.rating === 5}
                    />
                ))}
            </div>
        </div>
    )
}

export default TeacherSideReviews