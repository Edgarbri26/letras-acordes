import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/songs';
import SongCardReact from './SongCardReact';

export default function GridSongs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const res = await fetch(`${API_URL}/songs?limit=10`);
                if (!res.ok) {
                    throw new Error("Failed to fetch songs");
                }
                const data = await res.json();
                setSongs(data);
            } catch (err) {
                console.error("Error fetching songs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    // Skeleton Component
    const SkeletonCard = () => (
        <div className="bg-bg-secondary border border-white/5 rounded-xl p-5 h-[130px] animate-pulse">
            <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/5 rounded w-1/2 mb-4"></div>
            <div className="flex gap-2">
                <div className="h-6 w-16 bg-white/5 rounded"></div>
                <div className="h-6 w-24 bg-white/5 rounded"></div>
            </div>
        </div>
    );

    if (error) {
        return <div className="text-red-500 py-10 text-center">Error al cargar canciones: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
                // Show 6 skeletons while loading
                Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : (
                songs.map(song => (
                    <SongCardReact key={song.id} song={song} />
                ))
            )}
        </div>
    );
}
