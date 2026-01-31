import React, { Suspense, useEffect, useMemo, useState, useTransition } from "react";
const RoomCard = React.lazy(() => import("../RoomCard/RoomCard"));
import RoomCardSkeleton from "./RoomCardSkeleton";
const ComparisonModal = React.lazy(() => import("./ComparisonModal"));
import "./Rooms.css";


const mockRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    imageUrl: "/images/Roooms/room-1.jpg",
    pricePerNight: 299,
    capacity: 3,
    rating: 4.8,
    reviews: 127,
    size: "45m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "Balcony", "Air Conditioning", "Smart TV"],
    description: "Luxurious room with stunning ocean views and premium amenities.",
    images: [
      "/images/Roooms/room-1.jpg",
      "/images/Roooms/bath-room-1.jpg",
     
    ]
  },
  {
    id: 2,
    name: "Standard City View", 
    imageUrl: "/images/Roooms/room-2.jpg",
    pricePerNight: 159,
    capacity: 2,
    rating: 4.2,
    reviews: 89,
    size: "28m²",
    bedType: "Queen Bed",
    amenities: ["Wi-Fi", "Breakfast", "City View", "TV", "Air Conditioning"],
    description: "Comfortable room with beautiful city skyline views.",
    images: [
      "/images/Roooms/room-2.jpg",
      "/images/Roooms/bath-room-1.jpg"
    ]
  },
  {
    id: 3,
    name: "Family Suite",
    imageUrl: "/images/Roooms/room-3.jpg",
    pricePerNight: 399,
    capacity: 6,
    rating: 4.9,
    reviews: 203,
    size: "75m²",
    bedType: "King + 2 Single Beds",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "Kitchenette", "Kids Bed", "Two Bathrooms", "Smart TV"],
    description: "Spacious suite perfect for families with children.",
    images: [
      "/images/Roooms/room-3.jpg",
      "/images/Roooms/bath-room-5.jpg",
     
    ]
  },
  {
    id: 4,
    name: "Luxury Penthouse",
    imageUrl: "/images/Roooms/room-4.jpg",
    pricePerNight: 599,
    capacity: 4,
    rating: 4.95,
    reviews: 56,
    size: "120m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "Panoramic View", "Private Jacuzzi", "Kitchen", "Bar", "Smart TV", "Sound System"],
    description: "Ultimate luxury with breathtaking panoramic views and premium amenities.",
    images: [
      "/images/Roooms/room-4.jpg",
      "/images/Roooms/bath-room-2.jpg",
      
    ]
  },
  {
    id: 5,
    name: "Business Room",
    imageUrl: "/images/Roooms/room-5.jpg",
    pricePerNight: 229,
    capacity: 2,
    rating: 4.4,
    reviews: 167,
    size: "32m²",
    bedType: "Queen Bed",
    amenities: ["Wi-Fi", "Breakfast", "City View", "Work Desk", "Printer Service", "Air Conditioning"],
    description: "Productive environment for business travelers.",
    images: [
      "/images/Roooms/room-5.jpg",
      "/images/Roooms/bath-room-6.jpg"
    ]
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    imageUrl: "/images/Roooms/room-1.jpg",
    pricePerNight: 459,
    capacity: 2,
    rating: 4.85,
    reviews: 94,
    size: "55m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "King Bed", "Champagne", "Flowers", "Jacuzzi", "Balcony"],
    description: "Romantic suite perfect for honeymooners and special occasions.",
    images: [
      "/images/Roooms/room-6.jpg",
      "/images/Roooms/bath-room-5.jpg",
      
    ]
  },
  {
    id: 7,
    name: "Premium Suite",
    imageUrl: "/images/Roooms/room-2.jpg",
    pricePerNight: 389,
    capacity: 3,
    rating: 4.6,
    reviews: 78,
    size: "50m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "Balcony", "Mini Bar", "Smart TV", "Air Conditioning"],
    description: "Premium suite with extra space and luxury features.",
    images: [
      "/images/Roooms/room-8.jpg",
      "/images/Roooms/bath-room-6.jpg"
    ]
  },
  {
    id: 8,
    name: "Executive Room",
    imageUrl: "/images/Roooms/room-5.jpg",
    pricePerNight: 329,
    capacity: 2,
    rating: 4.5,
    reviews: 112,
    size: "38m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "City View", "Work Desk", "Coffee Maker", "Smart TV"],
    description: "Executive class room with enhanced business amenities.",
    images: [
      "/images/Roooms/room-9.jpg",
      "/images/Roooms/bath-room-4.jpg"
    ]
  },
  {
    id: 9,
    name: "Deluxe Family Room",
    imageUrl: "/images/Roooms/room-1.jpg",
    pricePerNight: 429,
    capacity: 5,
    rating: 4.7,
    reviews: 145,
    size: "65m²",
    bedType: "King + Bunk Beds",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "Kids Bed", "Two Bathrooms", "Smart TV", "Game Console"],
    description: "Family-friendly room with separate sleeping areas for children.",
    images: [
      "/images/Roooms/room-10.jpg",
      "/images/Roooms/bath-room-3.jpg"
    ]
  },
  {
    id: 10,
    name: "Ocean Front Suite",
    imageUrl: "/images/Roooms/room-11.jpg",
    pricePerNight: 519,
    capacity: 4,
    rating: 4.9,
    reviews: 67,
    size: "70m²",
    bedType: "King Bed",
    amenities: ["Wi-Fi", "Breakfast", "Sea View", "Balcony", "Jacuzzi", "Smart TV", "Sound System"],
    description: "Direct ocean front suite with private balcony and jacuzzi.",
    images: [
      "/images/Roooms/room-11.jpg",
      "/images/Roooms/bath-room-2.jpg",
     
    ]
  }
];

