import React from 'react'
import Hero from '../components/Hero/Hero'
import Rooms from '../components/Rooms/Rooms'

function Home() {
  return (
    <>
      <Hero onStartBooking={(data) => console.log('Start booking:', data)} topRoomImageUrls={[
        '/images/rooms/deluxe-1.jpg', '/images/rooms/suite-1.jpg', '/images/rooms/standard-1.jpg'
      ]} />
      <section style={{ padding: '100px 20px', minHeight: '60vh', background: '#f8fafc' }}>
        <Rooms />
      </section>
    </>
  )
}

export default Home


