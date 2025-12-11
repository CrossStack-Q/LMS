import React from 'react'

type Props = {}

const Spacing = (props: Props) => {
  return (
    <div className='hidden md:grid grid-cols-4 border-t-2 border-(--gray-500)'>
        <div className="py-12 border-r-2 border-(--gray-500)"></div>
            <div className="py-12 border-r-2 border-(--gray-500)"></div>
            <div className="py-12 border-r-2 border-(--gray-500)"></div>
            <div className="py-12"></div>
    </div>
  )
}

export default Spacing