import axios from 'axios';

const apiUrl = import.meta.env.VITE_POKEAPI_URL;
const spriteUrl = import.meta.env.VITE_POKESPRITE;

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

export const getAllPokemon = async (limit = 12) => {
    const res = await http.get(
        `${apiUrl}/pokemon?limit=${limit}`
    );
    const pokemons  = res.data.results.map((data: any) => {
        const id = data.url.split("/")[data.url.split("/").length - 2];
        const image = `${spriteUrl}/${id}.png`;
        return {            
            id,
            image,
            ...data,
        };
    });
    return {
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
        data: pokemons
    };
}

export const getAllGeneration = async () => {
    const { data } = await http.get(
        `${apiUrl}/generation`
    );
    return data;
}

export const getGenerationById = async (id: number) => {
    const { data } = await http.get(
        `${apiUrl}/generation/${id}`
    );
    return data;
}

export const getPokemonByID = async (name: string) => {
    const res = await http.get(
        `${apiUrl}/pokemon/${name}`
    );
    const types = res.data.types.map((item: any) => {
        const name = item.type.name;
        const color = `bg-${item.type.name}`;
        return {
            name,
            color
        }
    });
    const data = {...res.data, types};
    return data;
}