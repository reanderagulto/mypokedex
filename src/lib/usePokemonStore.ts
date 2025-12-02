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

type Filters = {
    name: string;
    type: string | null;
    ability: string | null;
};

type PokemonMerged = {
    name: string;
    url: string;
    types: string[];
    abilities: string[];
};

type CacheEntry<T> = {
    data: T;
    timestamp: number;
}

type PokemonStore = {
    // Defining States
    cache: Record<string, CacheEntry<any>>;
    loading: boolean;
    
    allPokemon: any; 
    generations: any[];
    pokemonDetails: Record<string, any>;
    pokemonTypes: any[];
    pokemonAbilities: any[];

    typeMap: Record<string, string[]>;
    abilityMap: Record<string, string[]>;
    mergedPokemon: PokemonMerged[];
    filteredPokemon: PokemonMerged[];
    filters: Filters;

    // Mutator functions - Para update yung mga states sa taas.
    fetchAllPokemon: (offset?: number) => Promise<void>;
    fetchAllGenerations: () => Promise<void>;
    fetchPokemonByName: (name: string) => Promise<void>;
    fetchPokemonTypes: () => Promise<void>;
    fetchPokemonAbilities: () => Promise<void>;

    mergePokemonData: () => void;
    setFilter: (key: keyof Filters, value: string | null) => void;
    applyFilters: () => void;
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
    // Default States Values
    cache: {},
    loading: false,

    allPokemon: { count: 0, next: null, previous: null, data: [] },
    generations: [],
    pokemonDetails: [],
    pokemonTypes: [],
    pokemonAbilities: [],

    typeMap: {},
    abilityMap: {},
    mergedPokemon: [],
    filteredPokemon: [],
    filters: {
        name: "",
        type: null,
        ability: null,
    },

    // Mutator Functions - Fetch Data from API and update states
    fetchAllPokemon: async (offset = 0) => {
        const key = `pokemon-list-${LIMIT}-${offset}`;
        const cached = get().cache[key];

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

        const typeMap: Record<string, string[]> = {};

        for (const t of data.results) {
            const detail = await fetch(t.url).then(r => r.json());
            typeMap[t.name] = detail.pokemon.map((p: any) => p.pokemon.name);
        }

        set({
            pokemonTypes: data.results.map((type: any) => type.name),
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });

        get().mergePokemonData();
    },

    fetchPokemonAbilities: async () => {
        const key = "abilities";
        const cached = get().cache[key];

        if (cached) {
            set({ pokemonAbilities: cached.data });
            return;
        }

        const data = await getPokemonAbilities();
        const resultData = data.results
                                .map((a: any) => a.name)
                                .sort((a: string, b: string) => a.localeCompare(b));

        const abilityMap: Record<string, string[]> = {};

        for (const a of data.results) {
            const detail = await fetch(a.url).then(r => r.json());
            abilityMap[a.name] = detail.pokemon.map((p: any) => p.pokemon.name);
        }

        set({
            pokemonAbilities: resultData,
            cache: {
                ...get().cache,
                [key]: { data, timestamp: Date.now() }
            }
        });

        get().mergePokemonData();
    },

    mergePokemonData: () => {
        const { allPokemon, typeMap, abilityMap } = get();

        const merged = allPokemon.data.map((p: any) => {
            const name = p.name;

            const types = Object.keys(typeMap).filter(t =>
                typeMap[t].includes(name)
            );

            const abilities = Object.keys(abilityMap).filter(a =>
                abilityMap[a].includes(name)
            );

            return {
                name,
                url: p.url,
                types,
                abilities,
            };
        });

        set({ mergedPokemon: merged, filteredPokemon: merged });
    },

    setFilter: (key, value) => {
        set(state => ({
            filters: { ...state.filters, [key]: value },
        }));
        get().applyFilters();
    },

    applyFilters: () => {
        const { mergedPokemon, filters } = get();

        const result = mergedPokemon.filter(p => {
            const matchName =
                filters.name === "" ||
                p.name.toLowerCase().includes(filters.name.toLowerCase());

            const matchType =
                !filters.type || p.types.includes(filters.type);

            const matchAbility =
                !filters.ability || p.abilities.includes(filters.ability);

            return matchName && matchType && matchAbility;
        });

        set({ filteredPokemon: result });
    },
}));