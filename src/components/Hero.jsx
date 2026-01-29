import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Map, Zap, ArrowRight, Star, TrendingUp, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/aimaps');
    };

    const stats = [
        { label: "Active Users", value: "50k+" },
        { label: "Cities Mapped", value: "120+" },
        { label: "Traffic Saved", value: "45%" },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-bg)] transition-colors duration-500">

            {/* Background Texture - Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Dynamic Orbs */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-2000" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen flex flex-col md:flex-row items-center gap-12">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left z-10"
                >


                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-[var(--color-text)]">
                        Explore the World <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x">
                            Without the Chaos
                        </span>
                    </h1>

                    <p className="mt-4 text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto md:mx-0 mb-10 leading-relaxed">
                        Discover hidden gems, avoid crowded traps, and plan the perfect trip with real-time AI traffic predictions.
                    </p>

                    {/* Search Component */}
                    <div className="max-w-md mx-auto md:mx-0 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <form onSubmit={handleSearch} className="relative flex items-center bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-2 shadow-2xl">
                            <Map className="ml-3 text-[var(--color-text-muted)] w-6 h-6" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Where do you want to go?"
                                className="w-full bg-transparent px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none font-medium"
                            />
                            <button type="submit" className="bg-primary hover:bg-primary-hover text-white p-3 rounded-lg transition-all shadow-lg hover:shadow-primary/50">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-12 flex items-center justify-center md:justify-start gap-8 border-t border-[var(--color-border)] pt-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <h4 className="text-3xl font-bold text-[var(--color-text)]">{stat.value}</h4>
                                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Visuals - Floating Cards */}
                <div className="flex-1 relative h-[600px] w-full hidden md:block perspective-1000">
                    {/* Circle Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[var(--color-border)] rounded-full opacity-20 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-primary/20 rounded-full opacity-40 animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Floating Card 1 - Main Image */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-10 right-10 w-72 h-96 glass-card p-3 rounded-3xl rotate-[-6deg] z-10 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-primary/10"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop"
                                alt="Switzerland"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-lg">Swiss Alps</p>
                                <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                    <TrendingUp className="w-3 h-3" /> Low Traffic
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Card 2 - Secondary */}
                    <motion.div
                        style={{ y: y2 }}
                        className="absolute bottom-20 left-10 w-64 h-80 glass-card p-3 rounded-3xl rotate-[6deg] z-20 hover:rotate-0 transition-transform duration-500 shadow-2xl shadow-secondary/10"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop"
                                alt="Bali"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                                Hidden Gem
                            </div>
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-bold text-lg">Bali, Indonesia</p>
                                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                                    <Star className="w-3 h-3 fill-yellow-400" /> 4.9/5.0
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decoration Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="p-4 glass-card rounded-2xl flex items-center gap-3 border-l-4 border-primary">
                            <div className="bg-primary/20 p-2 rounded-lg text-primary">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-[var(--color-text-muted)]">AI Prediction</p>
                                <p className="text-sm font-bold text-[var(--color-text)]">Save 2h 15m today</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--color-text-muted)] to-transparent" />
                <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            </motion.div>

        </div>
    );
};

export default Hero;
