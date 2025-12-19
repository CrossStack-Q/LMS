import React from 'react'

type Props = {}

const NormalFooter = (props: Props) => {
  return (
    <div className='grid grid-cols-4 grid-rows-2'>
        <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
            <div className="border-r border-b border-(--gray-500) hidden md:block"></div>
            <div className="border-r border-b  border-(--gray-500) hidden md:block"></div>
            <div className=" border-b border-(--gray-500) hidden md:block"></div>
            

            <div className="col-span-2 border-b border-r border-(--gray-500) flex flex-col justify-between p-6">
                <p className="text-(--gray-500) font-semibold text-lg leading-relaxed  text-center">
                    Get full access to Knowledge -{`>`}
                </p>
                
            </div>

            <div className="col-span-2 border-b border-(--gray-500) flex items-center justify-center p-6 bg-(--bg-white)">
                <h2 className="text-4xl font-semibold">Ready To Start? </h2>
            </div>
    </div>
  )
}

export default NormalFooter