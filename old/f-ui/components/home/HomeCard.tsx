import Image from 'next/image'
import React from 'react'

type Props = {}

const Pill = ({text}) => {
    return (
        <span className='bg-green-200 text-green-700 px-2 rounded-full'>
            {text}
        </span>
    )
}

const HomeCard = (props: Props) => {
    return (
        <div className={`bg-white rounded-2xl shadow-md p-4 shrink-0 transition-all duration-300 hover:scale-[1.02] h-80 `}>
            <div className="relative w-full h-[180px]" >
                <Image
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/88540b239675379.692eafbb605b9.jpg"
                    alt=""
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            <div className='flex justify-between pt-2'>
                <Pill text="Beginner"/>
                <div>
                    <span>
                    38+
                    </span>
                    <span>
                        5 ⭐️
                    </span>
                </div>
            </div>
            <div>
                <span className='font-medium'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
            </div>
            <div className='flex items-center gap-2'>
            <div className='w-8 h-8 '>
                <img src="https://picsum.photos/200" alt="" className='rounded-full'/>
                </div>
                <span className='text-purple-800 font-medium'>Name Surname</span>
            
            </div>
        </div>
    )
}

export default HomeCard