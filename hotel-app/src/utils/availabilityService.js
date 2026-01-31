// Mock availability and pricing service

const MOCK_ROOMS = [
  { id: 'deluxe', name: 'Deluxe Room', capacity: 2, basePrice: 160, amenities: ['Wi-Fi', 'Breakfast', 'Sea View'], imageUrl: '/images/rooms/deluxe-1.jpg' },
  { id: 'suite', name: 'Executive Suite', capacity: 4, basePrice: 280, amenities: ['Wi-Fi', 'Breakfast', 'Balcony', 'Kitchenette'], imageUrl: '/images/rooms/suite-1.jpg' },
  { id: 'standard', name: 'Standard Room', capacity: 2, basePrice: 120, amenities: ['Wi-Fi', 'City View'], imageUrl: '/images/rooms/standard-1.jpg' },
  { id: 'family', name: 'Family Room', capacity: 5, basePrice: 220, amenities: ['Wi-Fi', 'Breakfast', 'Kids Bed'], imageUrl: '/images/rooms/family-1.jpg' }
]

export async function fetchAvailability({ checkIn, checkOut, guests, filters = {} }) {
  // Simulate latency
  await new Promise(r => setTimeout(r, 300))

  const nights = Math.max(1, daysBetween(checkIn, checkOut))
  let rooms = MOCK_ROOMS.map(r => ({
    ...r,
    pricePerNight: dynamicPrice(r.basePrice, guests),
    total: dynamicPrice(r.basePrice, guests) * nights
  }))

  if (filters.capacity) rooms = rooms.filter(r => r.capacity >= Number(filters.capacity))
  if (filters.amenity) rooms = rooms.filter(r => r.amenities.includes(filters.amenity))

  return rooms
}

function daysBetween(a, b) {
  if (!a || !b) return 1
  const d1 = new Date(a)
  const d2 = new Date(b)
  return Math.ceil((d2 - d1) / (1000*60*60*24))
}

function dynamicPrice(base, guests) {
  const g = Number(guests || 1)
  // Add small surcharge for more guests
  return Math.round(base * (1 + Math.max(0, g - 2) * 0.08))
}


