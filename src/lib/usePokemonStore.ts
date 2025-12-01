import {
    create
} from "zustand";
import { 
    getAllPokemon, 
    getAllGeneration,  
    getPokemonByName, 
    getPokemonTypes, 
    getPokemonAbilities
} from '@api/api';

const CACHE_TTL = 1000 * 60 * 10;
const LIMIT = parseInt(import.meta.env.VITE_LIMIT) || 12;

type CacheEntry<T> = {
    data: T;
    timestamp: number;
}

type PokemonStore = {
    cache: Record<string, CacheEntry<any>>;
    loading: boolean;

    allPokemon: any; 
    generations: any[];
    pokemonDetails: Record<string, any>;
    pokemonTypes: any[];
    pokemonAbilities: any[];

    fetchAllPokemon: (offset?: number) => Promise<void>;
    fetchAllGenerations: () => Promise<void>;
    fetchPokemonByName: (name: string) => Promise<void>;
    fetchPokemonTypes: () => Promise<void>;
    fetchPokemonAbilities: () => Promise<void>;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
    cache: {},
    loading: false,

    allPokemon: { count: 0, next: null, previous: null, data: [] },
    generations: [],
    pokemonDetails: [],
    pokemonTypes: [],
    pokemonAbilities: [],

    fetchAllPokemon: async (offset = 0) => {
        const key = `pokemon-list-${LIMIT}-${offset}`;
        const cached = get().cache[key];

        // If cached, append or init
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            const prev = get().allPokemon;
            const merged = {
                count: cached.data.count,
                next: cached.data.next,
                previous: cached.data.previous,
                data: [...prev.data, ...cached.data.data]
            };
            set({ allPokemon: merged });
            return;
        }

        set({ loading: true });

        const data = await getAllPokemon(LIMIT, offset);

        // Append to the existing state
        const merged = {
            count: data.count,
            next: data.next,
            previous: data.previous,
            data: [...get().allPokemon.data, ...data.data]
        };

        set({
            allPokemon: merged,
            loading: false,
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });
    },

    fetchAllGenerations: async () => {
        const key = "generations";
        const cached = get().cache[key];

        if (cached) {
            set({ generations: cached.data });
            return;
        }

        const data = await getAllGeneration();

        set({
            generations: data.results,
            cache: { ...get().cache, [key]: { data: data.results, timestamp: Date.now() } }
        });
    },

    fetchPokemonByName: async (name: string) => {
        const key = `pokemon-${name}`;
        const cached = get().cache[key];

        if (cached) {
            return cached.data;        // return cached data directly
        }

        const data = await getPokemonByName(name);

        set({
            pokemonDetails: {
                ...get().pokemonDetails,
                [name]: data,
            },
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });

        return data;
    },

    fetchPokemonTypes: async () => {
        const key = "types";
        const cached = get().cache[key];

        if (cached) {
            set({ pokemonTypes: cached.data });
            return;
        }

        const data = await getPokemonTypes();

        set({
            pokemonTypes: data,
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });
    },

    fetchPokemonAbilities: async () => {
        const key = "abilities";
        const cached = get().cache[key];

        if (cached) {
            set({ pokemonAbilities: cached.data });
            return;
        }

        const data = await getPokemonAbilities();

        set({
            pokemonAbilities: data,
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });
    }
}));