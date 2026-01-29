import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const destinations = [
    {
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
        rating: "4.9",
        category: "Cultural"
    },
    {
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1613395877344-13d4c79e4df1?q=80&w=800&auto=format&fit=crop",
        rating: "4.8",
        category: "Relaxation"
    },
    {
        name: "Lofoten, Norway",
        image: "https://images.unsplash.com/photo-1516399541795-8d55a9018151?q=80&w=800&auto=format&fit=crop",
        rating: "5.0",
        category: "Adventure"
    }
];

const TrendingDestinations = () => {
    return (
        <section className="py-24 bg-[var(--color-card-bg)]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text)] mb-2">
                            Trending This Week
                        </h2>
                        <p className="text-[var(--color-text-muted)]">
                            Most visited places by our community based on real-time data.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        View all places <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {destinations.map((place, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src={place.image}
                                alt={place.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 inset-x-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                                        {place.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                                        <Star className="w-4 h-4 fill-yellow-400" /> {place.rating}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{place.name}</h3>
                                <div className="flex items-center gap-1 text-white/70 text-sm">
                                    <MapPin className="w-4 h-4" /> Explore Guide
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingDestinations;
