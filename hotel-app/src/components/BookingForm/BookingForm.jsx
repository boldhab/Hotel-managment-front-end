import React, { useMemo, useState } from 'react'
import './BookingForm.css'

function BookingForm({ onConfirm }) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
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

  const basePrice = roomType === 'suite' ? 240 : roomType === 'deluxe' ? 180 : 120
  const total = nights * basePrice

  const today = new Date().toISOString().split('T')[0]

  const submit = (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return alert('Select valid dates')
    if (new Date(checkOut) <= new Date(checkIn)) return alert('Check-out must be after check-in')
    onConfirm && onConfirm({ checkIn, checkOut, adults, children, roomType, nights, total })
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="booking-form__grid">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label>Check-in</label>
            <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div>
            <label>Check-out</label>
            <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div>
            <label>Adults</label>
            <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label>Children</label>
            <select value={children} onChange={(e) => setChildren(Number(e.target.value))}>
              {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label>Room</label>
            <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>Price estimate: <strong>${total}</strong></div>
          <button className="booking-form__submit" type="submit">Continue</button>
        </div>
      </div>
    </form>
  )
}

export default BookingForm

