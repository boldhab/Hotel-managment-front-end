import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function RoomQuickViewModal({ room, onClose, onBook }) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!room) return null;

  const {
    name,
    images = [],
    imageUrl,
    pricePerNight,
    capacity,
    size,
    bedType,
    description,
    amenities = [],
    rating,
    reviews
  } = room;

  const allImages = images.length > 0 ? images : [imageUrl];

  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      backdropFilter: 'blur(10px)',
      padding: '40px 20px',
      overflowY: 'auto'
    },
    modal: {
      background: 'var(--c-bg-card)',
      borderRadius: '24px',
      maxWidth: '900px',
      width: '95%',
      maxHeight: 'none',
      overflow: 'visible',
      display: 'grid',
      gridTemplateColumns: 'minmax(350px, 1fr) 1.2fr',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
      color: 'var(--c-text-primary)',
      position: 'relative'
    },
    imageSection: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '450px',
      background: '#000',
      borderRadius: '24px 0 0 24px',
      overflow: 'hidden'
    },
    mainImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    infoSection: {
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflow: 'visible'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    title: {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: 700
    },
    priceTag: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0f766e'
    },
    metaGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      padding: '12px',
      background: 'var(--c-bg-secondary)',
      borderRadius: '12px',
      textAlign: 'center'
    },
    metaItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontSize: '0.9rem'
    },
    metaIcon: {
      fontSize: '1.2rem',
      marginBottom: '4px',
      color: 'var(--c-text-secondary)'
    },
    amenitiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px'
    },
    amenity: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.95rem',
      color: 'var(--c-text-secondary)'
    },
    closeBtn: {
      position: 'absolute',
      top: '-18px',
      right: '-18px',
      background: '#fff',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      cursor: 'pointer',
      color: '#000',
      display: 'grid',
      placeItems: 'center',
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease'
    },
    bookBtn: {
      background: '#0f766e',
      color: '#fff',
      border: 'none',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      boxShadow: '0 4px 12px rgba(15, 118, 110, 0.2)'
    },
    galleryNav: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 10
    },
    dot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    },
    activeDot: {
      background: '#fff',
      transform: 'scale(1.2)'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button 
          style={styles.closeBtn} 
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <i className="fa-solid fa-times" />
        </button>

        <div style={styles.imageSection}>
          <img 
            style={styles.mainImage} 
            src={allImages[currentImageIndex]} 
            alt={name} 
          />

          {allImages.length > 1 && (
            <div style={styles.galleryNav}>
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  style={{...styles.dot, ...(idx === currentImageIndex ? styles.activeDot : {})}}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        <div style={styles.infoSection}>
          <div style={styles.header}>
            <div>
              <h2 style={styles.title}>{name}</h2>
              {rating && (
                <div style={{ color: '#f59e0b', marginTop: '8px' }}>
                  <i className="fa-solid fa-star" /> {rating} ({reviews} {t('quickView.reviews') || 'reviews'})
                </div>
              )}
            </div>
            <div style={styles.priceTag}>${pricePerNight}<span style={{fontSize: '1rem', color: 'var(--c-text-secondary)'}}>{t('roomCard.perNight')}</span></div>
          </div>

          <div style={styles.metaGrid}>
            <div style={styles.metaItem}>
              <i className="fa-solid fa-ruler-combined" style={styles.metaIcon} />
              <strong>{size}</strong>
              <span style={{color: 'var(--c-text-secondary)'}}>{t('quickView.area')}</span>
            </div>
            <div style={styles.metaItem}>
              <i className="fa-solid fa-bed" style={styles.metaIcon} />
              <strong>{bedType}</strong>
              <span style={{color: 'var(--c-text-secondary)'}}>{t('quickView.bed')}</span>
            </div>
            <div style={styles.metaItem}>
              <i className="fa-solid fa-user-group" style={styles.metaIcon} />
              <strong>{capacity} {t('hero.guests')}</strong>
              <span style={{color: 'var(--c-text-secondary)'}}>{t('quickView.capacity')}</span>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0' }}>{t('quickView.description')}</h4>
            <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--c-text-secondary)' }}>
              {description}
            </p>
          </div>

          <div>
            <h4 style={{ margin: '0 0 12px 0' }}>{t('quickView.amenities')}</h4>
            <div style={styles.amenitiesGrid}>
              {amenities.map(a => (
                <div key={a} style={styles.amenity}>
                  <i className="fa-solid fa-check" style={{ color: '#10b981' }} />
                  {a}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--c-border)' }}>
            <button 
              style={styles.bookBtn} 
              onClick={() => {
                onBook(room);
                onClose();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 118, 110, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 118, 110, 0.2)';
              }}
            >
              <i className="fa-solid fa-calendar-check" />
              {t('quickView.bookButton')}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Styles Injection */}
      <style>{`
        @media (max-width: 800px) {
          .room-quick-view-modal {
            grid-template-columns: 1fr !important;
            overflow-y: auto !important;
          }
          .room-quick-view-image {
            height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default RoomQuickViewModal;
