'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    ShieldCheck,
    Search,
    CheckCircle2,
    XCircle,
    FileCheck,
    Eye,
    Lock,
    Hash,
    Calendar,
    MapPin,
    User,
    AlertCircle,
    Loader2,
    ArrowLeft,
    ExternalLink,
    Info
} from 'lucide-react';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://voteguard-backend-2026.azurewebsites.net';

export default function PublicVerificationPortal() {
    const router = useRouter();
    const [receiptHash, setReceiptHash] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerifyReceipt = async (e) => {
        e.preventDefault();

        if (!receiptHash || receiptHash.trim().length < 10) {
            setError('Please enter a valid receipt hash');
            return;
        }

        setLoading(true);
        setError('');
        setVerificationResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/public/verify-receipt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ receiptHash: receiptHash.trim() })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setVerificationResult({
                    valid: true,
                    data: data.vote
                });
            } else {
                setVerificationResult({
                    valid: false,
                    message: data.message || 'Receipt not found or invalid'
                });
            }
        } catch (err) {
            console.error('Verification error:', err);
            setError('Failed to verify receipt. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B1121] font-sans text-slate-200">
            {/* Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Eye size={20} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">Public Verification Portal</h1>
                                <p className="text-xs text-slate-400">Independent Vote Receipt Verification</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <ArrowLeft size={16} />
                            Home
                        </button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                {/* Info Banner */}
                <div className="mb-8 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 flex gap-4">
                    <Info size={24} className="text-blue-400 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-semibold text-blue-300 mb-2">No Login Required</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            This is a public verification portal. Anyone can verify vote receipts without authentication.
                            Enter your vote receipt hash to verify that your vote was recorded on the blockchain.
                            <strong className="block mt-2 text-blue-400">
                                Your vote choice remains encrypted and private.
                            </strong>
                        </p>
                    </div>
                </div>

                {/* Verification Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 mb-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                            <FileCheck size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Verify Your Vote Receipt</h2>
                            <p className="text-sm text-slate-400">Enter the receipt hash you received after voting</p>
                        </div>
                    </div>

                    <form onSubmit={handleVerifyReceipt} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Receipt Hash
                            </label>
                            <div className="relative">
                                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={receiptHash}
                                    onChange={(e) => setReceiptHash(e.target.value)}
                                    placeholder="0x1a2b3c4d5e6f7g8h9i0j..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                                    disabled={loading}
                                />
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                Example: 0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="text-red-500" size={20} />
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Search size={20} />
                                    Verify Receipt
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Verification Result */}
                <AnimatePresence>
                    {verificationResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`rounded-3xl p-8 border-2 ${verificationResult.valid
                                    ? 'bg-emerald-500/10 border-emerald-500/50'
                                    : 'bg-red-500/10 border-red-500/50'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${verificationResult.valid
                                        ? 'bg-emerald-500/20'
                                        : 'bg-red-500/20'
                                    }`}>
                                    {verificationResult.valid ? (
                                        <CheckCircle2 size={32} className="text-emerald-400" />
                                    ) : (
                                        <XCircle size={32} className="text-red-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-2xl font-bold mb-2 ${verificationResult.valid ? 'text-emerald-300' : 'text-red-300'
                                        }`}>
                                        {verificationResult.valid ? 'Receipt Verified ✓' : 'Verification Failed'}
                                    </h3>

                                    {verificationResult.valid ? (
                                        <div className="space-y-4">
                                            <p className="text-slate-300">
                                                This vote receipt is valid and has been recorded on the blockchain.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <InfoCard
                                                    icon={Hash}
                                                    label="Vote ID"
                                                    value={verificationResult.data?.id || 'N/A'}
                                                />
                                                <InfoCard
                                                    icon={Calendar}
                                                    label="Timestamp"
                                                    value={verificationResult.data?.timestamp
                                                        ? new Date(verificationResult.data.timestamp).toLocaleString()
                                                        : 'N/A'
                                                    }
                                                />
                                                <InfoCard
                                                    icon={MapPin}
                                                    label="Election ID"
                                                    value={verificationResult.data?.electionId || 'N/A'}
                                                />
                                                <InfoCard
                                                    icon={ShieldCheck}
                                                    label="Blockchain Block"
                                                    value={`#${verificationResult.data?.blockIndex || 'N/A'}`}
                                                />
                                            </div>

                                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Lock size={16} className="text-blue-400" />
                                                    <span className="text-sm font-semibold text-blue-300">Privacy Protected</span>
                                                </div>
                                                <p className="text-xs text-slate-400 leading-relaxed">
                                                    Your vote choice is encrypted and cannot be viewed by anyone, including election officials.
                                                    Only the fact that you voted is publicly verifiable.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-slate-300">
                                            {verificationResult.message || 'The provided receipt hash was not found in the blockchain.'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* How It Works Section */}
                <div className="mt-12 bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">How Public Verification Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StepCard
                            number={1}
                            icon={FileCheck}
                            title="Receive Receipt"
                            description="After voting, you receive a unique receipt hash"
                        />
                        <StepCard
                            number={2}
                            icon={Search}
                            title="Verify Anytime"
                            description="Enter your receipt hash here without logging in"
                        />
                        <StepCard
                            number={3}
                            icon={ShieldCheck}
                            title="Blockchain Proof"
                            description="Verify your vote was recorded on immutable blockchain"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

// Info Card Component
const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-slate-900/50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon size={16} className="text-emerald-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-sm font-mono text-white break-all">{value}</p>
    </div>
);

// Step Card Component
const StepCard = ({ number, icon: Icon, title, description }) => (
    <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center relative">
            <Icon size={24} className="text-white" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                {number}
            </div>
        </div>
        <h4 className="font-semibold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);
