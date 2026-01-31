import React from 'react';
import { useTranslation } from 'react-i18next';
import ExperienceCard from './ExperienceCard';
import './Experiences.css';

function Experiences() {
  const { t } = useTranslation();
  
  const experienceList = [
    { key: 'guidedHike', image: '/images/experience/outdoor_adventure.jpg' },
    { key: 'sunsetCruise', image: '/images/experience/local-culture.jpg' },
    { key: 'chefCooking', image: '/images/experience/culinary-delights.jpg' },
    { key: 'sunriseYoga', image: '/images/experience/Yoga retreats.jpg' },
  ];
  
  return (
    <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="exp-grid">
        {experienceList.map((x) => {
          const title = t(`home.experiences.${x.key}.title`);
          return (
            <ExperienceCard
              key={x.key}
              title={title}
              text={t(`home.experiences.${x.key}.text`)}
              duration={t(`home.experiences.${x.key}.duration`)}
              price={t(`home.experiences.${x.key}.price`)}
              image={x.image}
              onBook={() => alert(t('home.experiences.bookedAlert', { title }))}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Experiences
