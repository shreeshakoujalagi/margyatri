import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Activity, ArrowRight, Check, Sparkles, Loader } from 'lucide-react';

const PlanTrip = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        destination: '',
        duration: '3 Days',
        budget: 'Medium',
        vibe: []
    });

    const vibes = [
        { id: 'relaxed', icon: '🍃', label: 'Relaxed' },
        { id: 'adventure', icon: '🏔️', label: 'Adventure' },
        { id: 'party', icon: '🎉', label: 'Nightlife' },
        { id: 'culture', icon: '🏛️', label: 'Culture' },
    ];

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Simulate AI generation
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(4); // Success/Result step
            }, 3000);
        }
    };

    const toggleVibe = (id) => {
        setFormData(prev => ({
            ...prev,
            vibe: prev.vibe.includes(id)
                ? prev.vibe.filter(v => v !== id)
                : [...prev.vibe, id]
        }));
    };

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center bg-[var(--color-bg)] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />

            <div className="max-w-2xl w-full z-10">
                {/* Progress Bar */}
                <div className="mb-8 flex justify-center gap-2">
                    {[1, 2, 3, 4].map(s => (
                        <div
                            key={s}
                            className={`h-2 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-primary' : 'w-2 bg-[var(--color-border)]'}`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">Where to? 🌍</h2>
                            <p className="text-[var(--color-text-muted)] mb-8">Let's start your journey. Pick a destination.</p>

                            <div className="space-y-6">
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Manali, Goa, Jaipur..."
                                        className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl py-4 pl-12 pr-4 text-lg text-[var(--color-text)] focus:border-primary focus:bg-[var(--color-input-bg)] outline-none transition-all"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text-muted)] mb-3">Duration</label>
                                    <div className="flex gap-4">
                                        {['Weekend', '3-5 Days', 'Week+'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFormData({ ...formData, duration: opt })}
                                                className={`flex-1 py-3 rounded-xl border transition-all ${formData.duration === opt
                                                    ? 'bg-primary/20 border-primary text-primary font-bold'
                                                    : 'bg-[var(--color-input-bg)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-card-hover)]'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleNext} className="mt-8 w-full py-4 bg-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors">
                                Next Step <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <h2 className="text-3xl font-bold mb-2 text-[var(--color-text)]">Define your Style ✨</h2>
                            <p className="text-[var(--color-text-muted)] mb-8">What kind of experience are you looking for?</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {vibes.map(v => (
                                    <button
                                        key={v.id}
                                        onClick={() => toggleVibe(v.id)}
                                        className={`p-6 rounded-2xl border flex flex-col items-center gap-2 transition-all ${formData.vibe.includes(v.id)
                                            ? 'bg-secondary/20 border-secondary text-secondary font-bold'
                                            : 'bg-[var(--color-input-bg)] border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-card-hover)]'
                                            }`}
                                    >
                                        <span className="text-3xl">{v.icon}</span>
                                        <span className="font-semibold">{v.label}</span>
                                    </button>
                                ))}
                            </div>

                            <button onClick={handleNext} className="w-full py-4 bg-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors">
                                Next Step <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 rounded-3xl text-center"
                        >
                            {loading ? (
                                <div className="py-20 flex flex-col items-center">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 rounded-full border-4 border-primary/30 animate-spin border-t-primary" />
                                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-[var(--color-text)]">Asking AI...</h3>
                                    <p className="text-[var(--color-text-muted)]">Curating the perfect hidden gems based on traffic.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <h2 className="text-3xl font-bold mb-6 text-[var(--color-text)]">Budget 💰</h2>
                                    <div className="w-full space-y-4 mb-8">
                                        {['Economy (Focus on Experience)', 'Balanced (Comfort + Fun)', 'Luxury (Treat Yourself)'].map((opt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setFormData({ ...formData, budget: opt });
                                                    handleNext();
                                                }}
                                                className="w-full p-6 text-left rounded-2xl bg-[var(--color-input-bg)] border border-[var(--color-border)] hover:border-primary/50 hover:bg-[var(--color-card-hover)] transition-all flex justify-between items-center group"
                                            >
                                                <span className="text-lg font-medium group-hover:text-primary transition-colors text-[var(--color-text)]">{opt}</span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.budget === opt ? 'border-primary bg-primary' : 'border-gray-500'}`}>
                                                    {formData.budget === opt && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleNext} className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                        Generate Itinerary
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[var(--color-text)]">Trip Blueprint Ready!</h2>
                                    <p className="text-[var(--color-text-muted)] text-sm">Based on low traffic windows.</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="bg-[var(--color-input-bg)] p-4 rounded-xl border-l-4 border-primary">
                                    <h3 className="font-bold flex justify-between text-[var(--color-text)]">
                                        <span>Day 1: Arrival & Hidden Cafe</span>
                                        <span className="text-xs py-1 px-2 bg-green-500/20 text-green-400 rounded">Traffic: Low</span>
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Check in at {formData.destination}. Visit the 'Cloud View' point at 4 PM to avoid crowds.</p>
                                </div>
                                <div className="bg-[var(--color-input-bg)] p-4 rounded-xl border-l-4 border-secondary">
                                    <h3 className="font-bold text-[var(--color-text)]">Day 2: The Adventure</h3>
                                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Leave at 6 AM for the waterfall trek. AI predicts heavy tourist footfall after 9 AM.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-3 bg-primary rounded-xl font-bold hover:bg-primary-hover transition-colors text-white">
                                    Book This Plan
                                </button>
                                <button onClick={() => setStep(1)} className="flex-1 py-3 bg-[var(--color-input-bg)] rounded-xl font-bold border border-[var(--color-border)] hover:bg-[var(--color-card-hover)] transition-colors text-[var(--color-text)]">
                                    Restart
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PlanTrip;
