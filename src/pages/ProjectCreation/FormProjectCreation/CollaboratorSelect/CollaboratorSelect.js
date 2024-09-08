/**
 * @file CollaboratorSelect.js
 * @brief This module exports the CollaboratorSelect component.
 *
 * The CollaboratorSelect component is used for managing collaborators in a project.
 * It allows users to search for and select collaborators, assign them roles and functions,
 * and view a list of already invited collaborators. The component uses various child components
 * like SearchInputColab, SelectRoleColab, and ColabsTable to provide its functionality.
 */
import { Row } from "antd";
import { BlockButton, NextStepButton } from "components/Button/Button";
import { StructureGrid } from "components/Grid/Grid";
import {ColabTitleSection, TitleSection} from "components/Title/Title";
import PropTypes from "prop-types";
import styled from "styled-components";
import { t } from "utils/translationUtils";

import ColabsTable from "./ColabsTable/ColabsTable";
import SearchInputColab from "./SearchInputColab/SearchInputColab";
import SelectFunctionColab from "./SelectRoleColab/SelectFunctionColab";
import SelectRoleColab from "./SelectRoleColab/SelectRoleColab";

/**
 * @brief InviterButtonWrapper styled component.
 */
const InviterButtonWrapper = styled.div`
  padding: 0;
  width: 100%;
  text-align: right;
  margin: 25px 0 25px 0;
`;

/**
 * @brief CollaboratorSelect component.
*/
const CollaboratorSelect = ({
  listSelected,
  role,
  func,
  handleInviterColabs,
  colabList,
  invitedColabs,
  isCDP,
  chefId,
  modeCreation,
}) => {
  return (
    <div>
      {isCDP.check ? (
        <>
          <>
            <TitleSection id="collaborators-title">{t('projectCreation.selectCollaborator.title')}</TitleSection>
            <p id="collaborators-description">
              {t('projectCreation.selectCollaborator.description')}
            </p>
            <br />
          </>
          <StructureGrid
            meduimCol={true}
            gutter={[16, 16]}
            spanLeft={8}
            leftChild={
              <Row justify="start">
                <ColabTitleSection id="collaborators-name">{t('projectCreation.selectCollaborator.searchTitle')}</ColabTitleSection>
                <SearchInputColab
                  placeHolderText={t('projectCreation.selectCollaborator.searchPlaceholder')}
                  listSelected={listSelected}
                  colabList={colabList}
                  invitedColabs={invitedColabs}
                />
              </Row>
            }
            spanMedium={8}
            MeduimChild={
              <Row style={{ height: "100%" }}>
                <ColabTitleSection id="collaborators-function">{t('projectCreation.selectCollaborator.function')}</ColabTitleSection>

                <SelectFunctionColab func={func} />
              </Row>
            }
            spanRight={8}
            rightChild={
              <Row justify="start" style={{ height: "100%" }}>
                <ColabTitleSection id="collaborators-rights">{t('projectCreation.selectCollaborator.rights')}</ColabTitleSection>

                <SelectRoleColab role={role} />
              </Row>
            }
          />
          <InviterButtonWrapper justify="end">
            {listSelected.length > 0 && role ? (
              <NextStepButton
                id="add-btn"
                onClick={() =>
                  handleInviterColabs(listSelected, role, func, modeCreation)
                }
              >
                {t('projectCreation.selectCollaborator.addCollabaratorButton')}
              </NextStepButton>
            ) : (
              <BlockButton reset>{t('projectCreation.selectCollaborator.addCollabaratorButton')}</BlockButton>
            )}
          </InviterButtonWrapper>
        </>
      ) : (
        <></>
      )}

      {invitedColabs.length ? (
        <ColabsTable colabs={invitedColabs} isCDP={isCDP} chefId={chefId} />
      ) : (
        <></>
      )}
    </div>
  );
};

CollaboratorSelect.propTypes = {
  listSelected: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  func: PropTypes.string.isRequired,
  handleInviterColabs: PropTypes.func.isRequired,
  colabList: PropTypes.array.isRequired,
  invitedColabs: PropTypes.array.isRequired,
};

export default CollaboratorSelect;
