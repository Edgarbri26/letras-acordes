import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/songs';

export default function CategoryFilter({ isAdmin }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_URL}/categories`);
                if (res.ok) {
                    const data = await res.json();
                    if (isAdmin) {
                        data.push({ id: -1, name: "Inactivas" });
                    }
                    setCategories(data);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [isAdmin]);

    const SkeletonPill = () => (
        <div className="h-9 w-24 bg-white/5 rounded-full animate-pulse shrink-0"></div>
    );

    return (
        <div className="flex overflow-x-auto pb-4 gap-2 mb-4 scrollbar-hide mask-fade-right">
            <a
                href="/search/all"
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10 whitespace-nowrap shrink-0"
            >
                Explorar Todas
            </a>

            {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonPill key={i} />)
            ) : (
                categories.map((cat) => (
                    <a
                        key={cat.id}
                        href={
                            cat.id === -1
                                ? `/search/all?active=false`
                                : `/search/all?categoryId=${cat.id}`
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${cat.id === -1
                            ? "bg-red-900/30 text-red-200 border border-red-500/30 hover:bg-red-900/50"
                            : "bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {cat.name}
                    </a>
                ))
            )}
        </div>
    );
}
