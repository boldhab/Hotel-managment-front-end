import React from 'react'
import ExperienceCard from './ExperienceCard'
import './Experiences.css'

const data = [
  {
    title: 'Guided Coastal Hike',
    image: '/images/experience/outdoor_adventure.jpg',
    text: 'Explore scenic trails with our expert guide.',
    duration: '3h',
    price: '$49',
  },
  {
    title: 'Local Culture',
    image: '/images/experience/local-culture.jpg',
    text: 'Golden hour cruise with refreshments.',
    duration: '2h',
    price: '$69',
  },
  {
    title: 'Cooking Class',
    image: '/images/experience/culinary-delights.jpg',
    text: 'Learn local recipes with our chef.',
    duration: '2.5h',
    price: '$59',
  },
  {
    title: 'Yoga Retreat',
    image: '/images/experience/Yoga retreats.jpg',
    text: 'Sunrise yoga and meditation.',
    duration: '1.5h',
    price: '$29',
  },
]

function Experiences() {
  return (
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="exp-grid">
        {data.map((x) => (
          <ExperienceCard
            key={x.title}
            {...x}
            onBook={() => alert('Booked: ' + x.title)}
          />
        ))}
      </div>
    </section>
  )
}

export default Experiences
