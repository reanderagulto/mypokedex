import pokeball from '@/assets/logo-pokeball.svg';
import '@css/header.css';
import '@css/sidebar.css';
import { 
    Menu, 
    Search 
} from "lucide-react";
import { 
    Sheet, 
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '../ui/sheet';
import { 
    InputGroup, 
    InputGroupAddon, 
    InputGroupInput 
} from '../ui/input-group';
import PokemonFilterAbilities from '../Pokemon/PokemonFilterAbilities';
import PokemonFilterType from '../Pokemon/PokemonFilterType';

const SiteHeader = () => {
    return (
        <header>
            <div className="header__inner-wrapper">
                <div className="header__logo">
                    <img 
                        src={pokeball} 
                        alt="logo" 
                    />
                    Pokedex
                </div>
                <div className="header__menu">
                    <div className="header__search">
                        <InputGroup>
                            <InputGroupInput placeholder="Search" className="text-white placeholder:text-white" />
                            <InputGroupAddon>
                                <Search stroke="#fff"/>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild className="header__menu--button">
                            <Menu />
                        </SheetTrigger>
                        <SheetContent className="header__menu--sidebar">
                            <SheetHeader>
                                <SheetTitle>Filter Pokemon</SheetTitle>
                            </SheetHeader>
                            <div className="sidebar__group">
                                <div className="mb-4">
                                    <PokemonFilterAbilities />
                                </div>
                                <div className="mb-4">
                                    <PokemonFilterType />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>   
                </div>
            </div>
        </header>
    )
}

export default SiteHeader
