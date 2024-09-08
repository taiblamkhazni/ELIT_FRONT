/**
 * @file Information.js
 * @brief Contains the Information component that displays evaluation criteria details.
 */
import { memo } from "react";
import { DescriptionFeature } from "components/Description/Description"
import { TitleH3 } from "components/Title/Title"

/**
 * Information
 * @brief A React functional component that displays the title and description for evaluation criteria.
 * @returns {JSX.Element} Rendered component
 */
const Information = ({phaseName}) => {
    return (
        <>
            <TitleH3 margin="0 auto 1rem" fontSize="20px">Les critères d'évaluation : <span style={{fontWeight:'20'}}>{phaseName}</span></TitleH3>
            <DescriptionFeature
                content={"Les critères d'évaluations aident les décideurs à évaluer quantitativement l’ensemble des questions. Les collaborateurs peuvent aussi définir un poids pour chaque critère afin d'indiquer si un critère est prépondérant par rapport à un autre critère. "}
                margin={"0px"}
            />
        </>
    )
}

export default memo(Information);
