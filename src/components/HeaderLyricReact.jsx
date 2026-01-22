import React from 'react';
import { transposeChord } from "../utils/music";

export const HeaderLyricReact = ({ id, title, artist, tone, category, user }) => {
    return (
        <header className="mb-8">
            <h1
                className="text-4xl font-extrabold text-text-main mb-1"
                style={{ viewTransitionName: `song-title-${id}` }}
            >
                {title || "Título Desconocido"}
            </h1>
            <h2 className="text-xl text-accent-main font-medium">
                <span className="text-text-secondary">Autor:</span>{" "}
                <span style={{ viewTransitionName: `song-artist-${id}` }}>{artist || "Artista Desconocido"}</span>
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-start justify-between gap-4 mt-4 text-sm text-text-secondary">
                <div className="flex items-center justify-start gap-2">
                    <span
                        className="bg-bg-secondary px-3 py-1 rounded-full border border-white/10"
                        style={{ viewTransitionName: `song-tone-${id}` }}
                    >
                        Ton: <span className="text-accent-main font-bold">{tone}</span>
                    </span>
                    {category && (
                        <a href={`/search/all?categoryId=${category.id}`} target="_blank" rel="noreferrer">
                            <span
                                className="cursor-pointer hover:underline bg-bg-secondary px-3 py-1 rounded-full border border-white/10 text-accent-main/90 font-bold"
                                style={{ viewTransitionName: `song-category-${id}` }}
                            >
                                {category.name}
                            </span>
                        </a>
                    )}
                </div>
                {user && (
                    <span className="text-sm text-text-secondary/80 sm:ml-auto ml-0">
                        Creado por: {user.name}
                    </span>
                )}
            </div>
        </header>
    );
};
