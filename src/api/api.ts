import axios from 'axios';

const apiUrl = import.meta.env.VITE_POKEAPI_URL;
const spriteUrl = import.meta.env.VITE_POKESPRITE;

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_URL
});

export const getAllPokemon = async (limit = 12, offset = 0) => {
    const res = await http.get(
        `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`
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

export const getPokemonByType = async (type: string) => {
    const { data } = await http.get(`${apiUrl}/type/${type}`);

    return data.pokemon.map((p: any) => {
        const url = p.pokemon.url;
        const id = url.split("/")[url.split("/").length - 2];
        const image = `${spriteUrl}/${id}.png`;

        return { id, name: p.pokemon.name, image };
    });
};

export const getPokemonByAbility = async (ability: string) => {
    const { data } = await http.get(`${apiUrl}/ability/${ability}`);

    return data.pokemon.map((p: any) => {
        const url = p.pokemon.url;
        const id = url.split("/")[url.split("/").length - 2];
        const image = `${spriteUrl}/${id}.png`;

        return { id, name: p.pokemon.name, image };
    });
};

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

export const getPokemonByName = async (name: string) => {
    const res = await http.get(
        `${apiUrl}/pokemon/${name}`
    );
    const types = res.data.types.map((item: any) => {
        const name = item.type.name;
        return {
            name
        }
    });
    const data = {...res.data, types};
    return data;
}

export const getPokemonTypes = async () => {
    const { data } = await http.get(
        `${apiUrl}/type?limit=10000`
    );
    return data;
}

export const getPokemonAbilities = async () => {
    const { data } = await http.get(`${apiUrl}/ability?limit=10000`);
    
    return data;
};