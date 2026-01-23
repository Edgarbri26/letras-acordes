import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/songs';
import SongCardReact from './SongCardReact';

export default function GridSongs({ endpoint, initialSongs = [] }) {
    const [songs, setSongs] = useState(initialSongs);
    const [loading, setLoading] = useState(!initialSongs || initialSongs.length === 0);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If we have initial songs and no specific endpoint change context, we might skip? 
        // But usually if endpoint is passed we want to ensure we are in sync or if it changes.
        // For simplicity: if initialSongs is populate and endpoint matches what produced it, we skip. 
        // But here we rely on endpoint prop.

        const fetchSongs = async () => {
            setLoading(true);
            try {
                const url = endpoint || `${API_URL}/songs?limit=12`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Failed to fetch songs");
                }
                const data = await res.json();
                setSongs(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching songs:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // If initialSongs provided, we assume it matches the FIRST render intent.
        // But if endpoint changes (dynamic filter), we MUST fetch.
        // If it's the very first mount and we have initialSongs, we can skip fetch IF we assume endpoint corresponds to it.
        // To be safe and simple: If initialSongs has data, we don't auto-fetch on mount unless endpoint updates?
        // Let's just fetch if endpoint is defined or if we have no songs.

        if (endpoint || songs.length === 0) {
            fetchSongs();
        } else if (initialSongs.length > 0) {
            setLoading(false);
        }
    }, [endpoint]);

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
            {songs.length === 0 && !loading && (
                <div className="text-center w-100 py-10 col-span-1 md:col-span-2 lg:col-span-3">
                    <p className="text-gray-500 text-xl">No se encontraron canciones.</p>
                </div>
            )}

        </div>

    );
}
