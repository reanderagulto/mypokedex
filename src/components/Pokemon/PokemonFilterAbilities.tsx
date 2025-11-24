import {
    useEffect,
    useState
} from 'react';
import {
    getPokemonAbilities
} from '@api/api';
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

    const [abilities, setAbilities] = useState();
    
    const fetchAbilities = async () => {
        const data = await getPokemonAbilities();
        setAbilities(data);
    }

    useEffect(() => {
        fetchAbilities();
    }, []);

    return (
        <Select>
            <label className="block font-semibold mb-3 text-sm text-[#000]">Abilities</label>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Abilities" />
            </SelectTrigger>
            <SelectContent className="max-h-48 overflow-y-auto">
                <SelectItem value="all">All</SelectItem>
                {abilities?.map((item: any, index:any) => (
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
