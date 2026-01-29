import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TrendingDestinations from '../components/TrendingDestinations';

const Home = () => {
    return (
        <div className="flex flex-col w-full">
            <Hero />
            <Features />
            <TrendingDestinations />

            {/* Simple CTA Section */}
            <div className="py-20 flex justify-center bg-[var(--color-bg)]">
                <div className="relative w-full max-w-5xl mx-4 rounded-3xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-12 text-center text-white">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your journey?</h2>
                        <p className="mb-8 text-white/90 max-w-xl mx-auto">
                            Join thousands of travelers who are discovering the world smarter and faster.
                        </p>
                        <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
