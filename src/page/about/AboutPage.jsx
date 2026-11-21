import React from 'react'
import PageTopSection from '@/components/common/PageTopSection'
import AboutPageSection from './AboutPageSection'
import AboutSection from '../home/section/AboutSection'
import CtaSection from '../home/section/CtaSection'

export default function AboutPage() {
  return (
    <main>
     <PageTopSection title='About Us'/>
     <AboutSection/>
     <CtaSection/>

    </main>
  )
}
