import {
    useState
} from 'react';

import { usePokemonStore } from "@lib/usePokemonStore";

import { 
    Card,
    CardContent,
} from "@/components/ui/card";

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

    const {
        pokemonDetails,
        fetchPokemonByName
    } = usePokemonStore();

    const data = (pokemonDetails as Record<string, any>)[name];

    const handleClick = async () => {
        // fetch only if not cached
        if (!pokemonDetails[name]) {
            await fetchPokemonByName(name);
        }
        setOpen(true);
    };
    
    return (
        <>
            <Card 
                className="pokemon-card" onClick={handleClick}
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
                data={data}
                setOpen={setOpen}
            />
        </>
    )
}

export default PokemonCard
