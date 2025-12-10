import {
    useState
} from 'react';
import { usePokemonStore } from '@lib/usePokemonStore';
import {
    titleCase
} from '@/lib/utils';
import {
    typeColors
} from '@/types/pokemon.type';
import { Badge } from '../ui/badge';

const PokemonFilterType = () => {
    const { 
        pokemonTypes,
        setFilter
    } = usePokemonStore();

    const [activeItem, setActiveItem] = useState('');

    return (
        <div>
            <label className="block mb-3 font-semibold text-sm text-[#000]">Types</label>
            <div className="flex items-center justify-center flex-wrap w-full gap-[12px]">
                {pokemonTypes?.map((item: any, index: any) => (
                    <Badge 
                        key={index}
                        className={`w-[calc(50%-12px)] h-[32px] flex-grow cursor-pointer ${typeColors[item]} ${activeItem == item ? 'border-[2px] border-black': ''}`}
                        onClick={() => { 
                            setFilter("type", item);
                            setActiveItem(item);
                        }}
                    >
                        {titleCase(item)}
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default PokemonFilterType
