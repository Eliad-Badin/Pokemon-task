import pokedexLogo from '../assets/shared/pokedexLogo.png';
import "./Header.css"

function clickHandler(){
    
}

export default function Header(){
    return (
        <header className='header'>
            <div className='header-left'>
                <img src={pokedexLogo} alt='Pokedex Logo' className='header-logo'/>
            </div>
            <nav className='header-right'>
                <button onClick={clickHandler} className='nav-btn-active'>
                    Home
                </button>
                <button onClick={clickHandler} className='nav-btn'>
                    Favorites
                </button>

            </nav>
        </header>
    )
}