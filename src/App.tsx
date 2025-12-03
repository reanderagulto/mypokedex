import {
    useEffect
} from 'react';
import Home from "@/views/Home";
import SiteHeader from "./components/global/SiteHeader";
import '@css/header.css';
import { usePokemonStore } from "@lib/usePokemonStore";

const App = () => {
    const {
        allPokemon,
        fetchAllPokemon, 
        fetchPokemonAbilities, 
        fetchPokemonTypes
    } = usePokemonStore();

    useEffect(() => {
        if (allPokemon.data.length === 0) {
            Promise.all([
                fetchAllPokemon(0),
                fetchPokemonAbilities(),
                fetchPokemonTypes()
            ]);
        }
    }, []);

    return (
        <>
            <SiteHeader />
            <Home />
        </>
    )
}

export default App;
