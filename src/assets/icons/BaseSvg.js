/**
 * @file BaseSvg.test.js
 * @brief Ce fichier contient des tests pour le composant MenuTitle.
 */
/**

/**
 * @brief Encode une chaîne SVG donnée en URI
 *
 * @param {string} svg - La chaîne SVG à encoder
 * @returns {string} L'URI encodée
 */
export const encodeSVG = (svg: string) => encodeURI(svg).replace(/#/g, "%23");

/**
 * @typedef IconProps
 * @brief Type pour les propriétés d'une icône.
 *
 * @param {string} alt - Texte alternatif pour l'icône
 * @param {string} fill - Couleur de remplissage de l'icône
 * @param {string} height - Hauteur de l'icône
 * @param {object} style - Style de l'icône
 * @param {string} width - Largeur de l'icône
 * @param {string} svgClass - Classe CSS pour l'icône
 */
export type IconProps = {
  alt?: string;
  fill?: string;
  height?: string;
  style?: object;
  width?: string;
  svgClass?: string;
};

/**
 * @typedef BaseSvgProps
 * @brief Type pour les propriétés d'un SVG de base.
 *
 * @param {string} svg - Code SVG de l'image
 * @param {string} alt - Texte alternatif pour l'image SVG
 * @param {string} fill - Couleur de remplissage de l'image SVG
 * @param {string} height - Hauteur de l'image SVG
 * @param {string} size - Taille de l'image SVG
 * @param {object} style - Style de l'image SVG
 * @param {string} width - Largeur de l'image SVG
 * @param {string} color - Couleur de l'image SVG
 */
export type BaseSvgProps = {
  svg: string;
  alt?: string;
  fill?: string;
  height?: string;
  size?: string;
  style?: object;
  width?: string;
  color?: string;
};

/**
 * @function BaseSvg
 * @brief Composant BaseSvg
 *
 * @param {BaseSvgProps} param0 - Props du composant
 * @returns {JSX.Element} Le composant BaseSvg rendu
 */
export const BaseSvg = ({
  svg,
  size = "1em",
  height = size,
  width = size,
  style,
  color,
  alt = "",
  fill,
  ...props
}: BaseSvgProps) => (
  <img
    src={`data:image/svg+xml;utf8,${encodeSVG(svg)}`}
    style={{
      ...style,
      width,
      height,
      color,
      fill
    }}
    alt={alt}
    {...props}
  />
);
