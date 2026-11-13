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

const Home = () => {
  return (
    <div>
      <HeroSection />
      <UpcomingEventSection />
      <AboutSection />
      <EventSection />
      <ProcessSection />
      <GallarySection />
      <TrustedSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  )
}

export default Home