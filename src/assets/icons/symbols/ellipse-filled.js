/**
 * @file ellipse-filled.js
 * @brief Ce module exporte un composant SVG représentant une icône ellipse-filled.
 */
export default ({
    width = "16",
    height = "16",
    fill = "#E88774",
}) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }} className="icon">
            <svg width={width} height={height}>
                <circle
                    cx="8"
                    cy="8"
                    r="8"
                    fill={fill}
                />
            </svg>
        </div>
    )
}
