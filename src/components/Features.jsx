import React from 'react';
import { motion } from 'framer-motion';
import { Map, Zap, Compass, Shield, Smartphone, Globe } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: "AI-Powered Routing",
        description: "Our algorithms predict traffic patterns minutes into the future, saving you hours on the road."
    },
    {
        icon: <Compass className="w-6 h-6 text-cyan-400" />,
        title: "Hidden Gems",
        description: "Discover verified local secrets and unmapped locations that standard maps miss."
    },
    {
        icon: <Shield className="w-6 h-6 text-green-400" />,
        title: "Safe & Secure",
        description: "Real-time safety alerts and verified safe zones for peace of mind while traveling."
    },
    {
        icon: <Globe className="w-6 h-6 text-purple-400" />,
        title: "Global Offline Maps",
        description: "Access detailed maps and navigation even without an internet connection."
    }
];

const Features = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-muted)] mb-4">
                        Why Travel with Marg Yatri?
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-lg">
                        We don't just show you the way; we upgrade your entire journey with cutting-edge technology.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 rounded-3xl border border-[var(--color-border)] hover:border-primary/30 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-[var(--color-bg)] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-[var(--color-border)] group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[var(--color-text)]">{feature.title}</h3>
                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
