import React from 'react';
import { useTranslation } from 'react-i18next';
import BookingForm from '../BookingForm/BookingForm';

function BookingModal({ room, onClose }) {
  const { t } = useTranslation();
  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    },
    modal: {
      background: 'var(--c-bg-card)',
      borderRadius: '16px',
      maxWidth: '600px',
      width: '95%',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      color: 'var(--c-text-primary)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem',
      borderBottom: '1px solid var(--c-border)'
    },
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600
    },
    content: {
      padding: '1.5rem',
      maxHeight: 'calc(90vh - 80px)',
      overflowY: 'auto'
    },
    close: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--c-text-secondary)',
      fontSize: '1.1rem',
      padding: '0.5rem',
      borderRadius: '8px',
      display: 'grid',
      placeItems: 'center',
      transition: 'background 0.2s'
    }
  };

   const handleConfirm = (bookingData) => {
    // In a real app, this would submit to API
    console.log('Confirmed booking:', bookingData);
    alert(t('booking.success', { room: room.name, total: bookingData.total }));
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={styles.header}>
          <h3 style={styles.title}>{t('booking.modalTitle')}</h3>
          <button 
            style={styles.close} 
            onClick={onClose} 
            aria-label="Close booking modal"
            onMouseEnter={(e) => e.target.style.background = 'var(--c-bg-secondary)'}
            onMouseLeave={(e) => e.target.style.background = 'transparent'}
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div style={styles.content}>
          <BookingForm 
            onConfirm={handleConfirm} 
            initialRoom={room} 
          />
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
