import { 
    useEffect, 
    useState 
} from "react";
import {
    getAllPokemon
} from '@api/api';
import type { PokemonProps } from '@/types/pokemon.type';
import PokemonCard from "./PokemonCard";
import '@css/pokemon.css';
import { Button } from "../ui/button";

const LIMIT = 30;

const PokemonList = () => {
    const [allPokemon, setAllPokemon] = useState<PokemonProps>({
        count: 0,
        next: null,
        previous: null,
        data: []
    });
    
    const [loading, setLoading] = useState(false);

    const fetchPokemon = async () => {
        setLoading(true);

        let offset = 0;
        if (allPokemon.next) {
            const url = new URL(allPokemon.next);
            offset = Number(url.searchParams.get("offset") || 0);
        }

        const data = await getAllPokemon(LIMIT, offset); // assuming getAllPokemon supports limit & offset

        // Append new data
        setAllPokemon(prev => ({
            count: data.count,
            next: data.next,
            previous: data.previous,
            data: [...prev.data, ...data.data]
        }));

        setLoading(false);
    };

    useEffect(() => {  
        fetchPokemon();
    }, []);

    return (
        <div className="pokemon-list">
            {allPokemon?.data?.map((item:any, index:any) => {
                return (
                    <PokemonCard 
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        key={index}
                    />
                );
            })}
            {allPokemon.next && (
                <Button
                    className="mx-auto"
                    onClick={fetchPokemon}
                    disabled={loading}
                >
                    Load More
                </Button>
            )}
        </div>
    )
}

export default PokemonList
