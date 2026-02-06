import { jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const SongLine = ({ line, showChords = true }) => {
  if (!line) return /* @__PURE__ */ jsx("div", { className: "h-8" });
  const commentMatch = line.match(/^\s*\{(?:c|comment|oc|soc|eoc):\s*(.*?)\}\s*$/i);
  if (commentMatch) {
    const label = commentMatch[1];
    if (!label) return null;
    return /* @__PURE__ */ jsx("div", { className: "font-bold italic text-accent-main/80 my-4 bg-accent-main/10 border-l-4 border-accent-main px-3 py-1 rounded-r w-fit", children: label });
  }
  const segments = line.split(/(\[.*?\])/);
  return /* @__PURE__ */ jsx("div", { className: `relative text-lg whitespace-pre-wrap ${showChords ? "leading-[3.5rem]" : "leading-relaxed"}`, children: segments.map((seg, i) => {
    const match = seg.match(/^\[(.*?)\]$/);
    if (match) {
      if (!showChords) return null;
      return /* @__PURE__ */ jsx("span", { className: "inline-block relative w-0 overflow-visible align-baseline", children: /* @__PURE__ */ jsx("span", { className: "absolute bottom-[1.2em] left-0 text-accent-main font-mono font-bold text-sm select-none whitespace-nowrap", children: match[1] }) }, i);
    }
    return /* @__PURE__ */ jsx("span", { children: seg }, i);
  }) });
};

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const normalizeNote = (note) => {
    const map = {
        'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
        'Cb': 'B', 'Fb': 'E', 'E#': 'F', 'B#': 'C'
    };
    return map[note] || note;
};

const getSemidistance = (note1, note2) => {
    const n1 = normalizeNote(note1);
    const n2 = normalizeNote(note2);
    const i1 = NOTES.indexOf(n1);
    const i2 = NOTES.indexOf(n2);
    if (i1 === -1 || i2 === -1) return 0;
    return i2 - i1;
};

const transposeChord = (chord, semitones) => {
    if (!chord) return chord;

    // Regex para separar la nota base del resto (m, 7, sus4, /G, etc)
    // Ejemplo: C#m7/G# -> C#, m7/G#
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;

    let [_, root, suffix] = match;
    root = normalizeNote(root);

    const rootIndex = NOTES.indexOf(root);
    if (rootIndex === -1) return chord;

    let newIndex = (rootIndex + semitones) % 12;
    if (newIndex < 0) newIndex += 12;

    let newRoot = NOTES[newIndex];

    // Manejo de bajos (bass notes) ej: /G -> /A
    if (suffix.includes('/')) {
        const parts = suffix.split('/');
        // El primer elemento es el sufijo del acorde (m7, sus), el ultimo es el bajo
        const bass = parts[parts.length - 1];
        const bassMatch = bass.match(/^([A-G][#b]?)$/);

        if (bassMatch) {
            const bassRoot = normalizeNote(bassMatch[1]);
            const bassIndex = NOTES.indexOf(bassRoot);
            if (bassIndex !== -1) {
                let newBassIndex = (bassIndex + semitones) % 12;
                if (newBassIndex < 0) newBassIndex += 12;
                const newBass = NOTES[newBassIndex];
                // Reconstruir sufijo reemplazando el bajo
                suffix = suffix.substring(0, suffix.lastIndexOf('/')) + '/' + newBass;
            }
        }
    }

    return newRoot + suffix;
};

const transposeText = (text, fromKey, toKey) => {
    const semitones = getSemidistance(fromKey, toKey);
    if (semitones === 0) return text;

    return text.replace(/\[(.*?)\]/g, (match, chord) => {
        return `[${transposeChord(chord, semitones)}]`;
    });
};

function SongView({ initialContent, initialKey = "C", originalKey = "C", initialShowChords = true }) {
  const [content, setContent] = useState(() => {
    if (initialKey && originalKey && initialKey !== originalKey) {
      return transposeText(initialContent, originalKey, initialKey);
    }
    return initialContent;
  });
  const [currentKey, setCurrentKey] = useState(initialKey || originalKey);
  const [showChords, setShowChords] = useState(initialShowChords);
  useEffect(() => {
    const transposeKey = (key, semitones) => {
      const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const map = {
        "Db": "C#",
        "Eb": "D#",
        "Gb": "F#",
        "Ab": "G#",
        "Bb": "A#",
        "Cb": "B",
        "Fb": "E",
        "E#": "F",
        "B#": "C"
      };
      const n = map[key] || key;
      let idx = NOTES.indexOf(n);
      if (idx === -1) return key;
      let newIdx = (idx + semitones) % 12;
      if (newIdx < 0) newIdx += 12;
      return NOTES[newIdx];
    };
    const handleTransposeEvent = (e) => {
      const semitones = e.detail.semitones;
      setCurrentKey((prevKey) => {
        const newKey = transposeKey(prevKey, semitones);
        setContent((prevContent) => transposeText(prevContent, prevKey, newKey));
        return newKey;
      });
    };
    const handleToggleChordsEvent = () => {
      setShowChords((prev) => !prev);
    };
    window.addEventListener("song-transpose", handleTransposeEvent);
    window.addEventListener("song-toggle-chords", handleToggleChordsEvent);
    return () => {
      window.removeEventListener("song-transpose", handleTransposeEvent);
      window.removeEventListener("song-toggle-chords", handleToggleChordsEvent);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "pb-20", children: content.split("\n").map((line, i) => /* @__PURE__ */ jsx(SongLine, { line, showChords }, i)) });
}

export { SongView as S };