// Mock bookings data for availability
const mockBookings = [
  { roomId: 1, checkIn: '2024-12-20', checkOut: '2024-12-25' },
  { roomId: 3, checkIn: '2024-12-15', checkOut: '2024-12-18' },
  { roomId: 6, checkIn: '2024-12-22', checkOut: '2024-12-28' },
];

// Custom hook for debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for selected rooms persistence
const useSelectedRooms = () => {
  const [selected, setSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedRooms');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const updateSelected = (newSelected) => {
    setSelected(newSelected);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedRooms', JSON.stringify(newSelected));
    }
  };

  return [selected, updateSelected];
};

// Custom hook for URL state management
const useURLState = () => {
  const [params, setParams] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        checkIn: '',
        checkOut: '',
        guests: 2,
        capacity: 0,
        amenity: '',
        search: '',
        priceMax: 1000
      };
    }

    const urlParams = new URLSearchParams(window.location.search);
    return {
      checkIn: urlParams.get('checkIn') || '',
      checkOut: urlParams.get('checkOut') || '',
      guests: parseInt(urlParams.get('guests')) || 2,
      capacity: parseInt(urlParams.get('capacity')) || 0,
      amenity: urlParams.get('amenity') || '',
      search: urlParams.get('search') || '',
      priceMax: parseInt(urlParams.get('priceMax')) || 1000
    };
  });

  const updateParams = (newParams) => {
    const updated = { ...params, ...newParams };
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams();
      
      Object.entries(updated).forEach(([key, value]) => {
        if (value && value !== '' && value !== 0 && value !== 2) {
          urlParams.set(key, value.toString());
        }
      });
      
      window.history.replaceState({}, '', `?${urlParams.toString()}`);
    }
    setParams(updated);
  };

  return [params, updateParams];
};

// Availability check function
const checkRoomAvailability = (roomId, checkIn, checkOut, bookings) => {
  if (!checkIn || !checkOut) return true;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  // Check if dates are valid
  if (checkInDate >= checkOutDate) return true;
  
  const roomBookings = bookings.filter(booking => booking.roomId === roomId);
  
  return !roomBookings.some(booking => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);
    return checkInDate < bookingEnd && checkOutDate > bookingStart;
  });
};

