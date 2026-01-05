'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShieldCheck, 
    CheckCircle2, 
    AlertCircle,
    ArrowRight,
    X,
    Vote,
    Info,
    Lock,
    FileCheck,
    ExternalLink,
    Download,
    Clock,
    User,
    MapPin,
    Calendar,
    Hash,
    Zap,
    Shield,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

// Mock data
const USER_SESSION = {
    name: "Aarav Sharma",
    citizenId: "9876-5432-1012",
    constituency: "Mumbai South",
    ward: "Ward A - Colaba"
};

const ACTIVE_ELECTION = {
    id: "e-2025-gen",
    title: "2025 National General Election",
    description: "Member of Parliament Election",
    constituency: "Mumbai South",
    startDate: "January 5, 2025",
    endDate: "January 5, 2025, 6:00 PM IST",
    totalVoters: "1.2M",
    votedCount: "847K"
};

const CANDIDATES = [
    {
        id: 1,
        name: "Dr. Rajesh Kumar",
        party: "Progressive Alliance Party",
        symbol: "🌳",
        age: 52,
        education: "PhD in Economics, IIT Delhi",
        experience: "15 years in public service",
        keyPoints: [
            "Infrastructure & Urban Development",
            "Education Reform & Skill Training",
            "Healthcare Accessibility",
            "Digital Economy Growth"
        ]
    },
    {
        id: 2,
        name: "Anita Deshmukh",
        party: "Unity Front Coalition",
        symbol: "🌅",
        age: 48,
        education: "MBA, Harvard Business School",
        experience: "Former State Minister, 10 years",
        keyPoints: [
            "Job Creation & MSME Support",
            "Women's Safety & Empowerment",
            "Environmental Sustainability",
            "Affordable Housing Schemes"
        ]
    },
    {
        id: 3,
        name: "Mohammed Akhtar",
        party: "People's Democratic Coalition",
        symbol: "⭐",
        age: 45,
        education: "LLB, National Law School",
        experience: "Civil Rights Lawyer, 20 years",
        keyPoints: [
            "Agricultural Support & Fair Pricing",
            "Social Justice & Equality",
            "Public Transport Infrastructure",
            "Anti-Corruption Measures"
        ]
    },
    {
        id: 4,
        name: "Priya Menon",
        party: "Progressive Democratic Movement",
        symbol: "🦅",
        age: 41,
        education: "B.Tech IIT Bombay, MS Stanford",
        experience: "Tech Entrepreneur, 12 years",
        keyPoints: [
            "Youth Employment & Startups",
            "Technology & Innovation Hubs",
            "Quality Education for All",
            "Climate Action & Renewable Energy"
        ]
    }
];

