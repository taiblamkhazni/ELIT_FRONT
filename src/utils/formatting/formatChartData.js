/**
 * @file formatChartData.js
 * @brief Fichier qui définit une fonction pour formater les données d'un graphique.
 */

/**
 * Cette fonction itère sur les entrées d'un objet de données et formate les valeurs numériques avec deux chiffres après la virgule.
 * 
 * @function formatChartData
 * @param {Object} data - L'objet de données à formater. Les valeurs numériques seront arrondies à deux chiffres après la virgule.
 * @returns {Object} L'objet de données avec des valeurs numériques formatées.
 */
export default (data) => {
    for (const [key, entry] of Object.entries(data)) {
        if (entry.value) {
            let formattedValue = +entry.value.toFixed(2)
            data[key].value = formattedValue
        }
    }
    return data
}