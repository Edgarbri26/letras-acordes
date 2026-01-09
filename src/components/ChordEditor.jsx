import React, { useState, useRef, useEffect } from 'react';
import { transposeText, transposeChord } from '../utils/music';
import ChordToolbar from './ChordToolbar';
import SongLine from './SongLine';

export default function ChordEditor({ name = "content", initialContent = "", initialKey = "C" }) {
    // Estado inicial vacío o con instrucciones
    const [content, setContent] = useState(initialContent);
    const [currentKey, setCurrentKey] = useState(initialKey);
    const keyRef = useRef(initialKey); // Ref para acceso síncrono y evitar doble transposición
    const textareaRef = useRef(null);

    const commonChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Cm', 'Dm', 'Em', 'Am', 'Bm'];

    useEffect(() => {
        const handleKeyChange = (e) => {
            const newKey = e.detail.key;
            // Usamos keyRef.current para saber la tonalidad ACTUAL real (incluso si se acabó de cambiar localmente)
            const fromKey = keyRef.current;

            if (fromKey !== newKey) {
                setContent(prevContent => transposeText(prevContent, fromKey, newKey));
                setCurrentKey(newKey);
                keyRef.current = newKey; // Sincronizamos ref
            }
        };

        // Escuchar evento para actualizar contenido desde fuera (ej: AI autocomplete)
        const handleContentUpdate = (e) => {
            if (e.detail && e.detail.content) {
                setContent(e.detail.content);
            }
        };

        window.addEventListener('song-key-change', handleKeyChange);
        window.addEventListener('update-editor-content', handleContentUpdate);

        return () => {
            window.removeEventListener('song-key-change', handleKeyChange);
            window.removeEventListener('update-editor-content', handleContentUpdate);
        };
    }, []); // Ya no depende de currentKey porque usamos ref

    const addChord = (chordName) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        // Insertamos formato [Acorde]
        const newText = text.substring(0, start) + `[${chordName}]` + text.substring(end);

        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + chordName.length + 2, start + chordName.length + 2);
        }, 0);
    };

    const handleTranspose = (semitones) => {
        const newContent = content.replace(/\[(.*?)\]/g, (match, chord) => {
            return `[${transposeChord(chord, semitones)}]`;
        });
        setContent(newContent);

        // Calcular nueva tonalidad
        const nextKey = transposeChord(keyRef.current, semitones);

        // Actualizamos Refs y Estado INMEDIATAMENTE antes de despachar el evento
        keyRef.current = nextKey;
        setCurrentKey(nextKey);

        // Despachamos evento. 
        // Cuando el evento 'song-key-change' regrese (eco), handleKeyChange verá que keyRef.current === nextKey
        // y NO hará una segunda transposición.
        window.dispatchEvent(new CustomEvent('editor-key-change', {
            detail: { key: nextKey }
        }));
    };

    const addSection = (type) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        let insertText = "";

        if (type === "Coro") {
            insertText = "{c: Coro}\n";
        } else if (type === "Estrofa") {
            // Contar estrofas existentes para auto-incrementar
            // Buscamos todas las ocurrencias de {c: Estrofa N}
            const matches = [...text.matchAll(/\{c:\s*Estrofa\s*(\d+)\}/gi)];

            let maxNum = 0;
            matches.forEach(m => {
                const num = parseInt(m[1], 10);
                if (!isNaN(num) && num > maxNum) {
                    maxNum = num;
                }
            });

            insertText = `{c: Estrofa ${maxNum + 1}}\n`;
        }

        const newText = text.substring(0, start) + insertText + text.substring(end);
        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + insertText.length, start + insertText.length);
        }, 0);
    };

    return (
        <div className="space-y-4">
            {/* TRUCO: Input oculto para que el formulario de Astro reciba los datos */}
            <input type="hidden" name={name} value={content} />

            {/* Botonera Reutilizable */}
            <ChordToolbar onTranspose={handleTranspose} onInsertChord={addChord} onInsertSection={addSection} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Área de Edición */}
                <div className="flex flex-col h-[400px] lg:h-[500px]">
                    <label className="text-sm font-medium text-text-secondary mb-2">Editor (Código)</label>
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full flex-1 bg-bg-secondary border border-white/10 rounded-lg p-4 font-mono text-sm text-text-main focus:outline-none focus:border-accent-main resize-none placeholder-white/20"
                        placeholder="Escribe la letra aquí y presiona los botones de acordes para insertar y los botones de secciones para insertar coro o estrofa...&#10;Ejemplo:&#10; {c: Estrofa 1}&#10; Dios es[C]ta aqui"
                    />
                </div>

                {/* Vista Previa */}
                <div className="flex flex-col h-[400px] lg:h-[500px]">
                    <label className="text-sm font-medium text-text-secondary mb-2">Vista Previa (En vivo)</label>
                    <div className="w-full flex-1 bg-[#fffbf6] text-gray-900 border border-white/10 rounded-lg p-6 overflow-y-auto shadow-inner">
                        {content.split('\n').map((line, i) => (
                            <SongLine key={i} line={line} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}