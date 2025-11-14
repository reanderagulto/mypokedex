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
    setOpen: (open: boolean) => void;
}