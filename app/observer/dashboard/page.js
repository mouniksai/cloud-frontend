'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    Activity,
    BarChart3,
    Users,
    Vote,
    TrendingUp,
    Shield,
    Clock,
    AlertCircle,
    CheckCircle2,
    Eye,
    FileText,
    Download,
    RefreshCw,
    Loader2,
    MapPin,
    Calendar,
    ArrowLeft
} from 'lucide-react';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://voteguard-backend-2026.azurewebsites.net';

// Cookie utilities
const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export default function ObserverDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [liveStats, setLiveStats] = useState(null);
    const [auditLogs, setAuditLogs] = useState([]);
    const [error, setError] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(true);

    useEffect(() => {
        // Check authentication
        const token = getCookie('voteGuardToken') || localStorage.getItem('voteGuardToken');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchObserverData();
    }, [router]);

    // Auto-refresh every 10 seconds
    useEffect(() => {
        if (!autoRefresh) return;
        const interval = setInterval(() => {
            fetchObserverData();
        }, 10000);
        return () => clearInterval(interval);
    }, [autoRefresh]);

    const fetchObserverData = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getCookie('voteGuardToken') || localStorage.getItem('voteGuardToken');

            // Fetch live statistics
            const statsResponse = await fetch(`${API_BASE_URL}/api/observer/live-stats`, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                setLiveStats(statsData);
            }

            // Fetch audit logs
            const logsResponse = await fetch(`${API_BASE_URL}/api/observer/audit-logs?limit=20`, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (logsResponse.ok) {
                const logsData = await logsResponse.json();
                setAuditLogs(logsData.logs || []);
            }

        } catch (err) {
            console.error('Observer data fetch error:', err);
            setError('Failed to load observer data');
        } finally {
            setLoading(false);
        }
    };

    const handleExportReport = () => {
        // Generate CSV report
        const csvContent = generateCSVReport();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `observer-report-${new Date().toISOString()}.csv`;
        a.click();
    };

    const generateCSVReport = () => {
        let csv = 'Timestamp,Action,User,Details,IP Address\n';
        auditLogs.forEach(log => {
            csv += `${log.timestamp},${log.action},${log.userId},${log.details},${log.ipAddress}\n`;
        });
        return csv;
    };

    if (loading && !liveStats) {
        return (
            <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1121] font-sans text-slate-200">
            {/* Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <nav className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Eye size={20} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">Observer Dashboard</h1>
                                    <p className="text-xs text-slate-400">Real-time Election Monitoring</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${autoRefresh
                                        ? 'bg-green-600/20 text-green-400 border border-green-500/30'
                                        : 'bg-slate-700 text-slate-400 border border-slate-600'
                                    }`}
                            >
                                <Activity size={16} className={autoRefresh ? 'animate-pulse' : ''} />
                                {autoRefresh ? 'Live' : 'Paused'}
                            </button>
                            <button
                                onClick={fetchObserverData}
                                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                            >
                                <RefreshCw size={18} />
                            </button>
                            <button
                                onClick={handleExportReport}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Download size={16} />
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {/* Live Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        icon={Users}
                        label="Total Registered Voters"
                        value={liveStats?.totalVoters || 0}
                        color="blue"
                    />
                    <StatCard
                        icon={Vote}
                        label="Votes Cast"
                        value={liveStats?.votesCast || 0}
                        color="green"
                    />
                    <StatCard
                        icon={TrendingUp}
                        label="Turnout Percentage"
                        value={`${liveStats?.turnoutPercentage || 0}%`}
                        color="purple"
                    />
                    <StatCard
                        icon={Activity}
                        label="Active Elections"
                        value={liveStats?.activeElections || 0}
                        color="orange"
                    />
                </div>

                {/* Constituency Breakdown */}
                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <MapPin size={20} className="text-blue-400" />
                        Constituency Breakdown
                    </h2>
                    <div className="space-y-4">
                        {liveStats?.constituencies?.map((constituency, idx) => (
                            <ConstituencyRow key={idx} data={constituency} />
                        )) || (
                                <p className="text-slate-400 text-center py-4">No constituency data available</p>
                            )}
                    </div>
                </div>

                {/* Audit Log */}
                <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-purple-400" />
                        Recent Audit Logs (Read-Only)
                    </h2>
                    <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                        {auditLogs.length > 0 ? (
                            auditLogs.map((log, idx) => (
                                <AuditLogRow key={idx} log={log} />
                            ))
                        ) : (
                            <p className="text-slate-400 text-center py-4">No audit logs available</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, color }) => {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600',
        orange: 'from-orange-500 to-orange-600'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6"
        >
            <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </motion.div>
    );
};

// Constituency Row Component
const ConstituencyRow = ({ data }) => {
    const turnoutPercentage = data.totalVoters > 0
        ? ((data.votesCast / data.totalVoters) * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-slate-900/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-white">{data.name}</h3>
                    <p className="text-xs text-slate-400">Ward: {data.ward || 'N/A'}</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-400">{turnoutPercentage}%</p>
                    <p className="text-xs text-slate-500">Turnout</p>
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <div>
                    <span className="text-slate-400">Voters:</span>
                    <span className="ml-2 font-mono text-white">{data.totalVoters}</span>
                </div>
                <div>
                    <span className="text-slate-400">Cast:</span>
                    <span className="ml-2 font-mono text-green-400">{data.votesCast}</span>
                </div>
            </div>
            <div className="mt-3 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all"
                    style={{ width: `${turnoutPercentage}%` }}
                />
            </div>
        </div>
    );
};

// Audit Log Row Component
const AuditLogRow = ({ log }) => {
    const getActionColor = (action) => {
        if (action.includes('VOTE')) return 'text-green-400';
        if (action.includes('LOGIN')) return 'text-blue-400';
        if (action.includes('ELECTION')) return 'text-purple-400';
        return 'text-slate-400';
    };

    return (
        <div className="bg-slate-900/30 rounded-lg p-3 hover:bg-slate-900/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className={`text-sm font-medium ${getActionColor(log.action)}`}>
                            {log.action}
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">{log.details}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>User: {log.userId}</span>
                        <span>IP: {log.ipAddress}</span>
                    </div>
                </div>
                <div className="text-xs text-slate-500 text-right">
                    <Clock size={12} className="inline mr-1" />
                    {new Date(log.timestamp).toLocaleString()}
                </div>
            </div>
        </div>
    );
};
