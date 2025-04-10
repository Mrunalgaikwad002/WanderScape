import React, { useState } from 'react';
import { FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaHotel, FaCarSide, FaTimes, FaStar, FaMoneyBillWave, FaPassport } from 'react-icons/fa';
import styles from './Trips.module.css';

const Trips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Mock data for trips
  const trips = {
    upcoming: [],
    ongoing: [],
    past: [
      {
        id: 1,
        destination: 'Kaziranga, Assam',
        startDate: '2024-01-15',
        endDate: '2024-01-20',
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1577114995803-d8ce0e2b4aa9',
        hotel: 'Kaziranga Resort',
        transport: 'Flight + Safari Vehicle',
        activities: ['Wildlife Safari', 'River Cruise', 'Cultural Show'],
        bookingDetails: {
          bookingId: 'KZA15012024',
          price: '₹45,000',
          guests: 2,
          roomType: 'Deluxe Suite',
          mealPlan: 'All Inclusive',
          flightNo: 'AI-789',
          departureTime: '10:30 AM',
          arrivalTime: '1:45 PM'
        },
        highlights: [
          'Spotted one-horned rhinoceros',
          'Traditional Assamese dance performance',
          'Local cuisine experience',
          'Sunrise elephant safari'
        ]
      },
      {
        id: 2,
        destination: 'Rome, Italy',
        startDate: '2024-02-05',
        endDate: '2024-02-12',
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        hotel: 'Roma Grand Hotel',
        transport: 'Flight + City Transfer',
        activities: ['Colosseum Tour', 'Vatican Visit', 'Food Tour'],
        bookingDetails: {
          bookingId: 'ROM05022024',
          price: '₹1,25,000',
          guests: 2,
          roomType: 'Premium Room',
          mealPlan: 'Breakfast Included',
          flightNo: 'AZ-456',
          departureTime: '9:15 PM',
          arrivalTime: '6:30 AM'
        },
        highlights: [
          'Skip-the-line Vatican Museums access',
          'Traditional pasta making class',
          'Sunset view from Palatine Hill',
          'Private guided tour of ancient Rome'
        ]
      }
    ]
  };

  const renderTripCard = (trip) => {
    const startDate = new Date(trip.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const endDate = new Date(trip.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <div key={trip.id} className={styles.tripCard}>
        <div className={styles.tripImage} style={{ backgroundImage: `url(${trip.image})` }}>
          <div className={styles.tripStatus}>{trip.status}</div>
        </div>
        <div className={styles.tripContent}>
          <h3 className={styles.destination}>
            <FaMapMarkerAlt /> {trip.destination}
          </h3>
          <div className={styles.tripDetails}>
            <div className={styles.dateRange}>
              <FaCalendarAlt />
              <span>{startDate} - {endDate}</span>
            </div>
            <div className={styles.accommodation}>
              <FaHotel />
              <span>{trip.hotel}</span>
            </div>
            <div className={styles.transport}>
              <FaCarSide />
              <span>{trip.transport}</span>
            </div>
          </div>
          <div className={styles.activities}>
            <h4>Planned Activities:</h4>
            <div className={styles.activityTags}>
              {trip.activities.map((activity, index) => (
                <span key={index} className={styles.activityTag}>{activity}</span>
              ))}
            </div>
          </div>
          <button className={styles.viewDetailsBtn} onClick={() => setSelectedTrip(trip)}>
            View Details
          </button>
        </div>
      </div>
    );
  };

  const renderTripModal = () => {
    if (!selectedTrip) return null;

    const startDate = new Date(selectedTrip.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const endDate = new Date(selectedTrip.endDate).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <div className={styles.modalOverlay} onClick={() => setSelectedTrip(null)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={() => setSelectedTrip(null)}>
            <FaTimes />
          </button>
          
          <div className={styles.modalImage} style={{ backgroundImage: `url(${selectedTrip.image})` }}>
            <h2>{selectedTrip.destination}</h2>
          </div>

          <div className={styles.modalContent}>
            <div className={styles.modalSection}>
              <h3><FaCalendarAlt /> Trip Duration</h3>
              <p>From: {startDate}</p>
              <p>To: {endDate}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaPassport /> Booking Details</h3>
              <p><strong>Booking ID:</strong> {selectedTrip.bookingDetails.bookingId}</p>
              <p><strong>Guests:</strong> {selectedTrip.bookingDetails.guests}</p>
              <p><strong>Room Type:</strong> {selectedTrip.bookingDetails.roomType}</p>
              <p><strong>Meal Plan:</strong> {selectedTrip.bookingDetails.mealPlan}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaPlane /> Flight Information</h3>
              <p><strong>Flight Number:</strong> {selectedTrip.bookingDetails.flightNo}</p>
              <p><strong>Departure:</strong> {selectedTrip.bookingDetails.departureTime}</p>
              <p><strong>Arrival:</strong> {selectedTrip.bookingDetails.arrivalTime}</p>
            </div>

            <div className={styles.modalSection}>
              <h3><FaStar /> Trip Highlights</h3>
              <ul className={styles.highlightsList}>
                {selectedTrip.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className={styles.modalSection}>
              <h3><FaMoneyBillWave /> Price</h3>
              <p className={styles.price}>{selectedTrip.bookingDetails.price}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.tripsContainer}>
      <div className={styles.header}>
        <h1>My Trips</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.active : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'ongoing' ? styles.active : ''}`}
            onClick={() => setActiveTab('ongoing')}
          >
            Ongoing
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'past' ? styles.active : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
      </div>

      <div className={styles.tripsList}>
        {trips[activeTab].length > 0 ? (
          trips[activeTab].map(trip => renderTripCard(trip))
        ) : (
          <div className={styles.noTrips}>
            <FaPlane />
            <h3>No {activeTab} trips</h3>
            <p>Time to plan your next adventure!</p>
            <button className={styles.planTripBtn}>Plan a Trip</button>
          </div>
        )}
      </div>

      {renderTripModal()}
    </div>
  );
};

export default Trips; 