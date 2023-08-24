import ".././assets/header.css"
import imagemLogo from '../Logo.png'

export function Header() {

    function cleanData() {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <div className="headerContainer">
            <div className="headerImage">
                <a href='/' onClick={cleanData}><img src={imagemLogo}/></a>
            </div>
        </div>
    );
}