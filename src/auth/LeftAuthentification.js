/**
 * @file LeftAuthentification.js
 * @brief LeftAuthentification Module
 *
 * This module exports a function that renders LeftAuthentification component from
 * the AuthentificationFeatures package. It serves as the entry point for the
 * user authentication functionality in the application.
 */
import activationImage from "assets/images/activationImage.png";
import connexionImage from "assets/images/connexionImageMQ.png"
import forgotImage from "assets/images/forgotPasswordImg.png"
import inscriptionImage from "assets/images/inscriptionImage.png"

/**
 * @brief LeftAuthentification Page Component
 */
export default ({ type }) => {
    let imageSrc;
    let style = { width: '100%', height: '' }
    let id = "";
    switch (type) {
        case 'connexion':
            imageSrc = connexionImage;
            style.height = '100vh';
            id = "image-vertical"
            break;
        case 'inscription':
            imageSrc = inscriptionImage;
            style.height = '100vh';
            id="image-vertical"
            break;
        case 'activation':
            imageSrc = activationImage;
            style.height = '100vh'
            break;
        case 'forgot':
            imageSrc = forgotImage;
            style.height = '100vh';
            id="image-connexion"
            break;
        default:
            style.height = '100vh'
            imageSrc = connexionImage;
    }
    return (
        <div>
            <img alt={`Image gauche page ${type}`} id={id} src={imageSrc} style={{ width: `${style.width}`, objectFit: "cover", height: `${style.height}` }} />
        </div>
    )
}
