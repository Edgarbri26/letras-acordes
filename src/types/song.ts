import type { Category } from "./category";

export type Song = {
    id: number;
    title: string;
    artist: string;
    content: string;
    key: string;
    url_song: string;
    categoryId: number;
    category: Category | null;
    active: boolean;
    user?: {
        id: number;
        name: string;
    } | null;
    userId?: number;
}

