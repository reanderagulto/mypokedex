import { create } from "zustand";
import {
    getAllPokemon,
    getAllGeneration,
    getPokemonByName,
    getPokemonTypes,
    getPokemonAbilities,
    getPokemonByType,
    getPokemonByAbility
} from "@api/api";

const CACHE_TTL = 1000 * 60 * 10;
const LIMIT = parseInt(import.meta.env.VITE_LIMIT) || 12;

type Filters = {
    name: string;
    type: string | null;
    ability: string | null;
};

type PokemonMerged = {
    id: string;
    name: string;
    image: string;
    types: string[];
    abilities: string[];
};

type CacheEntry<T> = {
    data: T;
    timestamp: number;
};

type PokemonStore = {
    cache: Record<string, CacheEntry<any>>;
    loading: boolean;

    allPokemon: { count: number; next: string | null; previous: string | null; data: any[] };
    generations: any[];
    pokemonDetails: Record<string, any>;
    pokemonTypes: string[];
    pokemonAbilities: string[];

    mergedPokemon: PokemonMerged[];
    filteredPokemon: PokemonMerged[];
    filters: Filters;

    fetchAllPokemon: (offset?: number) => Promise<void>;
    fetchAllGenerations: () => Promise<void>;
    fetchPokemonByName: (name: string) => Promise<void>;
    fetchPokemonTypes: () => Promise<void>;
    fetchPokemonAbilities: () => Promise<void>;

    setFilter: (key: keyof Filters, value: string | null) => void;
    applyFilters: () => void;
};

export const usePokemonStore = create<PokemonStore>((set, get) => ({
    cache: {},
    loading: false,

    allPokemon: { count: 0, next: null, previous: null, data: [] },
    generations: [],
    pokemonDetails: {},
    pokemonTypes: [],
    pokemonAbilities: [],

    mergedPokemon: [],
    filteredPokemon: [],
    filters: { name: "", type: null, ability: null },

    // ===========================
    // Fetch Pokémon list
    // ===========================
    fetchAllPokemon: async (offset = 0) => {
        const key = `pokemon-list-${LIMIT}-${offset}`;
        const cached = get().cache[key];

        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            const prev = get().allPokemon.data;
            const mergedData = [
                ...prev,
                ...cached.data.data.filter(p => !prev.some(old => old.name === p.name))
            ];
            set({ allPokemon: { ...cached.data, data: mergedData } });
            return;
        }

        set({ loading: true });
        const data = await getAllPokemon(LIMIT, offset);

        const prevData = get().allPokemon.data;
        const mergedData = [
            ...prevData,
            ...data.data.filter(p => !prevData.some(old => old.name === p.name))
        ];

        get().mergedPokemon = mergedData;

        set({
            allPokemon: { ...data, data: mergedData },
            loading: false,
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });        
    },

    // ===========================
    // Generations
    // ===========================
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

    // ===========================
    // Pokémon Details by Name
    // ===========================
    fetchPokemonByName: async (name: string) => {
        const key = `pokemon-${name}`;
        const cached = get().cache[key];

        if (cached) return cached.data;

        const data = await getPokemonByName(name);
        set({
            pokemonDetails: { ...get().pokemonDetails, [name]: data },
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });
        return data;
    },

    // ===========================
    // Pokémon Types
    // ===========================
    fetchPokemonTypes: async () => {
        const key = "types";
        const cached = get().cache[key];

        if (cached) {
            set({ pokemonTypes: cached.data });
            return;
        }

        const data = await getPokemonTypes();
        const list = data.results.map((t: any) => t.name);

        set({
            pokemonTypes: list,
            cache: { ...get().cache, [key]: { data: list, timestamp: Date.now() } }
        });
    },

    // ===========================
    // Pokémon Abilities
    // ===========================
    fetchPokemonAbilities: async () => {
        const key = "abilities";
        const cached = get().cache[key];

        if (cached) {
            set({ pokemonAbilities: cached.data });            
            return;
        }

        const data = await getPokemonAbilities();
        const list = data.results.map((a: any) => a.name).sort();

        set({
            pokemonAbilities: list,
            cache: { ...get().cache, [key]: { data: list, timestamp: Date.now() } }
        });
    },

    // ===========================
    // Filters
    // ===========================
    setFilter: (key, value) => {
        set(state => ({ filters: { ...state.filters, [key]: value } }));
        get().applyFilters();
    },
    
    applyFilters: async () => {
        const { filters, mergedPokemon } = get();
        let result: PokemonMerged[] = [];

        if (filters.type && filters.ability) {
            const typeList = await getPokemonByType(filters.type);
            const abilityList = await getPokemonByAbility(filters.ability);
            const abilityNames = new Set(abilityList.map(p => p.name));

            result = typeList
                .filter(p => abilityNames.has(p.name))
                .map(p => ({
                    ...p,
                    types: [],
                    abilities: []
                }));
        }

        else if (filters.type) {
            const typeList = await getPokemonByType(filters.type);
            result = typeList.map(p => ({
                ...p,
                types: [],
                abilities: []
            }));
        }

        else if (filters.ability) {
            const abilityList = await getPokemonByAbility(filters.ability);
            result = abilityList.map(p => ({
                ...p,
                types: [],
                abilities: []
            }));
        }

        else {
            result = mergedPokemon;
        }

        if (filters.name) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        set({ filteredPokemon: result });
    }
}));
