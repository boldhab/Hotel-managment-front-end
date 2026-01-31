import React from "react";

function ComparisonModal({ rooms, onClose }) {
  if (!rooms || rooms.length === 0) return null;

  const allAmenities = [...new Set(rooms.flatMap(room => room.amenities))];

  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      background: '#fff',
      borderRadius: '12px',
      maxWidth: '1000px',
      width: '95%',
      maxHeight: '85vh',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      borderBottom: '1px solid #eee'
    },
    content: {
      padding: '1rem',
      overflow: 'auto'
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      padding: '0.75rem 1.25rem',
      borderTop: '1px solid #eee'
    },
    btnPrimary: {
      background: '#1976d2',
      color: '#fff',
      border: 'none',
      padding: '0.6rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    btnSecondary: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #e5e7eb',
      padding: '0.6rem 1rem',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    table: {
      minWidth: '700px'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: `200px repeat(${rooms.length}, 1fr)`,
      borderBottom: '1px solid #eee'
    },
    cell: {
      padding: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    feature: {
      background: '#f9fafb',
      fontWeight: 600,
      color: '#374151'
    },
    roomHeader: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    roomImg: {
      width: '100%',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    close: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      fontSize: '1.1rem'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={styles.header}>
          <h3>Compare Rooms</h3>
          <button style={styles.close} onClick={onClose} aria-label="Close comparison">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.table}>
            <div style={{...styles.row, fontWeight: 600}}>
              <div style={{...styles.cell, ...styles.feature}}>Feature</div>
              {rooms.map(room => (
                <div key={room.id} style={{...styles.cell, ...styles.roomHeader}}>
                  <img style={styles.roomImg} src={room.imageUrl} alt={room.name} />
                  <h4>{room.name}</h4>
                  <div className="room-price">${room.pricePerNight}/night</div>
                </div>
              ))}
            </div>

            <div style={styles.row}>
              <div style={{...styles.cell, ...styles.feature}}>Capacity</div>
              {rooms.map(room => (
                <div key={room.id} style={styles.cell}>
                  {room.capacity} guests
                </div>
              ))}
            </div>

            <div style={styles.row}>
              <div style={{...styles.cell, ...styles.feature}}>Size</div>
              {rooms.map(room => (
                <div key={room.id} style={styles.cell}>
                  {room.size}
                </div>
              ))}
            </div>

            <div style={styles.row}>
              <div style={{...styles.cell, ...styles.feature}}>Rating</div>
              {rooms.map(room => (
                <div key={room.id} style={styles.cell}>
                  ⭐ {room.rating} ({room.reviews} reviews)
                </div>
              ))}
            </div>

            <div style={styles.row}>
              <div style={{...styles.cell, ...styles.feature}}>Bed Type</div>
              {rooms.map(room => (
                <div key={room.id} style={styles.cell}>
                  {room.bedType}
                </div>
              ))}
            </div>

            {allAmenities.map(amenity => (
              <div key={amenity} style={styles.row}>
                <div style={{...styles.cell, ...styles.feature}}>{amenity}</div>
                {rooms.map(room => (
                  <div key={room.id} style={styles.cell}>
                    {room.amenities.includes(amenity) ? (
                      <i className="fa-solid fa-check" style={{color:'#16a34a'}}></i>
                    ) : (
                      <i className="fa-solid fa-times" style={{color:'#9ca3af'}}></i>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
          <button style={styles.btnPrimary}>
            Book Selected Rooms
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComparisonModal;