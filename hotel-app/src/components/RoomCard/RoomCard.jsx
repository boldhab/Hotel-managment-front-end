import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./RoomCard.css";

function RoomCard({ room, selected, onToggleSelect, onView, checkIn, checkOut, onBook }) {
  const { t } = useTranslation();
  const { 
    id, 
    name, 
    imageUrl, 
    pricePerNight, 
    capacity, 
    amenities = [], 
    rating,
    reviews,
    size,
    bedType,
    description,
    images = []
  } = room;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);

  // Calculate total price if dates are selected
  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return null;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights > 0) {
      return nights * pricePerNight;
    }
    return null;
  };

  const totalPrice = useMemo(() => calculateTotalPrice(), [checkIn, checkOut, pricePerNight]);
  const nights = totalPrice ? Math.ceil(totalPrice / pricePerNight) : 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (images.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (images.length || 1)) % (images.length || 1));
  };

  const handleImageClick = () => {
    if (images.length > 1) {
      setShowImageModal(true);
    }
  };

  const handleQuickView = () => {
    onView?.(room);
  };

  const handleBookNow = () => {
    onBook?.(room);
  };

  const displayedAmenities = showAmenities ? amenities : amenities.slice(0, 4);

  return (
    <>
      <article className={`room-card ${selected ? 'room-card--selected' : ''}`}>
        {/* Image Section with Gallery */}
        <div className="room-card__media" onClick={handleImageClick}>
          <div 
            className="room-card__image"
            style={{ backgroundImage: `url('${images[currentImageIndex] || imageUrl}')` }}
          />
          
          {/* Image Gallery Indicators */}
          {images.length > 1 && (
            <div className="room-card__gallery-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`room-card__gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Gallery Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                className="room-card__gallery-nav room-card__gallery-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button 
                className="room-card__gallery-nav room-card__gallery-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <i className="fa-solid fa-chevron-right" />
              </button>
            </>
          )}
          
          {/* Badges */}
          <div className="room-card__badges">
            {rating && (
              <div className="room-card__rating">
                <i className="fa-solid fa-star" />
                <span>{rating}</span>
                <span className="room-card__reviews">({reviews})</span>
              </div>
            )}
            {capacity >= 4 && (
              <div className="room-card__popular">
                <i className="fa-solid fa-fire" />
                {t('roomCard.popular')}
              </div>
            )}
          </div>

          {/* Compare Checkbox */}
          <label className="room-card__compare-checkbox">
            <input
              type="checkbox"
              checked={!!selected}
              onChange={(e) => {
                e.stopPropagation();
                onToggleSelect?.(id);
              }}
            />
            <span className="room-card__compare-icon">
              <i className={`fa-solid ${selected ? 'fa-square-check' : 'fa-square'}`} />
            </span>
          </label>
        </div>

        {/* Card Body */}
        <div className="room-card__body">
          <div className="room-card__header">
            <h3 className="room-card__title">{name}</h3>
            {size && <span className="room-card__size">{size}</span>}
          </div>

          {bedType && (
            <div className="room-card__bed-type">
              <i className="fa-solid fa-bed" />
              {bedType}
            </div>
          )}

          {description && (
            <p className="room-card__description">{description}</p>
          )}

          <div className="room-card__meta">
            <div className="room-card__price-section">
              <span className="room-card__price">
                <strong>${pricePerNight}</strong>
                <span className="room-card__unit">{t('roomCard.perNight')}</span>
              </span>
              
              {totalPrice && (
                <div className="room-card__total-price">
                  <span className="room-card__total-label">
                    {nights} {t(nights === 1 ? 'roomCard.night' : 'roomCard.nights')} • ${totalPrice} {t('roomCard.total')}
                  </span>
                </div>
              )}
            </div>

            <span className="room-card__capacity">
              <i className="fa-solid fa-user-group" /> 
              {t('roomCard.upTo', { count: capacity })}
            </span>
          </div>

          {/* Amenities */}
          {/* Amenities */}
          <div className="room-card__amenities-section">
            <div className="room-card__amenities-header">
              <h4>{t('roomCard.amenities')}</h4>
              {amenities.length > 4 && (
                <button 
                  className="room-card__amenities-toggle"
                  onClick={() => setShowAmenities(!showAmenities)}
                >
                  {showAmenities ? t('roomCard.showLess') : t('roomCard.more', { count: amenities.length - 4 })}
                </button>
              )}
            </div>
            
            <ul className="room-card__amenities">
              {displayedAmenities.map((amenity, index) => (
                <li key={`${amenity}-${index}`} className="room-card__amenity">
                  <i className="fa-solid fa-check" />
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="room-card__actions">
            <button 
              className="room-card__btn room-card__btn--primary"
              onClick={handleBookNow}
            >
              <i className="fa-solid fa-calendar-check" />
              {t('roomCard.bookNow')}
            </button>
            
            <button 
              className="room-card__btn room-card__btn--secondary"
              onClick={handleQuickView}
            >
              <i className="fa-solid fa-eye" />
              {t('roomCard.quickView')}
            </button>

            <button 
              className="room-card__btn room-card__btn--icon"
              onClick={() => onToggleSelect?.(id)}
              title={selected ? t('roomCard.removeFromComparison') : t('roomCard.addToComparison')}
            >
              <i className={`fa-solid ${selected ? 'fa-square-check' : 'fa-code-compare'}`} />
            </button>
          </div>

          {/* Availability Notice */}
          {checkIn && checkOut && (
            <div className="room-card__availability">
              <i className="fa-solid fa-circle-check" />
              {t('roomCard.available')}
            </div>
          )}
        </div>
      </article>

      {/* Image Modal */}
      {showImageModal && (
        <div className="room-card__image-modal" onClick={() => setShowImageModal(false)}>
          <div className="room-card__modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="room-card__modal-close"
              onClick={() => setShowImageModal(false)}
            >
              <i className="fa-solid fa-times" />
            </button>
            
            <div className="room-card__modal-image">
              <img 
                src={images[currentImageIndex] || imageUrl} 
                alt={name}
              />
            </div>
            
            <div className="room-card__modal-nav">
              <button onClick={prevImage}>
                <i className="fa-solid fa-chevron-left" />
              </button>
              <span className="room-card__modal-counter">
                {currentImageIndex + 1} / {images.length}
              </span>
              <button onClick={nextImage}>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(RoomCard);