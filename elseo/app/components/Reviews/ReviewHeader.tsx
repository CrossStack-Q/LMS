import React from 'react'

type Props = {}

const ReviewHeader = (props: Props) => {
  return (
    <div className='grid grid-cols-4 border-t border-(--gray-500)'>
        <div className="col-span-2 flex items-center justify-center border-r border-(--gray-500) p-6 bg-(--bg-white)">
                <h2 className="text-4xl font-semibold">Reviews</h2>
            </div>

            <div className="col-span-2 border-(--gray-500) flex flex-col justify-between">
                <p className="text-(--gray-500) font-semibold text-lg leading-relaxed p-6">
                    What our users say about learning and growing their coding skills with us.
                </p>
                <div className='flex justify-end'>
                    <div>
                        <button className='px-4 py-2 border-l-2 border-t border-(--gray-500)'>
                            {`<`}
                        </button>
                        <button className='px-4 py-2 border-t border-l-2 border-(--gray-500)'>
                            {`>`}
                        </button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ReviewHeader