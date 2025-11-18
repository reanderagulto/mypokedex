import type { 
    PokemonInfoProps 
} from '@/types/pokemon.type';

import {
    typeColors
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
    unitConversion
} from '@lib/utils';

const PokemonInfo = ({
    id = '', 
    name = '', 
    image = '',
    data,
    isOpen = false, 
    setOpen
 }: PokemonInfoProps) => {

    return (
        <Drawer 
            open={isOpen} 
            onOpenChange={setOpen}
        >
            <DrawerContent
                className={`pokemon-info`}
            >
                <ScrollArea className="h-full border-0">
                    <DrawerHeader className="pokemon-info__header">
                        <DrawerTitle className="pokemon-info__title">
                            <span className="pokemon-info__number">{`#${id}`}</span>
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
                    <Card className="pokemon-info__content border-0">
                        <CardHeader className="text-center">About</CardHeader>
                        <CardContent className="pokemon-info__inner-content">
                            <div className="flex items-stretch justify-center gap-10 pokemon-info__attribute--list">
                                <div className="flex flex-col gap-3 justify-center items-center pokemon-info__attribute">
                                    <span className="flex items-center gap-2">
                                        <img src={IconWeight} alt="Weight Icon" />
                                        {unitConversion(data?.weight)} KG
                                    </span>
                                    <span className="text-center">Weight</span>
                                </div>
                                <div className="flex flex-col gap-3 justify-center items-center pokemon-info__attribute">
                                    <span className="flex items-center gap-2">
                                        <img src={IconHeight} alt="Height Icon" />
                                        {unitConversion(data?.height)} M
                                    </span>
                                    <span className="text-center">Height</span>
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
