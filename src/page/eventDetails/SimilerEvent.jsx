import React from 'react'
import SimilerEventCard from './SimilarEventCard'

const SimilerEvent = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 
    justify-between gap-4 gap-y-8">
      {[1,2,3,4,5].map((item, index) => (
        <SimilerEventCard key={index}  />
      ))}
    </div>
  )
}

export default SimilerEvent