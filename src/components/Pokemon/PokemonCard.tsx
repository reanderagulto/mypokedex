import { 
    Card,
    CardContent,
} from "@/components/ui/card";
import type { PokemonCardProps } from '@/types/pokemon.type';
import '@css/pokemon.css';

const PokemonCard = ({
    id = '',
    name = '',
    image = ''
}: PokemonCardProps) => {

    function titleCase(s: string) {
        return s.toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
    }

    return (
        <Card className="pokemon-card">
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
    )
}

export default PokemonCard
