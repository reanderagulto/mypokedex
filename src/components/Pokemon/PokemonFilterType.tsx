import {
    useEffect,
    useState
} from 'react';
import {
    getPokemonTypes
} from '@api/api';
import {
    titleCase
} from '@/lib/utils';
import {
    typeColors
} from '@/types/pokemon.type';
import { Badge } from '../ui/badge';

const PokemonFilterType = () => {
    const [types, setTypes] = useState();
        
    const fetchTypes = async () => {
        const data = await getPokemonTypes();
        setTypes(data);
    }

    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <div>
            <label className="block mb-3 font-semibold text-sm text-[#000]">Types</label>
            <div className="flex items-center justify-center flex-wrap w-full gap-[12px]">
                {types?.map((item: any, index: any) => (
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
