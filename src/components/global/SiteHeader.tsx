import pokeball from '@/assets/logo-pokeball.svg';
import '@css/header.css';
import { Menu } from "lucide-react";
import { 
    Sheet, 
    SheetTrigger,
    SheetContent
} from '../ui/sheet';

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
                    <Sheet>
                        <SheetTrigger asChild className="header__menu--button">
                            <Menu />
                        </SheetTrigger>
                        <SheetContent className="header__menu--sidebar">
                            <div className="sidebar__group">
                                
                            </div>
                        </SheetContent>
                    </Sheet>   
                </div>
            </div>
        </header>
    )
}

export default SiteHeader
