import {
    useEffect,
    useState
} from 'react';

import { 
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    getPokemonByName
} from '@api/api';

import {
    titleCase
} from '@lib/utils';

import type { 
    PokemonCardProps
} from '@/types/pokemon.type';
import PokemonInfo from './PokemonInfo';

import '@css/pokemon.css';

const PokemonCard = ({
    id = '',
    name = '',
    image = ''
}: PokemonCardProps) => {
    const [open, setOpen] = useState(false);
    const [pokemonData, setPokemonData] = useState();

    const fetchData = async(name: string) => {
        const data = await getPokemonByName(name);
        setPokemonData(data);
    }

    const handleSetOpen = (state: boolean) => {
        setOpen(state);
    }
    
    return (
        <>
            <Card 
                className="pokemon-card"
                onClick={() => {
                    fetchData(id);
                    handleSetOpen(true);
                }}
            >
                <CardContent className="relative">
                    <img 
                        src={image} 
                        alt={`${name} Image`} 
                        className="pokemon-card__image"
                    />
                    <div className="pokemon-card__number">{`#${id}`}</div>
                    <div className="pokemon-card__name">{titleCase(name)}</div>
                </CardContent>
            </Card>
            <PokemonInfo 
                id={id}
                name={name}
                image={image}
                isOpen={open}
                data={pokemonData}
                setOpen={handleSetOpen}
            />
        </>
    )
}

export default PokemonCard
