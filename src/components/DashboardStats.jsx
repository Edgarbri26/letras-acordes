import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/songs';

export default function DashboardStats({ isAdmin }) {
    const [stats, setStats] = useState({ totalSongs: 0, totalCategories: 0, activeSongs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const SkeletonCard = ({ label }) => (
        <div className="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 h-[140px] animate-pulse">
            <div className="h-5 w-32 bg-white/10 rounded mb-4"></div>
            <div className="h-10 w-16 bg-white/10 rounded"></div>
        </div>
    );

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonCard label="Songs" />
                <SkeletonCard label="Categories" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors">
                <h2 className="text-lg font-medium text-text-secondary mb-2">
                    {isAdmin ? "Total de Canciones" : "Canciones Disponibles"}
                </h2>
                <p className="text-4xl font-bold text-accent-main">
                    {isAdmin ? stats.totalSongs : (stats.activeSongs ?? stats.totalSongs)}
                </p>
            </div>

            <div className="bg-bg-secondary p-6 rounded-xl flex flex-col items-center justify-center shadow-lg border border-white/5 hover:border-accent-main/30 transition-colors">
                <h2 className="text-lg font-medium text-text-secondary mb-2">
                    Categorías
                </h2>
                <p className="text-4xl font-bold text-accent-main">
                    {stats.totalCategories}
                </p>
            </div>
        </div>
    );
}
