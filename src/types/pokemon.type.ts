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
