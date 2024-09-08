/**
 * @file CreateProjectButton.js
 * @brief This module exports MenuTitle component
 */
import { Space } from "antd"; // Import de l'élément Space à partir de la bibliothèque Ant Design
import { Plus } from "assets/icons"; // Import de l'icône Plus à partir du répertoire des icônes
import PropTypes from "prop-types"; // Import de PropTypes pour la vérification des types de propriétés
import styled from "styled-components"; // Import de styled-components pour la définition des styles CSS dans les composants React

/**
 * @brief CustomButton : styled avec styled-components pour créer un bouton personnalisé.
 * @param props - Les propriétés passées au composant.
 * @param {string} props.padding - La valeur de remplissage du bouton.
 * @param {string} props.margin - La valeur de marge du bouton.
 * @param {string} props.backgroundColor - La couleur de fond du bouton.
 * @param {function} props.onClick - La fonction à exécuter lors du clic sur le bouton.
 * @param props.children - Les éléments enfants à afficher dans le bouton.
 */
export const CustomButton = styled.button`
  & {
    cursor: pointer;
    font-size: 15px;
    color: white;
    border: 0px;
    background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : props.theme.colors.primaires
        .blue}; // Couleur de fond par défaut du bouton
    padding: ${(props) =>
    props.padding
      ? props.padding
      : "7px 20px"}; // Remplissage par défaut du bouton
    margin: ${(props) =>
    props.margin ? props.margin : "0"}; // Marge par défaut du bouton
    border-radius: 4px; // Bordure arrondie du bouton
  }

  &:hover {
    color: white;
    opacity: 0.8; // Opacité réduite lors du survol du bouton
    transition: 0.15s; // Durée de transition lors du survol du bouton
  }
`;

/**
 * @brief CreateProjectButton : Composant CreateProjectButton utilisé pour afficher un bouton pour créer un projet avec une icône Plus.
 * @param props - Les propriétés passées au composant.
 * @param  props.onClick - La fonction à exécuter lors du clic sur le bouton.
 * @param  props.children - Les éléments enfants à afficher dans le bouton.
 * @param {number|string} [props.padding=0] - La valeur de remplissage du bouton (par défaut 0).
 * @param {number|string} [props.margin=0] - La valeur de marge du bouton (par défaut 0).
 * @param {string} [props.colorButton="#248BC0"] - La couleur de fond du bouton (par défaut "#248BC0").
 * @returns Le composant CreateProjectButton.
 */
export const CreateProjectButton = ({
  onClick,
  children,
  padding = 0,
  margin = 0,
  colorButton = "#248BC0",
}) => {
  return (
    <CustomButton
      id="button-creer-un-projet"
      onClick={onClick}
      padding={padding}
      margin={margin}
      backgroundColor={colorButton}
      data-testid="custom-button"
    >
      <Space>
        <Plus id="image-creer-projet" alt="plus icon" fill="#FFF" /> {/* Icône Plus */}
        <span id="texte-creer-un-projet">{children}</span> {/* Contenu du bouton */}
      </Space>
    </CustomButton>
  );
};

/**
 * @brief PropTypes du composant CreateProjectButton.
 */
CreateProjectButton.propTypes = {
  onClick: PropTypes.func.isRequired, // Fonction onClick requise
  children: PropTypes.node.isRequired, // Éléments enfants requis
};

export default CreateProjectButton; // Export par défaut du composant CreateProjectButton
