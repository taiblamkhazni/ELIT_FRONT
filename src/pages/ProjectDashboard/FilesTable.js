/**
 * @file FilesTable.js
 * @brief Exports the FilesTable.js.
 */
import { useState } from "react"
import { Col, Dropdown, Menu, Row } from "antd"
import { FileText, MoreVertical } from "assets/icons"
import { StructureGrid } from "components/Grid/Grid"
import { InfoWrapper } from "components/Info/Info"
import { TitleSection } from "components/Title/Title"
import { downloadFile, previewFile } from "hooks/apis/FileApi"
import { deleteFileById } from "hooks/queries/queries"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { base } from "theme/base"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
import { t } from "utils/translationUtils";

import ModalAddFile from "./ModalAddFile"
import ModalChangeNameFile from "./ModalChangeNameFile"

/**
 * @var FilesTableSection
 * @brief FilesTableSection.
 */
export const FilesTableSection = styled(Col)`
  margin-top: 24px;
  padding: 16px 21px;
  background: white;
  box-shadow: ${(props) =>
    props.boxshadow ? props.boxshadow : "0px 2px 5px 0px rgba(0, 0, 0, 0.1)"};
  border-radius: ${(props) => (props.boxradius ? props.boxradius : "4px")};
`
/**
 * @brief FilesTableWrapper : FilesTableWrapper.
 */
export const FilesTableWrapper = styled.div`
  margin-top: 30px;
`
/**
 * @brief FilesTableHeader.
 */
export const FilesTableHeader = styled(Row)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaires.grisDark};
  padding: 0px 4px 8px 4px;
`
/**
 * @brief FileTableItem.
 */
export const FileTableItem = styled(Row)`
  padding: 14px 4px;
  color: ${({ theme }) => theme.colors.primaires.blueDark};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaires.grisLight};
`
/**
 * @brief AddSection.
 */
export const AddSection = styled.div`
  color: #248bc0;
  align-items: center;
  display: flex;
  cursor: pointer;
  border: 1px solid;
  height: 30px;
`
/**
 * @brief onPreviewFile.
 * @param projectId
 * @param attachementId
 */
const onPreviewFile = (projectId, attachementId) => {
  previewFile(projectId, attachementId)
}
/**
 * @brief onDeleteFileById.
 * @param deleteFunc
 * @param attachementId
 */
const onDeleteFileById = (deleteFunc, attachementId) => {
  SwalWithBootstrapButtons.fire({
    title: t('projectDashboard.fileTable.delete.title'),
    text: t('projectDashboard.fileTable.delete.text'),
    showCancelButton: true,
    cancelButtonColor: "#C91432",
    confirmButtonColor: "#10B581",
    confirmButtonText: t('projectDashboard.fileTable.delete.confirmButton'),
    cancelButtonText: t('projectDashboard.fileTable.delete.cancelButton'),
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteFunc(attachementId)
    }
  })
}
/**
 * @brief MoreOptionsMenu.
 * @param projectId
 * @param attachementId
 * @param fileName
 * @param setEnableModelFileName
 */
const MoreOptionsMenu = ({
  projectId,
  attachementId,
  fileName,
  setEnableModelFileName,
}) => {
  const { mutate: deleteFile } = deleteFileById()

  return (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onPreviewFile(projectId, attachementId);
              }}
            >
              {t('projectDashboard.fileTable.moreOptions.open')}
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setEnableModelFileName(true);
              }}
            >
              {t('projectDashboard.fileTable.moreOptions.rename')}
            </a>
          ),
        },
        {
          key: "3",
          label: (
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {t('projectDashboard.fileTable.moreOptions.share')}
            </a>
          ),
        },
        {
          key: "4",
          label: (
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                downloadFile(projectId, attachementId, fileName);
              }}
            >
              {t('projectDashboard.fileTable.moreOptions.download')}
            </a>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "5",
          label: (
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                onDeleteFileById(deleteFile, attachementId);
              }}
            >
              {t('projectDashboard.fileTable.moreOptions.delete')}
            </a>
          ),
        },
      ]}
    />
  );
}

/**
 * @brief FileTables.
 **/
const FileTables = () => {
  const attachments = useSelector((state) => state.projectReducer.attachments)
  const projectId = useSelector(state => state.projectReducer.projectId)
  const [isModalOpenModalNameFile, setIsModalOpenModalNameFile] =
    useState(false)

  return (
    <FilesTableSection span={24}>
      <StructureGrid
        leftChild={
          <Row justify="start">
            <TitleSection>
              Fichier{attachments.length > 1 ? "s" : ""} associé
              {attachments.length > 1 ? "s" : ""} à votre projet (
              {attachments.length})
            </TitleSection>
          </Row>
        }
        spanLeft={16}
        rightChild={<Row justify="end">{<ModalAddFile />}</Row>}
        spanRight={8}
      />
      <FilesTableWrapper>
        <FilesTableHeader>
          <Col span={2}></Col>
          <Col span={7}>
            <InfoWrapper fontSize="12px">{t('projectDashboard.fileTable.file')}</InfoWrapper>
          </Col>
          <Col span={7}>
            {" "}
            <InfoWrapper fontSize="12px">{t('projectDashboard.fileTable.createdAt')}</InfoWrapper>
          </Col>
          <Col span={6}>
            <InfoWrapper fontSize="12px">{t('projectDashboard.fileTable.editedBy')}</InfoWrapper>
          </Col>
          <Col span={2}>
            <InfoWrapper fontSize="12px">{t('projectDashboard.fileTable.actions')}</InfoWrapper>
          </Col>
        </FilesTableHeader>
        {attachments.length ? (
          attachments?.map((a) => {
            return (
              <div key={a.key}>
                <ModalChangeNameFile
                  isModalOpen={isModalOpenModalNameFile}
                  setIsModalOpen={setIsModalOpenModalNameFile}
                  attachementId={a.attachmentId}
                  fileName={a.fileName}
                />
                <FileTableItem>
                  <Col span={2}>
                    <FileText fill={base.colors.secondaires.grisDark} />
                  </Col>
                  <Col span={7}>{a.fileName}</Col>
                  <Col span={7}>10/05/2022</Col>
                  <Col span={6}>Eva ABADIE</Col>
                  <Col span={2}>
                    <Dropdown
                      overlay={
                        <MoreOptionsMenu
                          projectId={projectId}
                          attachementId={a.attachmentId}
                          fileName={a.fileName}
                          setEnableModelFileName={setIsModalOpenModalNameFile}
                        />
                      }
                      placement="bottomRight"
                    >
                      <a href="/#" onClick={(e) => e.preventDefault()}>
                        <MoreVertical />
                      </a>
                    </Dropdown>
                  </Col>
                </FileTableItem>
              </div>
            );
          })
        ) : (
          <Row justify="center" style={{ marginTop: "10px" }}>
            <InfoWrapper>{t('projectDashboard.fileTable.noFile')}</InfoWrapper>
          </Row>
        )}
      </FilesTableWrapper>
    </FilesTableSection>
  );
}

export default FileTables
