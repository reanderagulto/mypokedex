type Pokemon = {
    id: string;
    image: string;
    name: string;
    url: string;
};

export type PokemonProps = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    data: Array<Pokemon>
}

export type PokemonCardProps = {
    id: string;
    name: string;
    image: string;
}

export type PokemonInfoProps = {
    id: string;
    name: string; 
    image: string;
    isOpen: boolean;
    data: any;
    setOpen: (open: boolean) => void;
}

export type PokemonTypes = {
    name: string; 
    color: string;
}

export const typeColors: Record<string, string> = {
    dark: "bg-dark",
    electric: "bg-electric",
    fighting: "bg-fighting",
    flying: "bg-flying",
    grass: "bg-grass",
    ice: "bg-ice",
    poison: "bg-poison",
    rock: "bg-rock",
    water: "bg-water",
    fire: "bg-fire",
    bug: "bg-bug",
    dragon: "bg-dragon",
    fairy: "bg-fairy",
    ghost: "bg-ghost",
    ground: "bg-ground",
    normal: "bg-normal",
    psychic: "bg-psychic",
    steel: "bg-steel"
};

export const darken = (type: string) => {
    const base = typeColors[type] ?? "";
    return `${base}`;
};
