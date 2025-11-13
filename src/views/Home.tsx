import { 
    useEffect, 
    useState 
} from "react";
import {
    getAllPokemon
} from '@api/api';
import { 
    Card,
    CardContent,
} from "@/components/ui/card";
import type { PokemonProps } from '@/types/pokemon.type';
import '@css/homepage.css';

const Home = () => {
    const [allPokemon, setAllPokemon] = useState<PokemonProps>({
        count: 0,
        next: null,
        previous: null,
        data: []
    });

    const fetchPokemon = async () => {
        setAllPokemon(await getAllPokemon(12));
    };

    useEffect(() => {  
        fetchPokemon();
    }, []);

    return (
        <div className="pokemon-list">
            {allPokemon?.data?.map((item:any, index:any) => {
                return (
                    <Card className="pokemon-card" key={index}>
                        <CardContent className="relative">
                            <div className="pokemon-number">{`#${item.id}`}</div>
                            <img 
                                src={item.image} 
                                alt={`${item.name} Image`} 
                                width="72"
                                height="72"
                            />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}

export default Home
