import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Award, Settings, LogOut, Camera, Edit2, Calendar, Heart, Shield, Wallet, Ticket, Plus, CreditCard, Gift, Map } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('trips');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const user = {
        name: authUser?.name || "Traveler",
        handle: authUser?.handle || "@yatri",
        location: "Bengaluru, India",
        level: "Explorer Lvl 7",
        points: 4850,
        bio: "Chasing sunsets and hidden trails. Always ready for the next adventure.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
        walletBalance: 2450,
        coupons: [
            { code: "YATRI500", discount: "₹500 OFF", desc: "On domestic flights > ₹5k" },
            { code: "FIRSTBUS", discount: "15% OFF", desc: "Up to ₹150 on bus bookings" }
        ]
    };

    const stats = [
        { label: 'Trips', value: '24', icon: <MapPin className="text-blue-400" /> },
        { label: 'States', value: '8', icon: <Map className="text-green-400" /> },
        { label: 'Photos', value: '142', icon: <Camera className="text-secondary" /> },
    ];

    const trips = [
        { id: 1, to: "Coorg, Karnataka", date: "Jan 12, 2026", status: "Completed", image: "https://images.unsplash.com/photo-1596328892425-2cb3fd18162f?q=80&w=200&auto=format&fit=crop", amount: "₹3,200" },
        { id: 2, to: "Varkala, Kerala", date: "Dec 24, 2025", status: "Completed", image: "https://images.unsplash.com/photo-1589136777351-943ca75cf26d?q=80&w=200&auto=format&fit=crop", amount: "₹8,500" },
        { id: 3, to: "Gokarna", date: "Feb 10, 2026", status: "Upcoming", image: "https://images.unsplash.com/photo-1534234526842-8e3b63f6e9eb?q=80&w=200&auto=format&fit=crop", amount: "₹4,100" },
        { id: 4, to: "Ooty, Tamil Nadu", date: "Nov 15, 2025", status: "Completed", image: "https://images.unsplash.com/photo-1571676643265-d0df3f0ae68c?q=80&w=200&auto=format&fit=crop", amount: "₹2,900" },
    ];

    // Map component alias for the icon
    function Map({ className }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="6" x2="15" y2="21" /></svg>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pb-20">
            {/* Cover Image */}
            <div className="h-64 md:h-80 w-full relative">
                <img
                    src={user.cover}
                    alt="Cover"
                    className="w-full h-full object-cover opacity-60 mask-image-b"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-950/20 to-slate-950" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Sidebar: Profile & Wallet */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full md:w-80 flex-shrink-0 space-y-6"
                    >
                        {/* Profile Info */}
                        <div className="glass-card p-6 rounded-2xl text-center relative overflow-hidden">
                            <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-primary to-secondary mb-4 relative">
                                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover border-4 border-[var(--color-bg)]" />
                                <button className="absolute bottom-0 right-0 p-2 bg-[var(--color-card-bg)] rounded-full border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-card-hover)]">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            <h2 className="text-2xl font-bold text-[var(--color-text)]">{user.name}</h2>
                            <p className="text-primary font-medium mb-1">{user.handle}</p>
                            <p className="text-[var(--color-text-muted)] text-sm flex items-center justify-center gap-1 mb-6">
                                <MapPin className="w-3 h-3" /> {user.location}
                            </p>

                            <div className="bg-[var(--color-input-bg)] rounded-xl p-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold uppercase text-[var(--color-text-muted)]">Current Level</span>
                                    <span className="text-xs font-bold text-yellow-400">{user.level}</span>
                                </div>
                                <div className="w-full bg-[var(--color-border)] h-2 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-[70%] h-full rounded-full" />
                                </div>
                                <p className="text-right text-xs text-[var(--color-text-muted)] mt-1">{user.points} / 5000 XP</p>
                            </div>

                            <p className="text-[var(--color-text-muted)] text-sm mb-6 italic">"{user.bio}"</p>

                            <div className="space-y-2">
                                <button className="w-full py-2.5 rounded-lg bg-[var(--color-input-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-card-hover)] flex items-center justify-center gap-2 transition-colors">
                                    <Settings className="w-4 h-4" /> Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Wallet Card - NEW */}
                        <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-lg text-[var(--color-text)]">Marg Wallet</span>
                            </div>
                            <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-muted)] mb-2">
                                ₹{user.walletBalance.toLocaleString()}
                            </h3>
                            <button className="w-full py-3 bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors border border-[var(--color-border)] text-[var(--color-text)]">
                                <Plus className="w-4 h-4" /> Add Money
                            </button>
                        </div>

                        {/* Coupons Card - NEW */}
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                                    <Ticket className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-lg text-[var(--color-text)]">Your Coupons</span>
                            </div>
                            <div className="space-y-3">
                                {user.coupons.map((coupon, i) => (
                                    <div key={i} className="bg-dashed border border-[var(--color-border)] border-dashed rounded-lg p-3 relative bg-[var(--color-input-bg)]">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-mono text-secondary font-bold text-lg">{coupon.code}</span>
                                            <span className="bg-green-500/20 text-green-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">{coupon.discount}</span>
                                        </div>
                                        <p className="text-xs text-[var(--color-text-muted)]">{coupon.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <div className="flex-1 space-y-6">

                        {/* Stats Row */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-[var(--color-card-hover)] transition-colors">
                                    <div className="p-2 rounded-full bg-[var(--color-input-bg)] mb-1">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[var(--color-text)]">{stat.value}</h3>
                                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Travel Map Visualization - NEW */}
                        <div className="glass-card p-6 rounded-2xl h-80 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 transition-transform duration-[10s] group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-glass-bg)] to-transparent"></div>

                            <div className="absolute top-6 left-6 z-10">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text)]">
                                    <Map className="w-5 h-5 text-primary" /> Your Travel Map
                                </h3>
                                <p className="text-[var(--color-text-muted)] text-sm">8 States • 24 Cities Explored</p>
                            </div>

                            {/* Floating Pins Animation */}
                            <div className="absolute inset-0 z-0">
                                {[{ top: '40%', left: '30%' }, { top: '60%', left: '50%' }, { top: '30%', left: '60%' }, { top: '70%', left: '40%' }].map((pos, i) => (
                                    <div key={i} className="absolute w-3 h-3 bg-secondary rounded-full animate-ping" style={{ ...pos, animationDelay: `${i}s` }} />
                                ))}
                            </div>

                            <button className="absolute bottom-6 right-6 z-10 px-4 py-2 bg-[var(--color-input-bg)] hover:bg-[var(--color-card-hover)] backdrop-blur-md rounded-lg text-sm border border-[var(--color-border)] transition-colors text-[var(--color-text)]">
                                View Full Map
                            </button>
                        </div>

                        {/* Tabs content */}
                        <div className="glass-card p-6 rounded-2xl min-h-[400px]">
                            <div className="flex gap-6 border-b border-[var(--color-border)] pb-4 mb-6 overflow-x-auto">
                                {['My Trips', 'Saved Gems', 'Transaction History'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                                        className={`pb-2 text-sm font-semibold transition-colors relative whitespace-nowrap ${activeTab === tab.toLowerCase().split(' ')[0]
                                            ? 'text-[var(--color-text)]'
                                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab.toLowerCase().split(' ')[0] && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-[-17px] left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Trip List */}
                            <div className="space-y-4">
                                {trips.map((trip) => (
                                    <motion.div
                                        key={trip.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-input-bg)] border border-transparent hover:border-[var(--color-border)] transition-all cursor-pointer group"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={trip.image} alt={trip.to} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-[var(--color-text)]">{trip.to}</h4>
                                            <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mt-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {trip.date}</span>
                                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${trip.status === 'Upcoming' ? 'bg-primary/20 text-primary-300' : 'bg-green-500/20 text-green-300'
                                                    }`}>
                                                    {trip.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-[var(--color-text)]">{trip.amount}</span>
                                            <span className="text-xs text-[var(--color-text-muted)]">Paid</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
