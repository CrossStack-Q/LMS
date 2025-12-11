import React from 'react'
import Spacing from './Spacing'

type Props = {}

const Reviews = (props: Props) => {
    return (
        <div className="grid grid-cols-4 grid-rows-2 border-y-2 border-(--gray-500)">
            <div className="col-span-1 row-span-2 border-r-2 border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
                <p className='text-xl font-semibold'>Loki Bhai</p>
                <p className='text-(--gray-700)'><span>4.5</span>
                <span>⭐️⭐️⭐️⭐️</span>
                <span>1 Week ago</span></p>
                <p className='text-(--gray-800)'>
                    I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
                </p>
            </div>
            <div className="col-span-1 row-span-2 border-r-2 border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
                <p className='text-xl font-semibold'>Loki Bhai</p>
                <p className='text-(--gray-700)'><span>4.5</span>
                <span>⭐️⭐️⭐️⭐️</span>
                <span>1 Week ago</span></p>
                <p className='text-(--gray-800)'>
                    I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
                </p>
            </div>
            <div className="col-span-1 row-span-2 border-r-2 border-(--gray-500) flex flex-col p-6 gap-1 cursor-pointer">
                <p className='text-xl font-semibold'>Loki Bhai</p>
                <p className='text-(--gray-700)'><span>4.5</span>
                <span>⭐️⭐️⭐️⭐️</span>
                <span>1 Week ago</span></p>
                <p className='text-(--gray-800)'>
                    I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
                </p>
            </div>
            <div className="col-span-1 row-span-2 flex flex-col p-6 gap-1 cursor-pointer">
                <p className='text-xl font-semibold'>Loki Bhai</p>
                <p className='text-(--gray-700)'><span>4.5</span>
                <span>⭐️⭐️⭐️⭐️</span>
                <span>1 Week ago</span></p>
                <p className='text-(--gray-800)'>
                    I've learned so much from this site. It helped me overcome difficulties in understanding many basic principles, and now I design much faster and more confidently. I've gone through many courses already and will check out more!
                </p>
            </div>


        </div>

    )
}

export default Reviews