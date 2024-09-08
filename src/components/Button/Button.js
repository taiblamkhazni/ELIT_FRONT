/**
 * @file Button.js
 * @brief Ce fichier définit plusieurs composants de boutons.
 * @details Chaque composant est un bouton avec des styles spécifiques.
 */
import styled from "styled-components"

/**
 * outline button composant
 */
export const ButtonNoBackground = styled.button`
  height: ${(props) => (props.height ? props.height : "initial")};
  width: ${(props) => (props.width ? props.width : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  border: 1px solid
    ${(props) =>
    // optionnalColor permet de changer de manière globale la couleur du texte et de la bordure du bouton.
    // Cependant s'il y a une nécessité de différencier la couleur du texte et de la bordure, on peut utiliser borderOptionalColor en plus.
    props.optionalColor
      ? props.borderOptionalColor
        ? props.borderOptionalColor
        : props.optionalColor
      : props.theme.colors.primaires.blue};
  color: ${(props) =>
    props.optionalColor
      ? props.optionalColor
      : props.theme.colors.primaires.blue};
  // Définit la couleur de fond du bouton à blanc.
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};;
  /**
 * @brief Applique une marge autour du bouton. Si une marge est spécifiée via les props, elle sera utilisée, sinon, la marge par défaut sera "0px 12px 10px 12px".
 */
  margin: ${(props) => (props.margin ? props.margin : "0px 12px 10px 12px")};
  padding: ${(props) => (props.padding ? props.padding : "8px 24px")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    border: 1px solid
      ${(props) =>
    props.optionalColor
      ? props.theme.colors.secondaires.vertBlue
      : props.theme.colors.secondaires.blue};
    color: ${(props) =>
    props.optionalColor
      ? props.theme.colors.secondaires.vertBlue
      : props.theme.colors.secondaires.blue};
    transition: 0.15s;
  }
  & .icon {
    fill: ${(props) => (props.colorIcon ? props.colorIcon : "")};
  }
  &:hover .icon {
    fill: ${(props) => (props.hoverColorIcon ? props.hoverColorIcon : "")};
    transition: 0.15s;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6; // Pour donner un effet de bouton désactivé
    border: 1px solid ${(props) => props.theme.colors.gris}; // Couleur de bordure grisée
    color: ${(props) => props.theme.colors.gris}; // Couleur du texte grisée
  }
`;

/**
 * primary button composant
 */
export const NextStepButton = styled.button`
  border: 1px solid ${(props) => props.disabled ? '#E9E9E9' : (props.background ? props.background : props.theme.colors.primaires.blue)};
  color: ${(props) => props.disabled ? '#6A6A6A' : 'white'};
  white-space: nowrap;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  opacity: ${(props) => props.disabled ? '0.5' : '1'};
  background-color: ${(props) => props.disabled ? '#E9E9E9' : (props.background ? props.background : props.theme.colors.primaires.blue)};
  margin: ${(props) => (props.margin ? props.margin : "0 0 1rem 0")};
  padding: ${(props) => (props.padding ? props.padding : "8px 24px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  border-radius: 4px;
  width: ${(props) => (props.width ? props.width : "")};
  &:hover {
    background-color: ${({ theme, disabled }) => disabled ? '#E9E9E9' : theme.colors.secondaires.blue};
    border: 1px solid ${({ theme, disabled }) => disabled ? '#E9E9E9' : theme.colors.secondaires.blue};
    transition: ${({ disabled }) => disabled ? 'none' : '0.15s'};
    cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  }
`

/**
 * block level button composant
 */
export const BlockButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.secondaires.grisLight};
  color: ${({ theme }) => theme.colors.secondaires.grisDark};
  background-color: ${({ theme }) => theme.colors.secondaires.grisLight};
  white-space: nowrap;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: not-allowed;
  width: ${(props) => (props.width ? props.width : "")};

  ${props => {
    let marginValue = "0px 12px 10px 12px";
    if (props.reset) {
      marginValue = "0px";
    } else if (props.margin) {
      marginValue = props.margin;
    }
    return `margin: ${marginValue};`;
  }
  }
`;

/**
 * link button composant
 */
export const LinkButton = styled.button`
  color: ${({ theme }) => theme.colors.primaires.blue};
  border: none;
  background-color: #fff;
`
