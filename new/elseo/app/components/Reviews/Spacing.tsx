import React from 'react'

type Props = {}

const Spacing = (props: Props) => {
  return (
    <div className='hidden md:grid grid-cols-4'>
        <div className="py-12 border-r border-(--gray-500)"></div>
            <div className="py-12 border-r border-(--gray-500)"></div>
            <div className="py-12 border-r border-(--gray-500)"></div>
            <div className="py-12"></div>
    </div>
  )
}

export default Spacing