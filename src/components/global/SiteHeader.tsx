import pokeball from '@/assets/logo-pokeball.svg';
import '@css/header.css';

const SiteHeader = () => {
    return (
        <header className="bg-red-500">
            <div className="header__inner-wrapper">
                <img 
                    src={pokeball} 
                    alt="logo" 
                />
                Pokedex
            </div>
        </header>
    )
}

export default SiteHeader
