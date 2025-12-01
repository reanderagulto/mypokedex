import { 
    useEffect
} from "react";

import { usePokemonStore } from "@lib/usePokemonStore";

import PokemonCard from "./PokemonCard";
import { Button } from "../ui/button";

import '@css/pokemon.css';

const PokemonList = () => {
    const {
        allPokemon,
        loading,
        fetchAllPokemon
    } = usePokemonStore();

    const loadPokemon = () => {
        let offset = 0;

        if (allPokemon.next) {
            const url = new URL(allPokemon.next);
            offset = Number(url.searchParams.get("offset") || 0);
        }

        fetchAllPokemon(offset);
    };

    useEffect(() => {  
        if (allPokemon.data.length === 0) {
            loadPokemon();
        }
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
                    onClick={loadPokemon}
                    disabled={loading}
                >
                    Load More
                </Button>
            )}
        </div>
    )
}

export default PokemonList
