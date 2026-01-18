import React from 'react';
import SongLine from './SongLine';

export const SongRenderer = ({ content, showChords }) => {
    return (
        <div className="pb-20">
            {content.split('\n').map((line, i) => (
                <SongLine key={i} line={line} showChords={showChords} />
            ))}
        </div>
    );
};
