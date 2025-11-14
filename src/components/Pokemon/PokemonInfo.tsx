import {
    useCallback,
    useEffect,
    useState
} from 'react';
import type { PokemonInfoProps } from '@/types/pokemon.type';
import {
    getPokemonByName
} from '@api/api';
import { 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerTitle,
    DrawerDescription
} from "@/components/ui/drawer";
import {
    titleCase
} from '@lib/utils';

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
        setPokemonData(data);
    }

    console.log(pokemonData);
    

    useEffect(() => {
        if (isOpen) {
            fetchPokemonInfo();
        }
    }, [isOpen, name]);

    return (
        <Drawer 
            open={isOpen} 
            onOpenChange={setOpen}
        >
            <DrawerContent
                className={`pokemon-info`}
            >
                <DrawerHeader className="pokemon-info__header">
                    <DrawerTitle className="pokemon-info__title">
                        <span>{`#${id}`}</span>
                        {titleCase(name)}
                    </DrawerTitle>
                    <div className="pokemon-info__image">
                        <img 
                            src={image} 
                            alt={`${titleCase(name)} Image`} 
                            className="pokemon-info__image"
                        />
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default PokemonInfo
