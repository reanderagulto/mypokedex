import { usePokemonStore } from "@lib/usePokemonStore";
import PokemonCard from "./PokemonCard";
import { Button } from "../ui/button";
import "@css/pokemon.css";

const PokemonList = () => {
    const {
        allPokemon,
        filteredPokemon,
        filters,
        loading,
        fetchAllPokemon
    } = usePokemonStore();

    const isFiltering =
        filters.name ||
        filters.type !== null ||
        filters.ability !== null;

    const list = isFiltering ? filteredPokemon : allPokemon.data;

    const loadMore = () => {
        const next = allPokemon.next;
        if (!next) return;

        const offset = Number(new URL(next).searchParams.get("offset") || 0);
        fetchAllPokemon(offset);
    };

    return (
        <div className="pokemon-list">
            {list.map((p: any, i: number) => (
                <PokemonCard
                    key={p.id || i}
                    id={p.id}
                    name={p.name}
                    image={p.image}
                />
            ))}

            {/* Load More only when NOT filtering */}
            {!isFiltering && allPokemon.next && (
                <Button
                    className="mx-auto"
                    onClick={loadMore}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load More"}
                </Button>
            )}
        </div>
    );
};

export default PokemonList;
