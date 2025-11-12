import axios from 'axios';


const apiUrl = import.meta.env.VITE_POKEAPI_URL;

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

export const getAllPokemon = async (limit = 10) => {
    const { data } = await http.get(
        `${apiUrl}/pokemen?limit=${limit}`
    );
    return data;
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
        `${apiUrl}/pokemen?${name}`
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