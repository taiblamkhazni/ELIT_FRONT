/**
 * @file AnalysePrevisibiliteFeatures.js
 * @brief Ce fichier définit le composant AnalysePrevisibiliteFeatures.
 */
import { StructureGrid } from "components/Grid/Grid"
import { StepPageTitle } from "components/Title/Title"
import BreadCrumbDetailComponent from "pages/ProjectDetail/BreadCrumbDetailComponent"
import PropTypes from "prop-types"
import { t } from "utils/translationUtils";

import Steps from "./Steps"

/**
 * @brief AnalysePrevisibiliteFeatures : représente le composant de l'Choix de la méthodologie.
 * @param iteration2 L'itération 2.
 **/

const AnalysePrevisibilitePage = ({ iteration2 = false }) => {
  return (
    <>
      <BreadCrumbDetailComponent analyseType="manual" />
      {!iteration2 ? (
        <>
          <StepPageTitle
            StepNumber={"Etape 2"}
            StepName={t('projectDashboard.listStage.predictibility')}
            iteration2={iteration2}
          />
          <Steps iteration2={iteration2} />
        </>
      ) : (
        <>
          <StructureGrid
            leftChild={
              <StepPageTitle
                StepNumber={"BRAINSTORMING - Etape 2/2"}
                StepName={t('projectDashboard.listStage.predictibility')}
                iteration2={iteration2}
              />
            }
            rightChild={<></>}
            spanLeft={14}
            spanRight={5}
          />
          <Steps iteration2={iteration2} />
        </>
      )}
    </>
  );
}

AnalysePrevisibilitePage.propTypes = {
  iteration2: PropTypes.bool,
}

export default AnalysePrevisibilitePage
