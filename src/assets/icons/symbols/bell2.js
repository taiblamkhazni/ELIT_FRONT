/**
 * @file bell2.js
 * @brief Ce module exporte un composant SVG représentant une icône bell2.
 */
const notyIconStyle = {
    position: "relative",
    display: "inline",
    cursor: "pointer",
}
const notyNumStyle = {
    position: "absolute",
    right: "-7px",
    bottom: "15px",
    backgroundColor: "rgb(29, 161, 242)",
    fontSize: "9px",
    color: "white",
    display: "inline",
    padding: "3px 5px",
    borderRadius: "20px",
    height: "20px",
    width: "20px",
    textAlign: "center",
}
export default function Bell2({ size, color, count, checked = false }) {
    return (
        <div>
            <div style={notyIconStyle}>
                {count > 0 ? <div style={notyNumStyle}>{count}</div> : null}

                <svg
                    viewBox="0 0 24 24"
                    className="r-hkyrab r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                    width={size}
                    height={size}
                    fill={color}
                >
                    <g>
                        <path
                            fillRule={checked ? "" : "evenodd"}
                            d="M12 3C10.4087 3 8.88258 3.63214 7.75736 4.75736C6.63214 5.88258 6 7.4087 6 9V14C6 14.7082 5.81218 15.3971 5.46411 16H18.5359C18.1878 15.3971 18 14.7082 18 14V9C18 7.4087 17.3679 5.88258 16.2426 4.75736C15.1174 3.63214 13.5913 3 12 3ZM22 16C21.4696 16 20.9609 15.7893 20.5858 15.4142C20.2107 15.0391 20 14.5304 20 14V9C20 6.87827 19.1571 4.84344 17.6569 3.34315C16.1566 1.84285 14.1217 1 12 1C9.87827 1 7.84344 1.84285 6.34315 3.34315C4.84285 4.84344 4 6.87827 4 9V14C4 14.5304 3.78929 15.0391 3.41421 15.4142C3.03914 15.7893 2.53043 16 2 16C1.44772 16 1 16.4477 1 17C1 17.5523 1.44772 18 2 18H22C22.5523 18 23 17.5523 23 17C23 16.4477 22.5523 16 22 16ZM9.76823 20.135C10.246 19.8579 10.8579 20.0205 11.135 20.4982C11.2229 20.6498 11.3491 20.7756 11.5009 20.863C11.6527 20.9504 11.8248 20.9965 12 20.9965C12.1752 20.9965 12.3473 20.9504 12.4991 20.863C12.6509 20.7756 12.7771 20.6498 12.865 20.4982C13.1421 20.0205 13.754 19.8579 14.2318 20.135C14.7095 20.4121 14.8721 21.024 14.595 21.5018C14.3313 21.9564 13.9528 22.3337 13.4973 22.5961C13.0419 22.8584 12.5256 22.9965 12 22.9965C11.4744 22.9965 10.9581 22.8584 10.5027 22.5961C10.0472 22.3337 9.66872 21.9564 9.405 21.5018C9.12788 21.024 9.2905 20.4121 9.76823 20.135Z"
                        />
                    </g>
                </svg>
            </div>
        </div>
    )
}
