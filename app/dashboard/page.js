'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Vote, 
    History, 
    ShieldCheck, 
    TrendingUp, 
    Clock, 
    ExternalLink, 
    LogOut,
    Bell,
    FileCheck,
    ChevronRight,
    MapPin,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

// --- MOCK DATA SOURCE ---
// In a real app, this data comes from your MongoDB (User Session) + Blockchain (History)
const USER_SESSION = {
    name: "Aarav Sharma",
    citizenId: "9876-5432-1012",
    constituency: "Mumbai South",
    ward: "Ward A - Colaba",
    verified: true,
    lastLogin: "Today, 10:42 AM"
};

const ACTIVE_ELECTION = {
    id: "e-2025-gen",
    title: "2025 National General Election",
    description: "Cast your digital ballot for the Member of Parliament representing Mumbai South. Your vote is encrypted and stored on the Ethereum ledger.",
    endsIn: "04h : 23m : 12s",
    status: "Live Now",
    eligible: true
};

const VOTING_HISTORY = [
    { id: 1, election: "2024 Municipal Council", date: "12 Feb 2024", txHash: "0x7f1...8a90", status: "Confirmed" },
    { id: 2, election: "2023 State Assembly", date: "05 Nov 2023", txHash: "0x3b2...c4d1", status: "Confirmed" },
    { id: 3, election: "2022 Ward By-Election", date: "18 Aug 2022", txHash: "0x9c4...e2f5", status: "Confirmed" }
];

const LIVE_UPDATES = [
    { time: "10:45 AM", msg: "Polling stations in Ward A reporting 15% higher turnout than 2024." },
    { time: "09:15 AM", msg: "Election Commission has verified all biometric nodes are online." },
    { time: "08:00 AM", msg: "Voting lines opened. Ethereum Gas fees stabilized." }
];

export default function VoteGuardDashboard() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0B1121] font-sans text-slate-200 selection:bg-blue-500 selection:text-white pb-12">
            
            {/* Ambient Background (Consistent with Login) */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            </div>

            {/* --- TOP NAVIGATION --- */}
            <nav className="sticky top-0 z-50 bg-[#0B1121]/80 backdrop-blur-xl border-b border-slate-800/60">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
                            <ShieldCheck size={24} className="text-white"/>
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight">VoteGuard</span>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-white">{USER_SESSION.name}</span>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs text-slate-400">Verified Citizen</span>
                            </div>
                        </div>

                        {/* Notification Bell */}
                        <button 
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="p-2.5 rounded-full hover:bg-slate-800 transition-colors relative text-slate-400 hover:text-white"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1121]"></span>
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-sm font-medium transition-all border border-slate-700 hover:border-slate-600 text-slate-200">
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- MAIN DASHBOARD CONTENT --- */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                
                {/* WELCOME HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                        <p className="text-slate-400 flex items-center gap-2">
                            <MapPin size={14} className="text-blue-500"/> 
                            {USER_SESSION.constituency} • {USER_SESSION.ward}
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-slate-500 font-mono">SESSION ID</p>
                        <p className="text-sm text-slate-300 font-mono">0x8a7...b29f</p>
                    </div>
                </motion.div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    
                    {/* 1. HERO WIDGET: ACTIVE ELECTION (Takes 2x2 space) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/30 group"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/15 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold mb-5 border border-white/10 shadow-inner">
                                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                                    {ACTIVE_ELECTION.status.toUpperCase()}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">{ACTIVE_ELECTION.title}</h2>
                                <p className="text-blue-100 opacity-80 mb-6 max-w-md leading-relaxed text-sm md:text-base">
                                    {ACTIVE_ELECTION.description}
                                </p>
                            </div>

                            {/* Action Area */}
                            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row gap-6 items-center justify-between group-hover:border-white/20 transition-all">
                                <div>
                                    <p className="text-xs text-blue-200 mb-1 uppercase tracking-wider font-semibold">Polls Close In</p>
                                    <div className="text-2xl font-mono font-bold tracking-widest flex items-center gap-2">
                                        <Clock size={20} className="text-blue-300"/>
                                        {ACTIVE_ELECTION.endsIn}
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                                    Cast Vote <Vote size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    