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

import {
    titleCase
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
                <DrawerHeader className="pokemon-info__header">
                    <DrawerTitle className="pokemon-info__title">
                        <span className="pokemon-info__number">{`#${id}`}</span>
                        {titleCase(name)}
                        <div className="flex items-center justify-center pokemon-info__types">
                            {data?.types.map((item: any, index: any) => (
                                <span 
                                    key={index} 
                                    className={`pokemon-info__badge ${typeColors[item?.name]}`}
                                >
                                    {titleCase(item.name)}
                                </span>
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
            </DrawerContent>
        </Drawer>
    )
}

export default PokemonInfo
