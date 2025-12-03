import { create } from "zustand";
import {
    getAllPokemon,
    getAllGeneration,
    getPokemonByName,
    getPokemonTypes,
    getPokemonAbilities
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

    typeMap: Record<string, string[]>;
    abilityMap: Record<string, string[]>;
    mergedPokemon: PokemonMerged[];
    filteredPokemon: PokemonMerged[];
    filters: Filters;

    isReadyToMerge: () => boolean;

    fetchAllPokemon: (offset?: number) => Promise<void>;
    fetchAllGenerations: () => Promise<void>;
    fetchPokemonByName: (name: string) => Promise<void>;
    fetchPokemonTypes: () => Promise<void>;
    fetchPokemonAbilities: () => Promise<void>;

    mergePokemonData: () => void;
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

    typeMap: {},
    abilityMap: {},
    mergedPokemon: [],
    filteredPokemon: [],
    filters: { name: "", type: null, ability: null },

    isReadyToMerge: () => {
        const { allPokemon, typeMap, abilityMap } = get();
        return allPokemon.data.length > 0 && Object.keys(typeMap).length > 0 && Object.keys(abilityMap).length > 0
        ;
    },

    // Fetch Pokémon list
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
            if (get().isReadyToMerge()) get().mergePokemonData();
            return;
        }

        set({ loading: true });
        const data = await getAllPokemon(LIMIT, offset);

        // Deduplicate as we append
        const prevData = get().allPokemon.data;
        const mergedData = [
            ...prevData,
            ...data.data.filter(p => !prevData.some(old => old.name === p.name))
        ];

        set({
            allPokemon: { ...data, data: mergedData },
            loading: false,
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });

        if (get().isReadyToMerge()) get().mergePokemonData();
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

        if (cached) return cached.data;

        const data = await getPokemonByName(name);
        set({
            pokemonDetails: { ...get().pokemonDetails, [name]: data },
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });
        return data;
    },

    fetchPokemonTypes: async () => {
        const key = "types";
        const cached = get().cache[key];
        if (cached) {
            set({ pokemonTypes: cached.data });
            if (get().isReadyToMerge()) get().mergePokemonData();
            return;
        }

        const data = await getPokemonTypes();
        const typeMap: Record<string, string[]> = {};

        await Promise.all(
            data.results.map(async (t: any) => {
                const detail = await fetch(t.url).then(r => r.json());
                typeMap[t.name] = detail.pokemon.map((p: any) => p.pokemon.name);
            })
        );

        set({
            pokemonTypes: data.results.map((t: any) => t.name),
            typeMap,
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });

        if (get().isReadyToMerge()) get().mergePokemonData();
    },

    fetchPokemonAbilities: async () => {
        const key = "abilities";
        const cached = get().cache[key];
        if (cached) {
            set({ pokemonAbilities: cached.data });
            if (get().isReadyToMerge()) get().mergePokemonData();
            return;
        }

        const data = await getPokemonAbilities();
        const abilityMap: Record<string, string[]> = {};

        await Promise.all(
            data.results.map(async (a: any) => {
                const detail = await fetch(a.url).then(r => r.json());
                abilityMap[a.name] = detail.pokemon.map((p: any) => p.pokemon.name);
            })
        );

        const resultData = data.results.map((a: any) => a.name).sort();

        set({
            pokemonAbilities: resultData,
            abilityMap,
            cache: { ...get().cache, [key]: { data, timestamp: Date.now() } }
        });

        if (get().isReadyToMerge()) get().mergePokemonData();
    },

    // Merge all data into mergedPokemon with IDs and images
    mergePokemonData: () => {
        const { allPokemon, typeMap, abilityMap } = get();
        if (!get().isReadyToMerge()) return;

        const merged: PokemonMerged[] = allPokemon.data.map((p: any) => {
            const name = p.name;
            const id = p.url.split("/").filter(Boolean).pop();

            const mapToKeys = (map: Record<string, string[]>) =>
                Object.entries(map)
                    .filter(([_, list]) => list.includes(name))
                    .map(([key]) => key);

            return {
                id,
                name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                types: mapToKeys(typeMap),
                abilities: mapToKeys(abilityMap)
            };
        });

        // Deduplicate by name
        const uniqueMerged = Array.from(new Map(merged.map(p => [p.name, p])).values());

        set({
            mergedPokemon: uniqueMerged,
            filteredPokemon: uniqueMerged
        });
    },

    setFilter: (key, value) => {
        set(state => ({ filters: { ...state.filters, [key]: value } }));
        get().applyFilters();
    },

    applyFilters: () => {
        const { mergedPokemon, filters } = get();
        const result = mergedPokemon.filter(p => {
            const matchName =
                !filters.name || p.name.toLowerCase().includes(filters.name.toLowerCase());
            const matchType = !filters.type || p.types.includes(filters.type);
            const matchAbility = !filters.ability || p.abilities.includes(filters.ability);
            return matchName && matchType && matchAbility;
        });
        set({ filteredPokemon: result });
    }
    
    
}));
