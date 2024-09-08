/**
 * @file FileItem.js
 * @brief This file defines Item and FileItem components.
 */
import React, { useCallback } from "react"
import { Eye, FileText, Trash2 } from "assets/icons"
import { HeaderTitle, TitleSection } from "components/Title/Title"
import format from "date-fns/format"
import useProjectCreationContext from "hooks/useProjectCreationContext/useProjectCreationContext"
import PropTypes from "prop-types"
import styled from "styled-components"
import { t } from "utils/translationUtils";

/**
 * @brief ItemRow component.
*/
const ItemRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`
/**
 * @brief Item component.
*/
const Item = ({ nameFile, date, file }) => {
  const { deleteFile } = useProjectCreationContext()
  const handleClickEye = useCallback(() => {
    // temporary element
    const anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement);
    anchorElement.style.display = 'none';
    const url = URL.createObjectURL(file);
    anchorElement.href = url;

    anchorElement.download = file.name || nameFile;
    anchorElement.click();

    //delete temporary element
    window.URL.revokeObjectURL(url);
  }, [file, nameFile])
  return (
    <ItemRow>
      <td style={{ width: "10%", textAlign: "center", padding: "10px 0px" }}>
        <FileText id="files-table-file" fill="#7A7A7A" />
      </td>
      <td id="files-table-names" style={{ width: "46%" }}>{nameFile}</td>
      {/* <td style={{ width: "20%" }}>{date}</td> */}
      <td style={{ width: "20%", padding: "10px 0px" }}>
        <div id="files-table-dates" style={{ display: "flex", justifyContent: "center" }}>
          {date}
        </div>
      </td>

      <td style={{ width: "12%", textAlign: "center", cursor: "pointer" }}>
        <Eye
          id="files-table-eye"
          onClick={handleClickEye}
        />
      </td>
      <td style={{ width: "12%", textAlign: "center", cursor: "pointer" }}>
        <Trash2 id="files-table-trush" onClick={() => deleteFile(nameFile)} />
      </td>
    </ItemRow>
  )
}

/**
 * @brief FileItem component.
*/
const FileItem = ({ uploadedFiles }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "76%", textAlign: "left" }} colSpan="3">
            <TitleSection id="count-files-table">
              {t('projectCreation.fileItem.title')}{uploadedFiles.length > 1 ? "s" : ""} (
              {uploadedFiles.length})
            </TitleSection>
          </th>
          <th style={{ width: "12%", textAlign: "center" }}>
            <HeaderTitle>{t('projectCreation.fileItem.open')}</HeaderTitle>
          </th>
          <th style={{ width: "12%", textAlign: "center" }}>
            <HeaderTitle>{t('projectCreation.fileItem.delete')}</HeaderTitle>
          </th>
        </tr>
      </thead>
      <tbody>
        {uploadedFiles.map((file) => {
          return (
            <Item
              nameFile={file.name}
              date={format(Date.now(), "dd/MM/yyyy")}
              key={file.path}
              file={file}
            />
          );
        })}
      </tbody>
    </table>
  );
}

Item.propTypes = {
  nameFile: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

FileItem.propTypes = {
  uploadedFiles: PropTypes.array.isRequired,
}

export default React.memo(FileItem)