function Rooms() {
  // State from URL parameters
  const [urlParams, updateUrlParams] = useURLState();
  
  // Local state
  const [checkIn, setCheckIn] = useState(urlParams.checkIn);
  const [checkOut, setCheckOut] = useState(urlParams.checkOut);
  const [guests, setGuests] = useState(urlParams.guests);
  const [capacity, setCapacity] = useState(urlParams.capacity);
  const [amenity, setAmenity] = useState(urlParams.amenity);
  const [searchTerm, setSearchTerm] = useState(urlParams.search);
  const [priceRange, setPriceRange] = useState([0, urlParams.priceMax]);
  const [sort, setSort] = useState("priceAsc");
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useSelectedRooms();
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Calculate today's date for date input min attribute
  const today = new Date().toISOString().split('T')[0];

  // Update URL when filters change (debounced to reduce navigation jank)
  useEffect(() => {
    const t = setTimeout(() => {
      updateUrlParams({
        checkIn,
        checkOut,
        guests,
        capacity,
        amenity,
        search: searchTerm,
        priceMax: priceRange[1]
      });
    }, 150);
    return () => clearTimeout(t);
  }, [checkIn, checkOut, guests, capacity, amenity, searchTerm, priceRange, updateUrlParams]);

  // Load rooms when filters change
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacity, amenity, debouncedSearchTerm, priceRange, checkIn, checkOut, guests, minRating]);

  // Mock API call function
  const mockAPICall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredRooms = [...mockRooms];
        
        // Filter by capacity
        if (capacity > 0) {
          filteredRooms = filteredRooms.filter(room => room.capacity >= capacity);
        }
        
        // Filter by guests
        if (guests > 0) {
          filteredRooms = filteredRooms.filter(room => room.capacity >= guests);
        }
        
        // Filter by amenity
        if (amenity) {
          filteredRooms = filteredRooms.filter(room => 
            room.amenities.includes(amenity)
          );
        }
        
        // Filter by search term
        if (debouncedSearchTerm) {
          filteredRooms = filteredRooms.filter(room =>
            room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            room.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        }
        
        // Filter by price range
        if (priceRange[1] < 1000) {
          filteredRooms = filteredRooms.filter(room => 
            room.pricePerNight >= priceRange[0] && room.pricePerNight <= priceRange[1]
          );
        }
        
        // Filter by rating
        if (minRating > 0) {
          filteredRooms = filteredRooms.filter(room => (room.rating || 0) >= minRating);
        }

        // Filter by availability
        if (checkIn && checkOut) {
          filteredRooms = filteredRooms.filter(room =>
            checkRoomAvailability(room.id, checkIn, checkOut, mockBookings)
          );
        }
        
        resolve(filteredRooms);
      }, 800); // Simulate API delay
    });
  };

  async function load() {
    setLoading(true);
    try {
      const filteredRooms = await mockAPICall();
      startTransition(() => {
        setRooms(filteredRooms);
        setLoading(false);
      });
    } catch (error) {
      console.error('Failed to load rooms:', error);
      startTransition(() => {
        setRooms([]);
        setLoading(false);
      });
    }
  }

  const sortedRooms = useMemo(() => {
    const out = [...rooms];
    
    switch (sort) {
      case "priceAsc":
        return out.sort((a, b) => a.pricePerNight - b.pricePerNight);
      case "priceDesc":
        return out.sort((a, b) => b.pricePerNight - a.pricePerNight);
      case "ratingDesc":
        return out.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "ratingAsc":
        return out.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case "capDesc":
        return out.sort((a, b) => b.capacity - a.capacity);
      case "sizeDesc":
        return out.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
      case "nameAsc":
        return out.sort((a, b) => a.name.localeCompare(b.name));
      case "nameDesc":
        return out.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return out;
    }
  }, [rooms, sort]);
  const availabilityMap = useMemo(() => {
    const map = {};
    if (!checkIn || !checkOut) return map;
    sortedRooms.forEach(room => {
      map[room.id] = checkRoomAvailability(room.id, checkIn, checkOut, mockBookings);
    });
    return map;
  }, [sortedRooms, checkIn, checkOut]);

  const toggleSelect = (id) => {
    const newSelected = { ...selected, [id]: !selected[id] };
    setSelected(newSelected);
  };

  const selectedRooms = useMemo(() => 
    sortedRooms.filter((r) => selected[r.id]), 
    [sortedRooms, selected]
  );

  const handleCompare = () => {
    if (selectedRooms.length < 2) {
      alert('Please select at least 2 rooms to compare');
      return;
    }
    setShowComparisonModal(true);
  };

  const clearAllFilters = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setCapacity(0);
    setAmenity("");
    setSearchTerm("");
    setPriceRange([0, 1000]);
    setSort("priceAsc");
  };

  const hasActiveFilters = checkIn || checkOut || guests !== 2 || capacity !== 0 || amenity || searchTerm || priceRange[1] < 1000;

  // Fade-in on scroll for cards
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sortedRooms]);

  return (
    <section id="rooms" className="rooms">
      <div className="rooms__header">
        <h2>Available Rooms</h2>
        <p>Find the perfect room for your stay</p>
      </div>

      <div className="rooms__controls">
        <div className="rooms__search-section">
          <input
            type="text"
            placeholder="Search rooms by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rooms__search"
          />
          {hasActiveFilters && (
            <button className="rooms__clear-filters" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          )}
        </div>

        <div className="rooms__filters-grid">
          <div className="filter-group">
            <label>Dates</label>
            <div className="date-inputs">
              <input 
                type="date" 
                value={checkIn} 
                min={today}
                onChange={(e) => setCheckIn(e.target.value)} 
                placeholder="Check-in" 
                title="Check-in" 
              />
              <input 
                type="date" 
                value={checkOut} 
                min={checkIn || today}
                onChange={(e) => setCheckOut(e.target.value)} 
                placeholder="Check-out" 
                title="Check-out" 
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Guests & Capacity</label>
            <div className="guest-inputs">
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>
                    {n} {n===1?'Guest':'Guests'}
                  </option>
                ))}
              </select>

              <select value={capacity} onChange={(e) => setCapacity(Number(e.target.value))}>
                <option value={0}>Any capacity</option>
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>{n}+ guests</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label>Amenities</label>
            <select value={amenity} onChange={(e) => setAmenity(e.target.value)}>
              <option value="">All Amenities</option>
              {['Wi-Fi','Breakfast','Sea View','Balcony','Kitchenette','City View','Kids Bed','Jacuzzi','Smart TV','Air Conditioning'].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Min Rating</label>
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
              {[0,3,3.5,4,4.5].map(r => (
                <option key={r} value={r}>{r === 0 ? 'Any' : `${r}+`}</option>
              ))}
            </select>
          </div>

          
        </div>

        <div className="rooms__sorting">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="ratingDesc">Highest Rated</option>
            <option value="ratingAsc">Lowest Rated</option>
            <option value="capDesc">Largest Capacity</option>
            <option value="sizeDesc">Largest Size</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </select>
        </div>
        
      </div>

      {selectedRooms.length > 0 && (
        <div className="rooms__compare-bar">
          <div className="compare-info">
            <strong>{selectedRooms.length}</strong> room{selectedRooms.length !== 1 ? 's' : ''} selected for comparison
          </div>
          <button 
            className="rooms__compare-btn" 
            onClick={handleCompare}
            disabled={selectedRooms.length < 2}
          >
            <i className="fa-solid fa-code-compare" /> 
            Compare {selectedRooms.length > 1 ? `(${selectedRooms.length})` : ''}
          </button>
          <button 
            className="rooms__clear-selection"
            onClick={() => setSelected({})}
          >
            Clear Selection
          </button>
        </div>
      )}

      {loading ? (
        <div className="rooms__loading">
          <div className="loading-spinner">
            <i className="fa-solid fa-spinner fa-spin" />
          </div>
          <p>Finding the perfect rooms for you...</p>
          <div className="rooms__grid">
            {[...Array(6)].map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {sortedRooms.length === 0 ? (
            <div className="rooms__empty">
              <i className="fa-solid fa-magnifying-glass" />
              <h3>No rooms found</h3>
              <p>Try adjusting your filters or search terms to see more options.</p>
              <button className="rooms__clear-filters" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="rooms__results-info">
                <p>Showing {sortedRooms.length} of {mockRooms.length} rooms</p>
              </div>
              <div className="rooms__grid">
                {sortedRooms.map((room) => (
                  <div key={room.id} className="fade-in-on-scroll">
                    <Suspense fallback={<RoomCardSkeleton />}> 
                      <RoomCard
                        room={room}
                        selected={!!selected[room.id]}
                        onToggleSelect={() => toggleSelect(room.id)}
                        onView={(r) => console.log('View room', r)}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        available={availabilityMap[room.id] ?? true}
                      />
                    </Suspense>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {showComparisonModal && (
        <Suspense fallback={null}>
          <ComparisonModal
            rooms={selectedRooms}
            onClose={() => setShowComparisonModal(false)}
          />
        </Suspense>
      )}
    </section>
  );
}

export default Rooms;