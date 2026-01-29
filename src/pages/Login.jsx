import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showAnimation, setShowAnimation] = useState(false);

    // Where to redirect after login
    const from = location.state?.from?.pathname || "/home";

    React.useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 1. Simulate authentication check (1s)
        setTimeout(() => {
            // 2. Determine User Data
            const derivedName = email.split('@')[0]
                .replace(/[._]/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const derivedHandle = `@${email.split('@')[0]}`;

            const userData = {
                name: derivedName,
                email: email,
                handle: derivedHandle
            };

            // 3. Show Animation
            setIsLoading(false);
            setShowAnimation(true);

            // Redirect after animation and text read (Total ~4s)
            setTimeout(() => {
                login(userData);
                navigate(from, { replace: true });
            }, 4000);

        }, 1000);
    };

    // Advanced Smoke particle generator
    const SmokeParticles = () => (
        <div className="absolute bottom-6 left-2 z-0">
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-gray-300 rounded-full blur-md"
                    initial={{ scale: 0.2, x: 0, y: 0, opacity: 0 }}
                    animate={{
                        scale: [0.5, 3],
                        x: [-20, -200 - (Math.random() * 100)],
                        y: [0, -50 - (Math.random() * 50)],
                        opacity: [0.6, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1 + Math.random(),
                        delay: i * 0.1,
                        ease: "easeOut"
                    }}
                    style={{
                        width: 30,
                        height: 30,
                    }}
                />
            ))}
        </div>
    );

    // Speed Lines Effect
    const SpeedLines = () => (
        <div className="absolute inset-0 z-[15] pointer-events-none">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-[2px] bg-white/50 rounded-full"
                    initial={{ x: "100vw", opacity: 0 }}
                    animate={{ x: "-100vw", opacity: [0, 1, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.5 + Math.random() * 0.5,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    style={{
                        top: `${Math.random() * 100}%`,
                        width: `${100 + Math.random() * 300}px`
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center relative overflow-hidden p-4">

            {/* Animation Overlay */}
            <AnimatePresence>
                {showAnimation && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-[var(--color-bg)] flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <SpeedLines />

                        <div className="relative w-full h-full flex flex-col justify-center items-center">



                            {/* 2. MASSIVE POP-UP TEXT */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.5 }}
                                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                            >
                                <div className="text-center">
                                    <motion.h2
                                        className="text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary to-secondary mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        GET UP <br /> BUDDY
                                    </motion.h2>
                                    <motion.p
                                        className="text-2xl md:text-6xl font-bold text-white uppercase tracking-[0.2em]"
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.2, duration: 0.5 }}
                                    >
                                        See The World!
                                    </motion.p>
                                </div>
                            </motion.div>

                            {/* The Styled Road */}
                            <div className="absolute bottom-1/4 w-full">
                                <div className="h-2 bg-gradient-to-r from-transparent via-[var(--color-text)] to-transparent opacity-80 w-full rounded-full"></div>
                                {/* Moving road markers */}
                                <motion.div
                                    className="absolute top-0 h-2 w-40 bg-yellow-400/50"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                                {/* Fast moving blurred ground texture */}
                                <motion.div
                                    className="absolute top-4 inset-x-0 h-1 bg-white/10 blur-sm"
                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ repeat: Infinity, duration: 0.2 }}
                                />
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showAnimation ? 0 : 1, y: showAnimation ? -20 : 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 rounded-3xl border border-[var(--color-border)] shadow-2xl relative z-10">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary mb-4 shadow-lg shadow-primary/30">
                            <Compass className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-muted)]">
                            Welcome Back
                        </h2>
                        <p className="text-[var(--color-text-muted)] mt-2 text-sm">Sign in to continue your journey with Marg Yatri.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[var(--color-text-muted)] ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-[var(--color-text-muted)] group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-[var(--color-text)] focus:bg-[var(--color-input-bg)] focus:border-primary outline-none transition-all placeholder:text-[var(--color-text-light)]"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-[var(--color-text-muted)] ml-1 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-[var(--color-text-muted)] group-focus-within:text-primary transition-colors w-5 h-5" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl py-3 pl-12 pr-4 text-[var(--color-text)] focus:bg-[var(--color-input-bg)] focus:border-primary outline-none transition-all placeholder:text-[var(--color-text-light)]"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-2 cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                                <input type="checkbox" className="rounded bg-[var(--color-input-bg)] border-[var(--color-border)] text-primary focus:ring-primary" />
                                Remember me
                            </label>
                            <a href="#" className="text-primary hover:text-primary-hover font-semibold transition-colors">Forgot Password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--color-border)]"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[var(--color-card-bg)] text-[var(--color-text-muted)] rounded-lg">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="py-2.5 px-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--color-card-hover)] transition-colors group">
                            <Chrome className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
                            <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">Google</span>
                        </button>
                        <button className="py-2.5 px-4 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-xl flex items-center justify-center gap-2 hover:bg-[var(--color-card-hover)] transition-colors group">
                            <Github className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
                            <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]">GitHub</span>
                        </button>
                    </div>

                    <div className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
                        Don't have an account?{' '}
                        <a href="#" className="text-primary font-bold hover:underline">
                            Create Account
                        </a>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default Login;
