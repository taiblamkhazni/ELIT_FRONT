/**
 * @file puce.js
 * @module puce
 * @description Ce module exporte un composant SVG représentant une icône puce.
 */
export default ({ fill, width, height }) => {
  const w = width; //16
  const h = height; //17
  const f = fill;
  return (
    <div className="icon">
      <svg
        width={w}
        height={h}
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8.5" r="8" fill={f} />
      </svg>
    </div>
  );
};
