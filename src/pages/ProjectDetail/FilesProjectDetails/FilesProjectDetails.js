/**
 * @file FileProjectDetails.js component
 * @brief Project Files details elements
 *
 * This component displays a list of the file uplaoded in a project
 */

import { Button, Col, Flex, Row, Typography } from "antd";
import { Trash2 } from "assets/icons/index";
import { FileText } from "assets/icons/index";
import { format } from "date-fns";
import { deleteFileById } from "hooks/queries/queries";
import ModalAddFile from "pages/ProjectDashboard/ModalAddFile";
import { useDispatch, useSelector } from "react-redux";
import { getAttachementsProjectById } from "reducers/project/projectReducer";
import { base as graphiqueChart } from "theme/base";
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents";
import { t } from "utils/translationUtils";

const { Link } = Typography;

/**
 * @brief Function to confirm and delete a file by its ID
 * @param deleteFunc Function to delete the file
 * @param attachmentId ID of the attachment to be deleted
 */
const onDeleteFileById = async (deleteFile, attachementId, projectId) => {
  const result = await SwalWithBootstrapButtons.fire({
    title: t("projectDetails.delete.title"),
    text: t("projectDetails.delete.text"),
    showCancelButton: true,
    cancelButtonColor: "#C91432",
    confirmButtonColor: "#10B581",
    confirmButtonText: t("projectDetails.delete.confirmButton"),
    cancelButtonText: t("projectDetails.delete.cancelButton"),
    reverseButtons: true,
  });
  if (result.isConfirmed) {
    return deleteFile([attachementId, projectId]);
  }
};

/**
 * @brief Component for a button to delete a file
 * @param attachmentId ID of the attachment to be deleted
 * @return button
 */
const DeleteFileBtn = ({ projectId, attachementId, chefId }) => {
  /**
   * @brief Select the current user from the authentication reducer in the Redux store.
   */
  const curentUser = useSelector(
    (state) => state.authentificationReducer?.user
  );
  const { mutateAsync: deleteFile } = deleteFileById();
  const dispatch = useDispatch();

  return curentUser.id === chefId ? (
    <Button
      id="fichier-supprimer"
      type="text"
      style={{ padding: 0 }}
      onClick={(e) => {
        e.preventDefault();
        onDeleteFileById(deleteFile, attachementId, projectId).then((data) => {
          if (data?.status === 200)
            dispatch(getAttachementsProjectById(projectId));
        });
      }}
      block
    >
      <Trash2 alt="icon supprimer fichier" />
    </Button>
  ) : (
    ""
  );
};

/**
 * @brief Component display the list of attachements files in a project
 * @param attachments Information about attachments
 * @param projectId Id of the project
 */
const FilesProjectDetails = ({ attachments, projectId, chefId }) => {
  const titleDesign = {
    color: graphiqueChart.colors.secondaires.grisDark,
    fontSize: "12px",
    fontWeight: graphiqueChart.fontWeights.regular,
  };

  const textDesign = {
    color: graphiqueChart.colors.primaires.blueDark,
    fontSize: graphiqueChart.fontSizes.Deci,
    fontWeight: graphiqueChart.fontWeights.regular,
  };

  return (
    <Flex vertical>
      <Row
        justify="start"
        align="middle"
        style={{ paddingBottom: "20px", paddingRight: "10px" }}
      >
        <ModalAddFile chefId={chefId} />
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "44px",
          backgroundColor: graphiqueChart.backgrounds.white,
        }}
      >
        <Col span={22}>
          <Row justify="center" align="middle">
            <Col span={6} align="center"></Col>
            <Col
              id="fichier-document"
              span={6}
              align="center"
              style={titleDesign}
            >
              {"Document"}
            </Col>
            <Col
              id="fichier-date-creation"
              span={6}
              align="center"
              style={titleDesign}
            >
              {"Date de création"}
            </Col>
            <Col
              id="fichier-createur"
              span={6}
              align="center"
              style={titleDesign}
            >
              {"Créé par"}
            </Col>
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
      {attachments.map((attachment, index) => {
        return (
          <Row
            key={index}
            justify="center"
            align="middle"
            style={{
              borderTop: "1px solid #E9E9E9",
              backgroundColor: graphiqueChart.backgrounds.white,
            }}
          >
            <Col span={22} align="center">
              <Row
                justify="center"
                align="middle"
                style={{ marginBottom: "16px", marginTop: "16px" }}
              >
                <Col span={6} align="center">
                  <Link type="text" href={attachment?.filePath} block>
                    <FileText
                      alt="Icon fichier"
                      id="fichier-icone"
                      fill="#7A7A7A"
                    />
                  </Link>
                </Col>
                <Col span={6} align="center" style={textDesign}>
                  {attachment?.fileName}
                </Col>
                <Col span={6} align="center" tyle={textDesign}>
                  {format(new Date(attachment?.createdAt), "dd/MM/yyyy")}
                </Col>
                <Col span={6} align="center" tyle={textDesign}>
                  {attachment?.creatorFirstName +
                    " " +
                    attachment?.creatorLastName?.toUpperCase()}
                </Col>
              </Row>
            </Col>
            <Col span={2} align="center">
              <DeleteFileBtn
                projectId={projectId}
                attachementId={attachment?.attachmentId}
                chefId={chefId}
              />
            </Col>
          </Row>
        );
      })}
    </Flex>
  );
};

export default FilesProjectDetails;
