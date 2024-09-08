/**
 * @file ContributorsProjectDetails.js component
 * @brief Contributors details elements
 *
 * This component displays a list of the contributors of the project
 */
import { useContext } from "react";
import { Button, Col, Flex, Row } from "antd";
import { Trash2 } from "assets/icons";
import UserAvatar from "components/Avatar/UserAvatar";
import { ProjectCreationContext } from "context/ProjectCreationProvider";
import ModalAddContributor from "pages/ProjectDashboard/ModalAddContributor";
import { useSelector } from "react-redux";
import { base as graphiqueCharte } from "theme/base";
import { t } from "utils/translationUtils";

/**
 * @brief Component for a button to delete a contributor
 * @param collabId ID of the collaborator to be deleted
 */
const DeleteContrBtn = ({ collabId, chefId }) => {
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector(
    (state) => state.authentificationReducer?.user
  );

  const { deleteColabById } = useContext(ProjectCreationContext);

  return curentUser.id === chefId ? (
    <Button
      type="text"
      style={{ padding: 0 }}
      block
      onClick={() => {
        deleteColabById(collabId);
      }}
    >
      <Trash2 />
    </Button>
  ) : (
    ""
  );
};

/**
 * @brief Component display the list of contributors in a project
 * @param contributors Information about the contributor
 * @param chefId ChefId of the contributor who created the project
 */
const ContributorsProjectDetails = ({ contributors, chefId }) => {
  const titleDesign = {
    color: graphiqueCharte.colors.secondaires.grisDark,
    fontSize: "12px",
    fontWeight: graphiqueCharte.fontWeights.regular,
  };
  const textDesign = {
    color: graphiqueCharte.colors.primaires.blueDark,
    fontSize: graphiqueCharte.fontSizes.Deci,
    fontWeight: graphiqueCharte.fontWeights.regular,
  };

  return (
    <Flex vertical>
      <Row
        justify="start"
        align="middle"
        style={{ paddingBottom: "20px", paddingRight: "10px" }}
      >
        <ModalAddContributor collaborateurs={contributors} chefId={chefId} />
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "44px",
          backgroundColor: graphiqueCharte.backgrounds.white,
        }}
      >
        <Col span={22}>
          <Row justify="center" align="middle">
            <Col span={2} align="center"></Col>
            <Col
              id="nom-collaborateur"
              span={5}
              align="center"
              style={titleDesign}
            >
              {t("projectDetails.contributors.lastname")}
            </Col>
            <Col
              id="prenom-collaborateur"
              span={5}
              align="center"
              style={titleDesign}
            >
              {t("projectDetails.contributors.firstname")}
            </Col>
            <Col
              id="fonction-collaborateur"
              span={5}
              align="center"
              style={titleDesign}
            >
              {t("projectDetails.contributors.function")}
            </Col>
            <Col
              id="role-collaborateur"
              span={5}
              align="center"
              style={titleDesign}
            >
              {t("projectDetails.contributors.role")}
            </Col>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
      {contributors.map((contributor) => {
        return (
          <Row
            key={contributor?.contributerId}
            justify="center"
            align="middle"
            style={{
              borderTop: "1px solid #E9E9E9",
              backgroundColor: graphiqueCharte.backgrounds.white,
            }}
          >
            <Col span={22} align="center">
              <Row
                justify="center"
                align="middle"
                style={{ marginBottom: "16px", marginTop: "16px" }}
              >
                <Col id="avatar-collaborateur" span={2} align="center">
                  <UserAvatar
                    userId={contributor?.contributerId}
                    userName={contributor?.firstName}
                  />
                </Col>
                <Col span={5} align="center" style={textDesign}>
                  {contributor?.lastName}
                </Col>
                <Col span={5} align="center" style={textDesign}>
                  {contributor?.firstName}
                </Col>
                <Col span={5} align="center" style={textDesign}>
                  {contributor?.func !== null
                    ? contributor?.func?.charAt(0) +
                      contributor?.func?.slice(1)?.toLowerCase()
                    : ""}
                </Col>
                <Col span={5} align="center" style={textDesign}>
                  {contributor?.contributerId == chefId
                    ? "Createur"
                    : contributor?.role == "Contributeur"
                    ? "Contributeur"
                    : "Observateur"}
                </Col>
              </Row>
            </Col>
            <Col span={2} align="center">
              {contributor?.contributerId !== chefId ? (
                <DeleteContrBtn
                  collabId={contributor?.contributerId}
                  chefId={chefId}
                />
              ) : (
                ""
              )}
            </Col>
          </Row>
        );
      })}
    </Flex>
  );
};

export default ContributorsProjectDetails;
