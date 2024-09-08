/**
 * @file square-minus.js
 * @module square-minus
 * @description Ce module exporte un composant SVG représentant une icône square-minus.
 */
export default ({ size }) => {
    const width = size
    const height = size
    return (
        <div className="icon" >
            <svg
                viewBox="0 0 24 24"
                width={width}
                height={height}
                fillRule="evenodd"
                clipRule="evenodd"
            >
                <path d="M5 4C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5ZM2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5Z"/>
                <path d="M7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z"/>
            </svg>
        </div>
    )
}
