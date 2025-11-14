import {
    useState
} from 'react';

import { 
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    titleCase
} from '@lib/utils';
import type { PokemonCardProps } from '@/types/pokemon.type';
import '@css/pokemon.css';
import PokemonInfo from './PokemonInfo';

const PokemonCard = ({
    id = '',
    name = '',
    image = ''
}: PokemonCardProps) => {
    const [open, setOpen] = useState(false);

    const handleSetOpen = (state: boolean) => {
        setOpen(state);
    }
    
    return (
        <>
            <Card 
                className="pokemon-card"
                onClick={() => {
                    handleSetOpen(true)
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
                setOpen={handleSetOpen}
            />
        </>
    )
}

export default PokemonCard
