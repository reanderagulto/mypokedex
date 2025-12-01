import { useEffect } from 'react';

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
        fetchPokemonTypes
    } = usePokemonStore();

    useEffect(() => {
        // Only fetch if not already cached
        if (!pokemonTypes || pokemonTypes.length === 0) {
            fetchPokemonTypes();
        }
    }, []);

    return (
        <div>
            <label className="block mb-3 font-semibold text-sm text-[#000]">Types</label>
            <div className="flex items-center justify-center flex-wrap w-full gap-[12px]">
                {pokemonTypes?.map((item: any, index: any) => (
                    <Badge 
                        key={index}
                        className={`w-[calc(50%-12px)] h-[32px] flex-grow ${typeColors[item]}`}
                    >
                        {titleCase(item)}
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default PokemonFilterType
