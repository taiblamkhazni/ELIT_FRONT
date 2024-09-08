/**
 * @file FileInputForm.js
 * @brief This module exports the FileInputForm component.
 *
 * The FileInputForm component is designed for uploading and displaying files.
 * It utilizes a dropzone for file upload and displays uploaded files. This component
 * is adaptable for different contexts, such as project creation or general file addition.
 */
import { Space } from "antd";
import { UploadCloud} from "assets/icons";
import Upload from "assets/icons/symbols/upload";
import { TitleSection } from "components/Title/Title";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { t } from "utils/translationUtils";

import FileItem from "./FileItem";


/**
 * @brief Div Container component.
 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * @brief Div DropZoneFrame component.
*/
const DropZoneFrame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fff;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
  margin-bottom: 24px;
  &:hover {
    border: 2px dashed ${({ theme }) => theme.colors.secondaires.blue};
    transition: 0.2s;
  }
`;

/**
 * @brief CustomButton styled component.
 */
const CustomButton = styled.a`
  & {
    font-size: 15px;
    color: white;
    background-color: ${(props) =>
      props.backgroundColor
        ? props.backgroundColor
        : props.theme.colors.primaires.blue};
    padding: ${(props) => (props.padding ? props.padding : "7px 20px")};
    margin: ${(props) => (props.margin ? props.margin : "0")};
    border-radius: 4px;
  }

  &:hover {
    color: white;
    opacity: 0.8;
    transition: 0.15s;
  }
`;

/**
 * @brief FileInputForm Component
 *
 * This component provides a user interface for uploading files. It includes a dropzone
 * for dragging and dropping files or uploading via a file dialog. It supports specific
 * file formats and limits. The component also renders uploaded files using the FileItem component.
 *
 * @param {Object} props Component props
 * @param {Function} props.onChangeFileUpload Function to handle file upload changes
 * @param {Array} props.uploadedFiles Array of uploaded files
 * @param {Boolean} [props.projectCreation=true] Flag to determine if the form is used for project creation
 * @returns {React.Component} The FileInputForm component.
 */
const FileInputForm = ({
  onChangeFileUpload,
  uploadedFiles,
  projectCreation = true,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    // Disable click and keydown behavior
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    onDrop: onChangeFileUpload,
    onDropRejected: (fileRejections) => {
      onChangeFileUpload([], fileRejections);
    },
  });

  return (
    <Container>
      {projectCreation ? (
        <>
          <TitleSection id="impot-files-title">{t('projectCreation.fileInput.title')}{" "}*</TitleSection>
          <p id="import-file-description">
            {t('projectCreation.fileInput.description')}
          </p>
        </>
      ) : (
        <>
          <TitleSection>{t('projectCreation.fileInput.title2')}</TitleSection>
        </>
      )}

      <DropZoneFrame id="import-files-zone" {...getRootProps()} onClick={open}>
        <input id="import-files-frame" data-testid="dropzone" {...getInputProps()} />
        <UploadCloud alt="icon import de fichiers" id="import-files-cloud-svg" fill="#CCCCCC" />

        <h4 id="import-files-hearder-text" style={{marginBottom: '0px'}}>
          {t('projectCreation.fileInput.header')}
        </h4>
        <p id="import-files-format-pragraph">
        {t('projectCreation.fileInput.fileFormat')}
        </p>
        <CustomButton
          id="import-files-btn"
          padding={0}
          margin={0}
          backgroundColor={"#248BC0"}
          data-testid="custom-button"
        >
          <Space>
          <Upload alt="upload icon" fill="#FFF" />
            <span>{t('projectCreation.fileInput.importButton')}</span>
          </Space>
        </CustomButton>
      </DropZoneFrame>
      {uploadedFiles.length ? (
        <FileItem uploadedFiles={uploadedFiles} />
      ) : (
        <></>
      )}
    </Container>
  );
};

FileInputForm.propTypes = {
  onChangeFileUpload: PropTypes.func.isRequired,
  uploadedFiles: PropTypes.array.isRequired,
};

export default FileInputForm;
