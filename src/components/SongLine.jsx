import React from 'react';

const SongLine = ({ line, showChords = true }) => {
    if (!line) return <div className="h-8"></div>;

    const commentMatch = line.match(/^\s*\{(?:c|comment|oc|soc|eoc):\s*(.*?)\}\s*$/i);

    if (commentMatch) {
        const label = commentMatch[1];
        if (!label) return null;

        return (
            <div className="font-bold italic text-accent-main/80 my-4 bg-accent-main/10 border-l-4 border-accent-main px-3 py-1 rounded-r w-fit">
                {label}
            </div>
        );
    }

    const segments = line.split(/(\[.*?\])/);

    return (
        <div className={`relative text-lg whitespace-pre-wrap ${showChords ? 'leading-[3.5rem]' : 'leading-relaxed'}`}>
            {segments.map((seg, i) => {
                const match = seg.match(/^\[(.*?)\]$/);
                if (match) {
                    if (!showChords) return null; // No renderizar acorde si showChords es false

                    return (
                        <span key={i} className="inline-block relative w-0 overflow-visible align-baseline">
                            <span className="absolute bottom-[1.2em] left-0 text-accent-main font-mono font-bold text-sm select-none whitespace-nowrap">
                                {match[1]}
                            </span>
                        </span>
                    );
                }
                // Quitamos text-text-main para que herede el color del contenedor padre
                return <span key={i}>{seg}</span>;
            })}
        </div>
    );
};

export default SongLine;
