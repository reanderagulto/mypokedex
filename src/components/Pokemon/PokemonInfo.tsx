import type { 
    PokemonInfoProps 
} from '@/types/pokemon.type';

import {
    typeColors,
    darken
} from '@/types/pokemon.type';

import { 
    Drawer, 
    DrawerContent,
    DrawerHeader, 
    DrawerTitle
} from "@/components/ui/drawer";

import { Badge } from '../ui/badge';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { 
    Card,
    CardHeader,
    CardContent
} from '../ui/card';

import IconHeight from '@/assets/icon-straighten.svg';
import IconWeight from '@/assets/icon-weight.svg';

import {
    titleCase,
    unitConversion,
    formatStatName
} from '@lib/utils';
import { Progress } from '../ui/progress';

const PokemonInfo = ({
    id = '', 
    name = '', 
    image = '',
    data,
    isOpen = false, 
    setOpen
 }: PokemonInfoProps) => {

    console.log(data?.stats);

    return (
        <Drawer            
            open={isOpen} 
            onOpenChange={setOpen}
        >
            <DrawerContent
                className={`pokemon-info z-50 ${darken(data?.types[0].name)}`}
            >
                <div className="absolute inset-0 bg-black/20 z-30"></div>
                <ScrollArea className="h-[500px] overflow-y-auto border-0 relative z-50">
                    <DrawerHeader className="pokemon-info__header">
                        <DrawerTitle className="text-white pokemon-info__title">
                            <span className="text-white pokemon-info__number">{`#${id}`}</span>
                            {titleCase(name)}
                            <div className="flex items-center justify-center pokemon-info__types">
                                {data?.types.map((item: any, index: any) => (
                                    <Badge 
                                        key={index}
                                        className={`pokemon-info__badge ${typeColors[item?.name]}`}
                                    >
                                        {titleCase(item?.name)}
                                    </Badge>
                                ))}
                            </div>
                        </DrawerTitle>
                        <div className="pokemon-info__image">
                            <img 
                                src={image} 
                                alt={`${titleCase(name)} Image`} 
                                className="pokemon-info__image"
                            />
                        </div>
                    </DrawerHeader>
                    <Card className="pokemon-info__content">
                        <CardHeader className="pokemon-info__section--header text-center">
                            About
                        </CardHeader>
                        <CardContent className="pokemon-info__inner-content">
                            <div className="max-h-[400px] overflow-y-auto">
                                <div className="flex items-stretch justify-center gap-5 pokemon-info__attribute--list">
                                    <div className="flex flex-col gap-1 justify-center items-center pokemon-info__attribute">
                                        <span className="flex items-center gap-1">
                                            <img src={IconWeight} alt="Weight Icon" />
                                            {unitConversion(data?.weight)} KG
                                        </span>
                                        <span className="pokemon-info__about--header text-center">Weight</span>
                                    </div>
                                    <div className="flex flex-col gap-1 justify-center items-center pokemon-info__attribute">
                                        <span className="flex items-center gap-1">
                                            <img src={IconHeight} alt="Height Icon" />
                                            {unitConversion(data?.height)} M    
                                        </span>
                                        <span className="pokemon-info__about--header text-center">Height</span>
                                    </div>
                                </div>
                                <div className="pokemon-info__stats">
                                    <CardHeader className="pokemon-info__section--header text-center">Base Stats</CardHeader>
                                    <div className="pokemon-info__stats--wrapper">
                                        {data?.stats.map((item: any, index:any) => (
                                            <div 
                                                key={index}
                                                className="pokemon-info__stats--item"
                                            >
                                                <span>{formatStatName(item?.stat?.name)}</span>
                                                <Progress value={item?.base_stat}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )   
}

export default PokemonInfo
