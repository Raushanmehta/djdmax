import React from 'react'
import HeroSection from './section/HeroSection'
import EventSection from './section/EventSection'
import AboutSection from './section/AboutSection'
import UpcomingEventSection from './section/UpcomingEventSection'
import TestimonialsSection from './section/TestimonialsSection'
import ProcessSection from './section/ProcessSection'
import TrustedSection from './section/TrustedSection'
import GallarySection from './section/GallarySection'
import FaqSection from './section/FqaSection'
import StatsSection from './section/StatsSection'
import CtaSection from './section/CtaSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <UpcomingEventSection />
      <StatsSection/>
      <AboutSection />
      <EventSection />
      <ProcessSection />
      <GallarySection />
      <CtaSection />
      <TestimonialsSection />
      <TrustedSection />
      <FaqSection />
    </div>
  )
}

export default Home