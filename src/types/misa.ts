import type { Song } from "./song";

export interface Moment {
    id: number;
    nombre: string;
}

export interface MisaSong {
    id: number;
    misaId: number;
    songId: number;
    momentId: number | null;
    key: string | null;
    song: Song;
    moment: Moment | null;
}

export interface Misa {
    id: number;
    title: string;
    dateCreate: string;
    dateMisa: string;
    misaSongs: MisaSong[];
    visibility: 'PUBLIC' | 'PRIVATE';
    userId: number;
    user?: {
        name: string;
        email: string;
    };
}
