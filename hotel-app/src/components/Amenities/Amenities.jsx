import React from 'react'
import './Amenities.css'

function Amenities() {
  const categories = [
    { title: 'Room Comforts', items: ['King beds', 'Smart climate control', 'Luxury linens'], img: '/images/amenties/room-comforts.jpg' },
    { title: 'Wellness & Spa', items: ['Massage treatments', 'Sauna', 'Gym & Yoga area'], img: '/images/amenties/wellness-spa.jpg' },
    { title: 'Dining & Bars', items: ['On-site restaurant', 'Rooftop lounge', 'Breakfast buffet'], img: '/images/offer/bining-bars.jpg' },
    { title: 'Outdoor & Leisure', items: ['Pool', 'Garden', 'Bike rentals'], img: '/images/amenties/outdoor-leisure.jpg' },
    { title: 'Business & Events', items: ['Meeting rooms', 'Conference hall', 'Coworking space'], img: '/images/amenties/business-events.jpg' },
    { title: 'Family-Friendly', items: ["Kids' pool", 'Babysitting', 'Family suites'], img: '/images/offer/family-friendly.jpg' },
  ]

  return (
    <section className="amenities">
      <div className="amenities__grid">
        {categories.map((c) => (
          <div key={c.title} className="amenities__card">
            <div className="amenities__card-image" style={{ backgroundImage: `url(${c.img})` }} />
            <div className="amenities__card-body">
              <h3 className="amenities__card-title">{c.title}</h3>
              <ul className="amenities__card-list">
                {c.items.map(i => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Amenities

