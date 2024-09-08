/**
 * @file chevron-down.js
 * @brief Ce module exporte un composant SVG représentant une icône chevron-down.
 */
export default ({
    width = "24px",
    height = "24px",
}) => {
    return (
        <div id="image-choix-date" style={{ display: "flex", alignItems: "center" }} className="icon">
            <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="none"
                width={width}
                height={height}
                strokeWidth="1.1px"
                fillRule="evenodd"
                clipRule="evenodd"
            >
                <path d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" />
            </svg>
        </div>
    )
}
