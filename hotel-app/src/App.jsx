import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Rooms from './components/Rooms/Rooms'
import Footer from './components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RoomsPage from './pages/RoomsPage.jsx'
import AmenitiesPage from './pages/AmenitiesPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import ExperiencesPage from './pages/ExperiencesPage.jsx'
import TestimonialsPage from './pages/TestimonialsPage.jsx'
import BookNowPage from './pages/BookNowPage.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
        <Hero onStartBooking={(data) => console.log('Start booking:', data)} topRoomImageUrls={[
          '/images/rooms/deluxe-1.jpg', '/images/rooms/suite-1.jpg', '/images/rooms/standard-1.jpg'
        ]} />
                <section style={{ padding: '100px 20px', minHeight: '60vh', background: '#f8fafc' }}>
          <Rooms />
        </section>
              </>
            }
          />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<BookNowPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
