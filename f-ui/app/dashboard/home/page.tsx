import Calendar from '@/components/home/Calendar'
import HomeCard from '@/components/home/HomeCard'
import MyCourseCard from '@/components/home/MyCourseCard'
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='h-full grid grid-cols-5 bg-gray-50 gap-4'>
      <div className='col-span-3 overflow-y-auto hidescroll'>
        <div className='flex justify-between items-center'>
        <p className='text-2xl font-medium pb-4'>Top courses you may like</p>
        <span className='text-base text-purple-600 hover:text-blue-600 cursor-pointer'>View All</span>
        </div>
        <div className='grid grid-cols-2 grid-rows-2 gap-6'>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
        </div>
        <div className='flex justify-between items-center py-4'>
        <p className='text-2xl font-medium'>My courses</p>
        <span className='text-base text-purple-600 hover:text-blue-600 cursor-pointer'>View All</span>
        </div>
        <div className='flex flex-col gap-2 pb-4'>
          <MyCourseCard/>
          <MyCourseCard/>
          <MyCourseCard/>
        </div>
      </div>
      <div className='col-span-2 bg-white rounded-2xl p-4 space-y-4 overflow-y-auto hidescroll'>
        <div className='flex justify-between gap-4 items-center'>
          <div className='flex flex-col'>
            <span className='text-lg'>
              Friday
            </span>
            <span className='text-zinc-500 text-sm'>
              April 5 2026
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <p>Icon</p>
            <div className='w-10 h-10'>
                    <img src="https://picsum.photos/200" alt="" className='rounded-xl' />
                </div>
          </div>
        </div>
        <Calendar/>
      </div>
    </div>
  )
}

export default Dashboard