'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ShieldCheck,
    Vote,
    Eye,
    Lock,
    TrendingUp,
    Users,
    FileCheck,
    Zap,
    Globe,
    ArrowRight,
    CheckCircle2,
    Fingerprint,
    Activity,
    BarChart3,
    Server,
    ChevronRight,
    Blocks
} from 'lucide-react';

export default function LandingPage() {
    const router = useRouter();
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: ShieldCheck,
            title: "Blockchain-Powered Security",
            description: "All votes recorded on Ethereum Sepolia with immutable proof",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "AES-256-CBC encryption ensures your vote remains private",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Fingerprint,
            title: "Biometric Verification",
            description: "Face recognition and fingerprint authentication",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: Eye,
            title: "Real-Time Monitoring",
            description: "Observer dashboard with live election statistics",
            color: "from-orange-500 to-red-500"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-[#0B1121] font-sans text-slate-200 overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <ShieldCheck size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">VoteGuard</h1>
                                <p className="text-xs text-slate-400">Secure Blockchain Voting</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.push('/public/verify')}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-all border border-emerald-500/20"
                            >
                                <FileCheck size={16} />
                                Verify Receipt
                            </button>
                            <button
                                onClick={() => router.push('/login')}
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
                            >
                                Login / Register
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                            <span className="text-blue-400 text-sm font-medium">🔒 Powered by Ethereum Blockchain</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Secure, Transparent,
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent"> Verifiable</span>
                            <br />Electronic Voting
                        </h1>

                        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                            VoteGuard combines blockchain technology, biometric authentication, and end-to-end encryption
                            to deliver the most secure electronic voting system.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push('/login')}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                            >
                                Get Started
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => router.push('/public/verify')}
                                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2"
                            >
                                <FileCheck size={20} />
                                Verify Your Vote
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12">
                            <div>
                                <p className="text-3xl font-bold text-white">99.9%</p>
                                <p className="text-sm text-slate-400">Uptime</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">256-bit</p>
                                <p className="text-sm text-slate-400">Encryption</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">Blockchain</p>
                                <p className="text-sm text-slate-400">Verified</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Animated Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="space-y-4">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${activeFeature === idx
                                                ? 'bg-slate-800/60 border-blue-500/50 shadow-xl shadow-blue-500/20'
                                                : 'bg-slate-800/20 border-slate-700/50 hover:bg-slate-800/40'
                                            }`}
                                        onClick={() => setActiveFeature(idx)}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shrink-0`}>
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                                                <p className="text-sm text-slate-400">{feature.description}</p>
                                            </div>
                                            <CheckCircle2
                                                size={20}
                                                className={`transition-all ${activeFeature === idx ? 'text-blue-400' : 'text-slate-600'
                                                    }`}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Access Cards */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Access</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Voter Portal */}
                    <QuickAccessCard
                        icon={Vote}
                        title="Voter Portal"
                        description="Cast your vote securely with biometric verification"
                        color="from-blue-500 to-blue-600"
                        onClick={() => router.push('/login')}
                        badge="Login Required"
                    />

                    {/* Observer Dashboard */}
                    <QuickAccessCard
                        icon={Eye}
                        title="Observer Dashboard"
                        description="Real-time election monitoring and audit logs"
                        color="from-purple-500 to-purple-600"
                        onClick={() => router.push('/observer/dashboard')}
                        badge="Monitor Elections"
                        isNew
                    />

                    {/* Public Verification */}
                    <QuickAccessCard
                        icon={FileCheck}
                        title="Public Verification"
                        description="Verify vote receipts without logging in"
                        color="from-emerald-500 to-emerald-600"
                        onClick={() => router.push('/public/verify')}
                        badge="No Login Needed"
                        isPublic
                    />
                </div>
            </section>

            {/* Key Features Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Why VoteGuard?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={Blocks}
                        title="Blockchain Storage"
                        description="Every vote recorded on Ethereum Sepolia testnet"
                    />
                    <FeatureCard
                        icon={Lock}
                        title="AES-256 Encryption"
                        description="Military-grade encryption for ballot privacy"
                    />
                    <FeatureCard
                        icon={Activity}
                        title="Real-Time Updates"
                        description="Live election statistics and turnout tracking"
                    />
                    <FeatureCard
                        icon={Users}
                        title="Multi-Stakeholder"
                        description="Voters, observers, admins, and auditors"
                    />
                    <FeatureCard
                        icon={Fingerprint}
                        title="Biometric Auth"
                        description="Face recognition and fingerprint verification"
                    />
                    <FeatureCard
                        icon={Globe}
                        title="Public Verification"
                        description="Anyone can verify votes independently"
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="Transparent Results"
                        description="Blockchain-backed result tallying"
                    />
                    <FeatureCard
                        icon={Server}
                        title="DDoS Protected"
                        description="Rate limiting and attack resilience"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 border border-blue-500/30 rounded-3xl p-12 text-center">
                    <Zap size={48} className="mx-auto mb-6 text-yellow-400" />
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Experience Secure Voting?
                    </h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Join thousands of verified voters using blockchain-powered elections
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/login')}
                            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-bold text-lg transition-all shadow-xl shadow-blue-500/30"
                        >
                            Register Now
                        </button>
                        <button
                            onClick={() => router.push('/public/verify')}
                            className="px-10 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold text-lg transition-all"
                        >
                            Verify a Vote
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800 mt-20">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={20} className="text-blue-400" />
                            <span className="text-slate-400">© 2026 VoteGuard. Secured by Blockchain.</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-slate-400">
                            <span>Ethereum Sepolia Testnet</span>
                            <span>•</span>
                            <span>AES-256 Encrypted</span>
                            <span>•</span>
                            <span>Biometric Verified</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Quick Access Card Component
const QuickAccessCard = ({ icon: Icon, title, description, color, onClick, badge, isNew, isPublic }) => (
    <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        onClick={onClick}
        className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8 cursor-pointer transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20"
    >
        {isNew && (
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white shadow-lg">
                NEW
            </div>
        )}
        {isPublic && (
            <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-xs font-bold text-white shadow-lg">
                PUBLIC
            </div>
        )}
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 mb-4">{description}</p>
        <div className="flex items-center justify-between">
            <span className="text-sm text-blue-400 font-medium">{badge}</span>
            <ChevronRight size={20} className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
        </div>
    </motion.div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-xl p-6 hover:border-slate-600 transition-all"
    >
        <Icon size={32} className="text-blue-400 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
    </motion.div>
);

