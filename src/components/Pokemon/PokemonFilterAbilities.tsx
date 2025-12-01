import { useEffect } from 'react';

import { usePokemonStore } from '@lib/usePokemonStore';

import {
    formatStatName
} from '@/lib/utils';

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '../ui/select';

const PokemonFilterAbilities = () => {

    const { 
        pokemonAbilities, 
        fetchPokemonAbilities 
    } = usePokemonStore();

    useEffect(() => {
        // Only fetch if not already cached
        if (!pokemonAbilities || pokemonAbilities.length === 0) {
            fetchPokemonAbilities();
        }
    }, []);

    return (
        <Select>
            <label className="block font-semibold mb-3 text-sm text-[#000]">Abilities</label>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Abilities" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
                <SelectItem value="all">All</SelectItem>
                {pokemonAbilities?.map((item: any, index:any) => (
                    <SelectItem 
                        key={index}
                        value={item}
                    >
                        {formatStatName(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PokemonFilterAbilities
