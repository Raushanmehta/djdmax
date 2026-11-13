import React from 'react'
import PageTopSection from '@/components/common/PageTopSection'
import AboutPageSection from './AboutPageSection'

export default function AboutPage() {
  return (
    <div className='bg-gradient-to-r from-gray-50 via-white to-gray-50'>
     <PageTopSection title='About Us'/>
      <div className='max-w-[1430px] mx-auto px-6 lg:px-28 '>
        <AboutPageSection />
      </div>
    </div>
  )
}
