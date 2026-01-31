import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './BookingForm.css';

function BookingForm({ onConfirm, initialRoom }) {
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState(initialRoom?.checkIn || '')
  const [checkOut, setCheckOut] = useState(initialRoom?.checkOut || '')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [roomType, setRoomType] = useState('standard')

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    const a = new Date(checkIn)
    const b = new Date(checkOut)
    const d = (b - a) / (1000 * 60 * 60 * 24)
    return d > 0 ? d : 0
  }, [checkIn, checkOut])

  const basePrice = initialRoom ? initialRoom.pricePerNight : (roomType === 'suite' ? 240 : roomType === 'deluxe' ? 180 : 120)
  const total = nights * basePrice

  const today = new Date().toISOString().split('T')[0]

  const [step, setStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert('Select valid dates');
    if (new Date(checkOut) <= new Date(checkIn)) return alert('Check-out must be after check-in');
    setStep(2);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!paymentDetails.cardNumber || !paymentDetails.cvc) return alert('Please enter payment details');
    
    setIsProcessing(true);
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);

    onConfirm && onConfirm({ 
      checkIn, 
      checkOut, 
      adults, 
      children, 
      roomType: initialRoom ? initialRoom.name : roomType, 
      nights, 
      total,
      roomId: initialRoom?.id,
      payment: {
        method: 'credit_card',
        last4: paymentDetails.cardNumber.slice(-4)
      }
    });
  };

  return (
    <form className="booking-form" onSubmit={submit}>
      {initialRoom && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--c-bg-secondary)', borderRadius: '8px', border: '1px solid var(--c-border)' }}>
          <h4 style={{ margin: '0 0 4px 0', color: 'var(--c-text-primary)' }}>{t('booking.booking')}: {initialRoom.name}</h4>
          <span style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)' }}>${initialRoom.pricePerNight} {t('booking.perNight')}</span>
        </div>
      )}

      {step === 1 ? (
        <div className="booking-form__grid">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label>{t('booking.checkIn')}</label>
              <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label>{t('booking.checkOut')}</label>
              <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label>{t('booking.adults')}</label>
              <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label>{t('booking.children')}</label>
              <select value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label>{t('booking.room')}</label>
              {initialRoom ? (
                 <input type="text" value={initialRoom.name} disabled style={{ opacity: 0.7, cursor: 'not-allowed' }} />
              ) : (
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                  <option value="standard">{t('rooms.standard')}</option>
                  <option value="deluxe">{t('rooms.deluxe')}</option>
                  <option value="suite">{t('rooms.suite')}</option>
                </select>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <div>{t('booking.priceEstimate')}: <strong>${total}</strong></div>
            <button className="booking-form__submit" type="button" onClick={handleNext}>{t('booking.continuePayment')}</button>
          </div>
        </div>
      ) : (
        <div className="booking-form__payment">
          <div style={{ marginBottom: '1rem' }}>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              style={{ background: 'none', border: 'none', color: 'var(--c-text-secondary)', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
            >
              <i className="fa-solid fa-arrow-left" /> {t('booking.backDetails')}
            </button>
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <label>{t('booking.cardNumber')}</label>
              <input 
                type="text" 
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                maxLength={19}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label>{t('booking.expiry')}</label>
                <input 
                  type="text" 
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentDetails.expiry}
                  onChange={handlePaymentChange}
                />
              </div>
              <div>
                <label>{t('booking.cvc')}</label>
                <input 
                  type="text" 
                  name="cvc"
                  placeholder="123"
                  value={paymentDetails.cvc}
                  onChange={handlePaymentChange}
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <label>{t('booking.cardholder')}</label>
              <input 
                type="text" 
                name="name"
                placeholder="John Doe"
                value={paymentDetails.name}
                onChange={handlePaymentChange}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--c-border)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 600 }}>
              <span>{t('booking.totalPay')}:</span>
              <span>${total}</span>
            </div>
            <button 
              className="booking-form__submit" 
              type="submit" 
              disabled={isProcessing}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {isProcessing ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" /> {t('booking.processing')}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-lock" /> {t('booking.payBook')}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default BookingForm

