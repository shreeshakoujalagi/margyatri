import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bus, Train as TrainIcon, Car, Hotel, BedDouble, Users, User,
    ArrowRight, TrendingDown, CheckCircle, Wifi, Coffee, MapPin, Star,
    Briefcase, Utensils
} from 'lucide-react';

const Bookings = () => {
    // UI State
    const [bookingType, setBookingType] = useState('transport'); // 'transport' | 'stay'
    const [transportMode, setTransportMode] = useState('bus'); // 'bus' | 'train' | 'car'
    const [stayType, setStayType] = useState('hotel'); // 'hotel' | 'hostel'
    const [travellerType, setTravellerType] = useState('solo'); // 'solo' | 'family' | 'friends'

    // Selection State
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    // --- Mock Data ---

    // Seats for Bus/Train
    const seats = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        status: Math.random() > 0.7 ? 'occupied' : 'available',
        tier: i % 4 === 0 ? 'premium' : i % 2 === 0 ? 'standard' : 'eco',
        price: i % 4 === 0 ? 850 : i % 2 === 0 ? 650 : 450,
    }));

    // Car Rentals
    const cars = [
        { id: 1, name: 'Tesla Model 3', type: 'Electric', price: 4500, seats: 5, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400&auto=format&fit=crop' },
        { id: 2, name: 'Toyota Innova', type: 'SUV', price: 3500, seats: 7, image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=400&auto=format&fit=crop' },
        { id: 3, name: 'Swift Dezire', type: 'Sedan', price: 2200, seats: 4, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400&auto=format&fit=crop' },
    ];

    // Stays
    const stays = [
        { id: 1, name: 'Grand Mercure', type: 'hotel', price: 8500, rating: 4.8, location: 'City Center', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop', amenities: ['Wifi', 'Pool', 'Spa'] },
        { id: 2, name: 'Zostel Backpacker', type: 'hostel', price: 1200, rating: 4.5, location: 'Old Town', image: 'https://images.unsplash.com/photo-1555854743-e3c2f6f50935?q=80&w=400&auto=format&fit=crop', amenities: ['Wifi', 'Social', 'Kitchen'] },
        { id: 3, name: 'Cozy Homestay', type: 'hostel', price: 2500, rating: 4.9, location: 'Hillside', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=400&auto=format&fit=crop', amenities: ['Wifi', 'Home Food'] },
    ];

    // --- Helpers ---

    const getSeatColor = (seat) => {
        if (seat.status === 'occupied') return 'bg-[var(--color-input-bg)] cursor-not-allowed border-[var(--color-border)] opacity-50';
        if (selectedSeat === seat.id) return 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110 z-10';

        switch (seat.tier) {
            case 'eco': return 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/30 text-emerald-500';
            case 'standard': return 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/30 text-blue-500';
            case 'premium': return 'bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/30 text-rose-500';
            default: return 'bg-[var(--color-input-bg)] border-[var(--color-border)]';
        }
    };

    const calculateTotal = () => {
        let total = 0;
        if (bookingType === 'transport') {
            if (transportMode === 'car' && selectedCar) total = selectedCar.price;
            else if (selectedSeat) total = seats[selectedSeat - 1]?.price || 0;
        } else {
            if (selectedRoom) total = selectedRoom.price;
        }

        // Adjust for trip type
        if (travellerType === 'family') total *= 1.1; // Premium service
        if (travellerType === 'friends') total *= 0.95; // Group discount logic

        return Math.round(total);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                {/* Left Panel: Controls & Selection */}
                <div className="flex-1 space-y-8">

                    {/* Header Controls */}
                    <div className="glass-card p-6 rounded-3xl border border-[var(--color-border)]">
                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Customize Your Trip
                                </h1>
                                <p className="text-[var(--color-text-muted)] mt-1">Select your preferred mode and comfort level.</p>
                            </div>

                            {/* Traveller Type Toggle */}
                            <div className="flex bg-[var(--color-input-bg)] p-1 rounded-xl">
                                {['solo', 'family', 'friends'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setTravellerType(type)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${travellerType === type
                                                ? 'bg-white text-black shadow-md'
                                                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                                            }`}
                                    >
                                        {type === 'solo' && <User size={16} />}
                                        {type === 'family' && <Users size={16} />}
                                        {type === 'friends' && <Briefcase size={16} />}
                                        <span className="capitalize">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Category Toggles */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <button
                                onClick={() => setBookingType('transport')}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${bookingType === 'transport'
                                        ? 'border-primary bg-primary/5'
                                        : 'border-[var(--color-border)] hover:border-primary/50'
                                    }`}
                            >
                                <Bus className={`w-8 h-8 ${bookingType === 'transport' ? 'text-primary' : 'text-[var(--color-text-muted)]'}`} />
                                <span className={`font-bold ${bookingType === 'transport' ? 'text-primary' : 'text-[var(--color-text-muted)]'}`}>Transport</span>
                            </button>
                            <button
                                onClick={() => setBookingType('stay')}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${bookingType === 'stay'
                                        ? 'border-secondary bg-secondary/5'
                                        : 'border-[var(--color-border)] hover:border-secondary/50'
                                    }`}
                            >
                                <Hotel className={`w-8 h-8 ${bookingType === 'stay' ? 'text-secondary' : 'text-[var(--color-text-muted)]'}`} />
                                <span className={`font-bold ${bookingType === 'stay' ? 'text-secondary' : 'text-[var(--color-text-muted)]'}`}>Stays</span>
                            </button>
                        </div>

                        {/* Sub-Category Toggles */}
                        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                            {bookingType === 'transport' ? (
                                <>
                                    {[
                                        { id: 'bus', icon: Bus, label: 'Bus' },
                                        { id: 'train', icon: TrainIcon, label: 'Train' },
                                        { id: 'car', icon: Car, label: 'Personal Car' },
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => {
                                                setTransportMode(mode.id);
                                                setSelectedSeat(null);
                                                setSelectedCar(null);
                                            }}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${transportMode === mode.id
                                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                                                    : 'bg-[var(--color-card-bg)] border-[var(--color-border)] text-[var(--color-text)] hover:border-primary/50'
                                                }`}
                                        >
                                            <mode.icon size={18} />
                                            <span className="font-semibold">{mode.label}</span>
                                        </button>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {[
                                        { id: 'hotel', icon: Hotel, label: 'Hotels' },
                                        { id: 'hostel', icon: BedDouble, label: 'Hostels' },
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => {
                                                setStayType(mode.id);
                                                setSelectedRoom(null);
                                            }}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${stayType === mode.id
                                                    ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/25'
                                                    : 'bg-[var(--color-card-bg)] border-[var(--color-border)] text-[var(--color-text)] hover:border-secondary/50'
                                                }`}
                                        >
                                            <mode.icon size={18} />
                                            <span className="font-semibold">{mode.label}</span>
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* DYNAMIC CONTENT AREA */}
                    <motion.div
                        key={`${bookingType}-${transportMode}-${stayType}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {bookingType === 'transport' && (transportMode === 'bus' || transportMode === 'train') && (
                            <div className="glass-card p-8 rounded-3xl border border-[var(--color-border)]">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-bold text-[var(--color-text)]">Select Seats ({travellerType})</h3>
                                    <div className="flex gap-4 text-xs">
                                        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Eco</span>
                                        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Std</span>
                                        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Prem</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-w-lg mx-auto">
                                    {seats.map((seat) => (
                                        <button
                                            key={seat.id}
                                            disabled={seat.status === 'occupied'}
                                            onClick={() => setSelectedSeat(seat.id)}
                                            className={`h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all relative group ${getSeatColor(seat)}`}
                                        >
                                            {seat.status === 'occupied' ? <User size={14} /> : seat.id}
                                            {seat.status !== 'occupied' && (
                                                <div className="hidden group-hover:block absolute -top-8 bg-black text-white text-[10px] py-1 px-2 rounded opacity-90 whitespace-nowrap z-20">
                                                    ₹{seat.price}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {bookingType === 'transport' && transportMode === 'car' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cars.map(car => (
                                    <div
                                        key={car.id}
                                        onClick={() => setSelectedCar(car)}
                                        className={`glass-card p-4 rounded-3xl border cursor-pointer transition-all ${selectedCar?.id === car.id
                                                ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                                                : 'border-transparent hover:border-primary/30'
                                            }`}
                                    >
                                        <div className="h-40 rounded-2xl overflow-hidden mb-4 relative">
                                            <img src={car.image} className="w-full h-full object-cover" alt={car.name} />
                                            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg">
                                                {car.type}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className="font-bold text-lg text-[var(--color-text)]">{car.name}</h3>
                                                <p className="text-[var(--color-text-muted)] text-sm">{car.seats} Seats • AC</p>
                                            </div>
                                            <p className="font-bold text-primary">₹{car.price}/day</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {bookingType === 'stay' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stays
                                    .filter(s => s.type === stayType || (stayType === 'hostel' && s.type === 'hostel')) // Mock filter
                                    .map(stay => (
                                        <div
                                            key={stay.id}
                                            onClick={() => setSelectedRoom(stay)}
                                            className={`glass-card p-4 rounded-3xl border cursor-pointer transition-all ${selectedRoom?.id === stay.id
                                                    ? 'border-secondary ring-2 ring-secondary/20 bg-secondary/5'
                                                    : 'border-transparent hover:border-secondary/30'
                                                }`}
                                        >
                                            <div className="h-48 rounded-2xl overflow-hidden mb-4 relative">
                                                <img src={stay.image} className="w-full h-full object-cover" alt={stay.name} />
                                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {stay.rating}
                                                </div>
                                            </div>
                                            <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">{stay.name}</h3>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {stay.amenities.map(a => (
                                                    <span key={a} className="text-[10px] bg-[var(--color-input-bg)] px-2 py-1 rounded-md text-[var(--color-text-muted)]">{a}</span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center border-t border-[var(--color-border)] pt-3">
                                                <span className="text-xs text-[var(--color-text-muted)]">{stay.location}</span>
                                                <span className="font-bold text-secondary">₹{stay.price}<span className="text-[var(--color-text-muted)] text-xs font-normal">/night</span></span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right Panel: Summary & Checkout */}
                <div className="w-full lg:w-96 space-y-6">

                    {/* Insights Card */}
                    <div className="glass-card p-6 rounded-3xl relative overflow-hidden bg-gradient-to-br from-[var(--color-card-bg)] to-[var(--color-input-bg)]">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingDown size={80} />
                        </div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-[var(--color-text)]">
                            <span className="p-1 rounded bg-green-500/20 text-green-400"><TrendingDown size={14} /></span>
                            Smart Insight
                        </h3>
                        <p className="text-sm text-[var(--color-text-muted)] mb-4">
                            {bookingType === 'transport'
                                ? "Traveling on weekdays can save you up to 15%."
                                : "Book 3 days in advance for best hotel rates."}
                        </p>
                        <div className="h-16 flex items-end justify-between gap-1">
                            {[40, 70, 30, 80, 50, 90, 40].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 rounded-t" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Card */}
                    <div className="glass-card p-6 rounded-3xl border-t-4 border-primary">
                        <h3 className="text-xl font-bold mb-6 text-[var(--color-text)]">Booking Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--color-text-muted)]">Type</span>
                                <span className="font-semibold text-[var(--color-text)] capitalize">{bookingType === 'transport' ? transportMode : stayType}</span>
                            </div>

                            {travellerType !== 'solo' && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--color-text-muted)]">Group</span>
                                    <span className="font-semibold text-[var(--color-text)] capitalize">{travellerType}</span>
                                </div>
                            )}

                            {(selectedSeat || selectedCar || selectedRoom) ? (
                                <>
                                    <div className="h-px bg-[var(--color-border)] my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-[var(--color-text)]">Total</span>
                                        <span className="font-bold text-2xl text-primary">₹{calculateTotal()}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4 text-[var(--color-text-muted)] text-sm italic bg-[var(--color-input-bg)] rounded-xl border border-dashed border-[var(--color-border)]">
                                    Select an option to view price
                                </div>
                            )}
                        </div>

                        <button
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!selectedSeat && !selectedCar && !selectedRoom}
                        >
                            Confirm & Pay
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Bookings;
