import React from 'react'
import Home from './components/Home';
import FocusAreas from './components/FocusArea';
import ContactForm from './components/ContactForm';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import Testimonials from './components/Testimonial';
import LastFooter from './components/LastFooter';
import HeroSection from './components/HeroSection';
import NotificationBar from './components/NotificationBar';
import Navbar from './components/Navbar';
import SearchComponent from './components/SearchComponent';
import StructuredData from './components/StructuredData';
import ClientSEO from './components/ClientSEO';

export default function page() {
  return (
    <>
      <ClientSEO />
      
      <StructuredData 
        type="Organization"
        data={{
          name: "OMO Digital",
          url: "https://omodigital.io",
          description: "Leading digital transformation company",
          services: [
            "Web Development",
            "Mobile App Development", 
            "AI & Machine Learning",
            "Cloud Services",
            "Digital Transformation"
          ]
        }}
      />

      <main>
        <Navbar />
        <Home />
        <SearchComponent />
        <FocusAreas />
        <NotificationBar />
        <ContactForm />
        <BlogSection />
        <HeroSection />
        <Testimonials />
        <NotificationBar />
        <Footer />
        <LastFooter />
      </main>
    </>
  );
}
