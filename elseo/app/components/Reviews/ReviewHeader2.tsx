import React from 'react'

type Props = {}

const ReviewHeader2 = (props: Props) => {
  return (
    <div className='grid grid-cols-4 border-t-2 border-(--gray-500)'>
        <div className="col-span-2 flex items-end p-6">
                <h2 className="text-4xl font-semibold">Reviews</h2>
            </div>

            <div className="col-span-2 border-(--gray-500) flex items-end justify-end">
                    <div>
                        <button className='px-4 py-2 border-l-2 border-t-2 border-(--gray-500)'>
                            {`<`}
                        </button>
                        <button className='px-4 py-2 border-t-2 border-l-2 border-(--gray-500)'>
                            {`>`}
                        </button>
                    </div>
            </div>
    </div>
  )
}

export default ReviewHeader2