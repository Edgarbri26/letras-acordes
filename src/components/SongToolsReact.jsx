import React, { useState, useEffect } from 'react';

export const SongToolsReact = ({
    id,
    onTranspose,
    onToggleChords,
    onPrint,
    canEdit
}) => {
    const [isCollapsed, setIsCollapsed] = useState(() => window.innerWidth >= 768); // Defaults: Desktop=Collapsed(meaning Expanded UI but logic inverted in original?), Mobile=NotCollapsed

    // Logic from Astro: 
    // Desktop: Default isCollapsed=true (Expanded UI). 
    // Mobile: Default isCollapsed=false (Shown UI).

    // Actually the Astro logic was a bit confusing:
    // "isCollapsed = true" -> "Expanded Sidebar (w-56)" on Desktop.

    // Let's simplify. 
    // isExpanded state.
    // Desktop default: Expanded.
    // Mobile default: Expanded (Visible).

    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleTools = () => setIsExpanded(!isExpanded);

    // Dynamic classes based on state
    const asideClasses = `w-16 flex flex-col items-center py-4 gap-4 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/5 md:flex no-print transition-all duration-300 ease-in-out overflow-visible z-40 bg-bg-main
        ${isMobile
            ? (isExpanded ? "w-16 border-r py-4" : "w-0 border-none p-0 min-w-0")
            : (isExpanded ? "w-56" : "w-16")
        }`;

    const btnToggleClasses = `p-2 text-text-secondary hover:text-accent-main transition-all duration-300 absolute top-4 z-50 rounded-full
        ${isMobile
            ? (isExpanded ? "right-1/2 translate-x-1/2 bg-bg-main" : "left-2 bg-bg-secondary shadow-lg")
            : "right-1/2 translate-x-1/2 bg-bg-main"
        }`;

    const iconClasses = `fa-solid fa-arrow-left transition-transform duration-300
        ${isMobile
            ? (isExpanded ? "" : "rotate-180")
            : (isExpanded ? "" : "rotate-180") // Review rotation logic
        }`;

    const labelClasses = `tool-label whitespace-nowrap overflow-hidden transition-all duration-300
        ${isMobile
            ? "hidden md:block opacity-0 w-0" // Mobile never shows label
            : (isExpanded ? "block opacity-100 w-auto" : "hidden opacity-0 w-0")
        }`;

    return (
        <aside id="song-tools-aside" className={asideClasses}>
            <button
                id="btn-toggle-tools"
                className={btnToggleClasses}
                title="Ocultar herramientas"
                onClick={toggleTools}
            >
                <i className={iconClasses}></i>
            </button>

            <div className={`flex flex-col items-center gap-4 mt-12 w-full transition-opacity duration-300 overflow-hidden ${(!isExpanded && isMobile) ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="flex flex-col gap-2 w-full px-2 items-center md:items-stretch">
                    <button
                        onClick={() => onTranspose(1)}
                        className="flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition font-bold rounded-lg hover:bg-white/5 w-full"
                        title="Subir Tono"
                    >
                        <i className="fa-solid fa-plus w-5 h-5 flex items-center justify-center"></i>
                        <span className={labelClasses}>Subir Tono</span>
                    </button>

                    <span className="text-xs text-text-secondary md:hidden mb-1">Tono</span>

                    <button
                        onClick={() => onTranspose(-1)}
                        className="flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition font-bold rounded-lg hover:bg-white/5 w-full"
                        title="Bajar Tono"
                    >
                        <i className="fa-solid fa-minus w-5 h-5 flex items-center justify-center"></i>
                        <span className={labelClasses}>Bajar Tono</span>
                    </button>
                </div>

                <div className="h-px w-8 bg-white/10 my-1"></div>

                <button
                    onClick={onToggleChords}
                    className="flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]"
                    title="Alternar Acordes"
                >
                    <i className="fa-solid fa-music w-5 h-5 flex items-center justify-center"></i>
                    <span className={labelClasses}>Acordes</span>
                </button>

                <div className="h-px w-8 bg-white/10 my-1"></div>
                <button
                    onClick={onPrint}
                    className="flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]"
                    title="Descargar"
                >
                    <i className="fa-solid fa-download w-5 h-5 flex items-center justify-center"></i>
                    <span className={labelClasses}>Descargar</span>
                </button>

                {canEdit && (
                    <a
                        href={`/songs/edit/${id}`}
                        className="flex items-center justify-center md:justify-start gap-3 p-2 text-text-secondary hover:text-accent-main transition rounded-lg hover:bg-white/5 w-[calc(100%-1rem)]"
                        title="Editar"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pencil"
                        >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                        </svg>
                        <span className={labelClasses}>Editar</span>
                    </a>
                )}
            </div>
        </aside>
    );
};