export default function VoteGuardBallot() {
    const [currentStep, setCurrentStep] = useState('ballot');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [expandedCandidate, setExpandedCandidate] = useState(null);
    const [transactionHash, setTransactionHash] = useState('');
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCastVote = () => {
        setCurrentStep('casting');
        
        setTimeout(() => {
            setTransactionHash(`0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`);
            setCurrentStep('confirmed');
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-[#0B1121] font-sans text-slate-200">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            </div>

            {/* Top Bar */}
            <nav className="sticky top-0 z-50 bg-[#0B1121]/95 backdrop-blur-xl border-b border-slate-800/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <ShieldCheck size={20} className="text-white"/>
                        </div>
                        <div>
                            <span className="font-bold text-lg text-white">VoteGuard</span>
                            <span className="hidden sm:inline text-xs text-slate-400 ml-2">Secure Voting Portal</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Timer */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                            timeLeft < 60 
                                ? 'bg-red-900/20 border-red-700/40 text-red-400' 
                                : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                        }`}>
                            <Clock size={14} />
                            <span className="text-sm font-mono font-bold">{formatTime(timeLeft)}</span>
                        </div>
                        {/* Auth Badge */}
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                            <CheckCircle2 size={14} className="text-green-400" />
                            <span className="text-xs text-green-400 font-medium">Authenticated</span>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence mode="wait">
                {currentStep === 'ballot' && (
                    <BallotPage 
                        selectedCandidate={selectedCandidate}
                        setSelectedCandidate={setSelectedCandidate}
                        expandedCandidate={expandedCandidate}
                        setExpandedCandidate={setExpandedCandidate}
                        onProceed={() => setCurrentStep('review')}
                        timeLeft={timeLeft}
                    />
                )}

                {currentStep === 'review' && (
                    <ReviewPage 
                        candidate={CANDIDATES.find(c => c.id === selectedCandidate)}
                        onBack={() => setCurrentStep('ballot')}
                        onConfirm={handleCastVote}
                    />
                )}

                {currentStep === 'casting' && (
                    <CastingPage />
                )}

                {currentStep === 'confirmed' && (
                    <ConfirmationPage transactionHash={transactionHash} />
                )}
            </AnimatePresence>
        </div>
    );
}

// Ballot Page
const BallotPage = ({ selectedCandidate, setSelectedCandidate, expandedCandidate, setExpandedCandidate, onProceed, timeLeft }) => (
    <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6"
    >
        {/* Compact Header */}
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{ACTIVE_ELECTION.title}</h1>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5">
                        <MapPin size={14} className="text-blue-400"/>
                        {ACTIVE_ELECTION.constituency}
                    </p>
                </div>
                {/* Stats */}
                <div className="hidden md:flex gap-3">
                    <StatBadge label="Total" value={ACTIVE_ELECTION.totalVoters} />
                    <StatBadge label="Voted" value={ACTIVE_ELECTION.votedCount} />
                </div>
            </div>

            {/* Security Notice - Compact */}
            <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl p-4 flex items-start gap-3">
                <Shield size={18} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300">
                    <p className="font-semibold text-white mb-1">Blockchain-Secured Voting</p>
                    <p className="text-xs text-slate-400">Your vote is encrypted and permanently recorded. You'll receive a verification receipt.</p>
                </div>
            </div>
        </div>

        {/* Compact Candidates Grid */}
        <div className="space-y-3 mb-20">
            {CANDIDATES.map((candidate) => (
                <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    isExpanded={expandedCandidate === candidate.id}
                    onSelect={() => setSelectedCandidate(candidate.id)}
                    onToggleExpand={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                />
            ))}
        </div>

        {/* Sticky Bottom Bar - Compact */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {selectedCandidate ? (
                            <>
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 shrink-0">
                                    <CheckCircle2 size={18} className="text-green-400" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-slate-500">Selected</p>
                                    <p className="font-bold text-white text-sm truncate">
                                        {CANDIDATES.find(c => c.id === selectedCandidate)?.name}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                                    <Vote size={18} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">No selection</p>
                                    <p className="text-sm text-slate-400">Choose a candidate</p>
                                </div>
                            </>
                        )}
                    </div>
                    <button
                        disabled={!selectedCandidate}
                        onClick={onProceed}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2 text-sm whitespace-nowrap"
                    >
                        Review & Cast
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    </motion.main>
);

// Compact Candidate Card
const CandidateCard = ({ candidate, isSelected, isExpanded, onSelect, onToggleExpand }) => (
    <motion.div
        layout
        className={`bg-slate-800/40 backdrop-blur-md border rounded-xl overflow-hidden transition-all ${
            isSelected 
                ? 'border-blue-500 shadow-lg shadow-blue-900/20' 
                : 'border-slate-700/60 hover:border-slate-600'
        }`}
    >
        <div 
            className="p-4 cursor-pointer"
            onClick={onSelect}
        >
            <div className="flex items-start gap-4">
                {/* Compact Symbol */}
                <div className="w-16 h-16 bg-slate-900/60 rounded-xl flex items-center justify-center text-3xl border border-slate-700/50 shrink-0">
                    {candidate.symbol}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                            <h3 className="text-lg font-bold text-white truncate">{candidate.name}</h3>
                            <p className="text-sm text-slate-400 truncate">{candidate.party}</p>
                        </div>
                        {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                <CheckCircle2 size={14} className="text-white" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-slate-900/60 rounded border border-slate-700/50 text-slate-300">
                            {candidate.age} years
                        </span>
                        <span className="text-xs px-2 py-1 bg-slate-900/60 rounded border border-slate-700/50 text-slate-300 truncate">
                            {candidate.experience}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleExpand();
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? 'Hide' : 'View'} Manifesto
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                </div>
            </div>
        </div>

        {/* Compact Manifesto */}
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-3"
                >
                    <div className="grid sm:grid-cols-2 gap-2">
                        {candidate.keyPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <CheckCircle2 size={12} className="text-blue-400 shrink-0 mt-0.5" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
);

// Review Page - Compact
const ReviewPage = ({ candidate, onBack, onConfirm }) => (
    <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8"
    >
        <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-600/10 rounded-full flex items-center justify-center border border-orange-500/20">
                <AlertCircle size={32} className="text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Confirm Your Vote</h1>
            <p className="text-sm text-slate-400">
                Your vote will be permanently recorded on the blockchain
            </p>
        </div>

        {/* Review Card - Compact */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700/50">
                <div className="w-20 h-20 bg-slate-900/60 rounded-xl flex items-center justify-center text-5xl border border-slate-700/50">
                    {candidate.symbol}
                </div>
                <div>
                    <p className="text-xs text-slate-500 mb-1">VOTING FOR</p>
                    <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                    <p className="text-sm text-slate-400">{candidate.party}</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-xs text-slate-500 mb-1">Election</p>
                    <p className="text-white font-medium">{ACTIVE_ELECTION.title}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-500 mb-1">Constituency</p>
                    <p className="text-white font-medium">{ACTIVE_ELECTION.constituency}</p>
                </div>
            </div>
        </div>

        {/* Security Notice - Compact */}
        <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2 text-xs text-slate-300">
                <Lock size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold text-white mb-1">Blockchain Security</p>
                    <p className="text-slate-400">Encrypted with Paillier cryptography • Signed with your wallet • Immutable record</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
            <button
                onClick={onBack}
                className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700"
            >
                Back
            </button>
            <button
                onClick={onConfirm}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
                Cast Vote
                <Vote size={20} />
            </button>
        </div>
    </motion.main>
);

// Casting Page - Compact
const CastingPage = () => (
    <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 max-w-2xl mx-auto px-4 py-12 text-center min-h-[70vh] flex items-center justify-center"
    >
        <div>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-6 bg-blue-600/20 rounded-full flex items-center justify-center border-4 border-blue-500"
            >
                <Zap size={36} className="text-blue-400" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-3">Casting Your Vote...</h1>
            <p className="text-sm text-slate-400 mb-8">Recording on blockchain</p>

            <div className="space-y-3 max-w-sm mx-auto text-left">
                <ProcessStep status="complete" text="Encrypting vote" />
                <ProcessStep status="active" text="Signing transaction" />
                <ProcessStep status="pending" text="Broadcasting to network" />
                <ProcessStep status="pending" text="Confirming block" />
            </div>
        </div>
    </motion.main>
);

// Confirmation Page - Compact
const ConfirmationPage = ({ transactionHash }) => (
    <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-3xl mx-auto px-4 py-8 text-center"
    >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500"
        >
            <CheckCircle2 size={48} className="text-green-400" />
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-3">Vote Cast Successfully!</h1>
        <p className="text-slate-400 mb-8">Your vote has been recorded on the blockchain</p>

        {/* Transaction Receipt - Compact */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Blockchain Receipt</h3>
                <span className="text-xs px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20 text-green-400 font-bold">CONFIRMED</span>
            </div>
            
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-400">Transaction Hash</span>
                    <span className="font-mono text-white">{transactionHash}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Block Number</span>
                    <span className="font-mono text-white">#8,234,891</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-400">Network</span>
                    <span className="text-white">Ethereum Mainnet</span>
                </div>
            </div>
        </div>

        {/* Action Buttons - Compact */}
        <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                View on Explorer
            </button>
            <button className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700">
                <Download size={18} />
                Download Receipt
            </button>
        </div>
    </motion.main>
);

// Helper Components
const StatBadge = ({ label, value }) => (
    <div className="px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/60">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
    </div>
);

const ProcessStep = ({ status, text }) => (
    <div className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            status === 'complete' ? 'bg-green-500' :
            status === 'active' ? 'bg-blue-500 animate-pulse' :
            'bg-slate-700'
        }`}>
            {status === 'complete' && <CheckCircle2 size={12} className="text-white" />}
        </div>
        <span className={`text-sm ${status === 'pending' ? 'text-slate-500' : 'text-slate-300'}`}>{text}</span>
    </div>
);