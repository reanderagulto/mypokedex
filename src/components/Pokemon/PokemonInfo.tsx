import {
    useEffect,
    useState
} from 'react';
import type { PokemonInfoProps } from '@/types/pokemon.type';
import {
    getPokemonByName
} from '@api/api';
import { 
    Drawer, 
    DrawerContent 
} from "@/components/ui/drawer";

const PokemonInfo = ({
    id = '', 
    name = '', 
    image = '',
    isOpen = false, 
    setOpen
 }: PokemonInfoProps) => {
    const [pokemonData, setPokemonData] = useState();

    const fetchPokemonInfo = async() => {
        const data = await getPokemonByName(name);
        setPokemonData(data)
    }

    useEffect(() => {
        fetchPokemonInfo();
    }, []);

    return (
        <div>

        </div>
    )
}

export default PokemonInfo
