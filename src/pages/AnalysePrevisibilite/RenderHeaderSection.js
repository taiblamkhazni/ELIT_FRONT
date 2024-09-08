import { Flex } from "antd";
import styled from "styled-components";

import { ExclamationCircleOutlined } from "@ant-design/icons";


/**
 * @brief Custom styled description component for the header section.
 */
const CustomDescription = styled.div`
  display: flex;
  flex-direction: row;

  padding:8px 24px;
  gap: 16px;

  background-color: #e2f0f9;
  border-radius: 4px;
  color: #1f1a28;

  font-size: 16px;
`;

/**
 * @brief Custom styled text component for the header section.
 */
const CustomText = styled.p`
  font-size: 18px;
`;


/**
 * @brief This component renders the header section of the analysis page.
 */
const RenderHeaderSection = ({ current, iteration2 }) => {
  if (current !== 0) return null;

  const content = iteration2
    ? "Iteration 2 de cette étape, vous pouvez éditer les réponses à la question ci-dessous (changer la note, votre choix de méthode ainsi qu’un commentaire explicatif)."
    : "Un échange collaboratif avec les parties prenantes du projet est organisé par le chef de projet. En fin de séance, ce dernier renseigne les champs ci-dessous qui permettront de déterminer si le groupe est prêt à converger vers une méthodologie de projet commune.";

  return (
    <Flex vertical>
      <CustomDescription>
        <ExclamationCircleOutlined
          style={{ fontSize: "2.5rem", color: "#0070AD" }}
        />
        <p>{content}</p>
      </CustomDescription>
      <CustomText>
        Dans quelle mesure estimez-vous que la prédiction de la méthodologie la
        plus adaptée est claire avec les données actuellement disponibles ?
        (Agile/Classique/Hybride)
      </CustomText>
    </Flex>
  );
};

export default RenderHeaderSection;
