import pokeball from '@/assets/logo-pokeball.svg';
import '@css/header.css';

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
            </div>
        </header>
    )
}

export default SiteHeader
