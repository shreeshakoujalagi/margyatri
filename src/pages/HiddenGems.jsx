import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Unlock, Eye, Heart } from 'lucide-react';

const gems = [
    {
        id: 1,
        title: "The Floating Temple",
        location: "Hampi, Karnataka",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600&auto=format&fit=crop",
        rating: 4.9,
        secretLevel: "High",
        tags: ["Ancient", "Peaceful"]
    },
    {
        id: 2,
        title: "Midnight Bioluminescence",
        location: "Gokarna, Karnataka",
        image: "https://images.unsplash.com/photo-1534234526842-8e3b63f6e9eb?q=80&w=600&auto=format&fit=crop",
        rating: 4.8,
        secretLevel: "Extreme",
        tags: ["Nature", "Night"]
    },
    {
        id: 3,
        title: "Whispering Caves",
        location: "Meghalaya",
        image: "https://images.unsplash.com/photo-1596484552802-147a1672323e?q=80&w=600&auto=format&fit=crop",
        rating: 4.7,
        secretLevel: "Medium",
        tags: ["Adventure", "Caving"]
    },
    {
        id: 4,
        title: "Valley of Flowers",
        location: "Uttarakhand",
        image: "https://images.unsplash.com/photo-1549646636-f32773d5789f?q=80&w=600&auto=format&fit=crop",
        rating: 5.0,
        secretLevel: "Medium",
        tags: ["Scenic", "Trekking"]
    },
    {
        id: 5,
        title: "Ghost Village",
        location: "Kuldhara, Rajasthan",
        image: "https://images.unsplash.com/photo-1628081373587-c3358dfa3243?q=80&w=600&auto=format&fit=crop",
        rating: 4.6,
        secretLevel: "High",
        tags: ["Haunted", "History"]
    },
    {
        id: 6,
        title: "Emerald Lake",
        location: "Ooty, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1571676643265-d0df3f0ae68c?q=80&w=600&auto=format&fit=crop",
        rating: 4.8,
        secretLevel: "Low",
        tags: ["Lake", "Picnic"]
    }
];

const HiddenGems = () => {
    return (
        <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text)]">
                        Unlock <span className="gradient-text">Hidden Gems</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Discover destinations that don't make it to the travel brochures.
                        Curated by locals, verified by AI.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gems.map((gem, index) => (
                        <motion.div
                            key={gem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Image Background */}
                            <img
                                src={gem.image}
                                alt={gem.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">

                                {/* Top Badges */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <div className="glass-card px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-white">
                                        <Unlock className="w-3 h-3 text-secondary" />
                                        {gem.secretLevel} Secret
                                    </div>
                                    <button className="p-2 glass-card rounded-full hover:bg-white/20 transition-colors">
                                        <Heart className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex gap-2 mb-2">
                                        {gem.tags.map(tag => (
                                            <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-primary/20 text-primary-300 border border-primary/20">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-primary-300 transition-colors">{gem.title}</h3>

                                    <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-4">
                                        <MapPin className="w-4 h-4" />
                                        {gem.location}
                                    </div>

                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="font-bold">{gem.rating}</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-sm font-semibold hover:text-primary-300 transition-colors">
                                            View Details <Eye className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HiddenGems;
