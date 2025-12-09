import React from 'react'

type Props = {}

const MyCourseCard = (props: Props) => {
    return (
        <div className={`bg-white rounded-2xl p-2 shadow-md shrink-0 transition-all duration-300 hover:bg-purple-200 w-full flex justify-between items-center`}>
            <div className='flex items-center gap-2 '>
                <div className='w-12 h-12'>
                    <img src="https://picsum.photos/200" alt="" className='rounded-xl' />
                </div>
                <div className='flex flex-col'>
                <span className='font-medium'>Name Surname</span>
                <span className='text-zinc-500'>session completed 9/12</span>
                </div>
            </div>
            <div>
                lloo
            </div>
        </div>
    )
}

export default MyCourseCard