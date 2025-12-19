import React from 'react'

type Props = {}

const Tracks = (props: Props) => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 border-y border-(--gray-500)">
  <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
  <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
  <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
  <div className="border-b border-(--gray-500) hidden md:block"></div>

  <div className="col-span-2 flex items-center justify-center border-r border-b border-(--gray-500) p-6 bg-(--bg-white)">
    <h2 className="text-4xl font-semibold">Tracks</h2>
  </div>

  <div className="col-span-2 border-b border-(--gray-500) p-6">
    <p className="text-(--gray-500) font-semibold text-lg leading-relaxed">
      Master skills through interactive lessons, quizzes, and real development projects that build practical, industry-ready experience.
    </p>
  </div>

  <div className="col-span-2 border-r border-(--gray-500) gap-4 grid grid-cols-6 p-6 hover:bg-(--bg-white) cursor-pointer">
    <div className="w-48 h-auto flex items-center justify-center col-span-2 ">
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
    </div>
    <div className='col-span-4'>
      <h3 className="text-2xl font-semibold">Go Intro</h3>
      <p className="text-green-700 mb-2">by Anurag Sharma</p>
      <p className="text-gray-700 mb-4">
        Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
      </p>
      <div className="bg-green-400 text-black px-4 py-2 hidden group-hover:flex">
        <span>
        Start learning →
        </span>
      </div>
    </div>
  </div>

  <div className="col-span-2 p-6 gap-4 grid grid-cols-6 hover:bg-(--bg-white) cursor-pointer">
    <div className="w-48 h-auto flex items-center justify-center col-span-2">
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
    </div>
    <div className='col-span-4'>
      <h3 className="text-2xl font-semibold">Go Intro</h3>
      <p className="text-green-700 mb-2">by Anurag Sharma</p>
      <p className="text-gray-700 mb-4">
        Start your Go programming journey, discover the simplicity and speed of this modern language as you learn fundamental concepts, syntax, and how to build basic applications.
      </p>
      <div className="bg-green-400 text-black px-4 py-2 hover:flex hidden">
        <span>
        Start learning →
        </span>
      </div>
    </div>
  </div>

</div>

  )
}

export default Tracks