import translation from "../translations/translation.json";

/**
 * Translates a given key using a nested object structure.
 *
 * The key is a dot-separated string representing the path in the nested object.
 * If the key is not found, the original key is returned.
 *
 * @param {string} key - The dot-separated key string.
 * @returns {string|object} - The translation value or the original key if not found.
 */
export function t(key) {
  const keys = key.split('.');
  
  let value = translation;
  
   for (const k of keys) {
       if (!value.hasOwnProperty(k)) {
           return `${key}`;
       }
       value = value[k];
   }
  
   return value;
}
