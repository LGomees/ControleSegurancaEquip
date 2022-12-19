import ".././assets/header.css"
import imagemLogo from '../Logo.png'

export function Header() {
    return (
        <div className="headerContainer">
            <div className="headerImage">
                <img src={imagemLogo}/>
            </div>
        </div>
    );
}