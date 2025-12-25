import React from 'react';

const SongLine = ({ line }) => {
    if (!line) return <div className="h-8"></div>;

    const segments = line.split(/(\[.*?\])/);

    return (
        <div className="relative font-mono text-lg whitespace-pre-wrap leading-10">
            {segments.map((seg, i) => {
                const match = seg.match(/^\[(.*?)\]$/);
                if (match) {
                    return (
                        <span key={i} className="inline-block relative w-0 overflow-visible align-baseline">
                            <span className="absolute bottom-[1.2em] left-0 -translate-x-1/2 text-accent-main font-bold text-sm select-none whitespace-nowrap">
                                {match[1]}
                            </span>
                        </span>
                    );
                }
                return <span key={i} className="text-text-main">{seg}</span>;
            })}
        </div>
    );
};

export default SongLine;
