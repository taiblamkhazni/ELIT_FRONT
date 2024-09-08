/**
 * @file ProjectFilesUI.js
 * @brief Exports the ProjectFilesUI.js.
 */
import { Col, Row } from "antd"
import { FileText } from "assets/icons"
import { NotifyLi } from "components/Li/Li"
import { CustomUl } from "components/List/List"
import { TableWrapper } from "components/Table/Table"
import { TitleSection } from "components/Title/Title"

/**
 * @var default
 * @brief default.
 */
export default ({ title, files }) => {
    return (
        <TableWrapper>
            <TitleSection margin="0px">{title}</TitleSection>
            <CustomUl fontSize="12px" margin="16px 0px 0px 0px">
                {files.map((file) => (
                    <NotifyLi key={file.id}>
                        <Row gutter={[24, 0]}>
                            <Col span={5}>
                                <Row justify="start">
                                    <FileText style={{ margin: "0 .5rem" }} fill="#7A7A7A" />
                                </Row>
                            </Col>
                            <Row>{file.fileName}</Row>
                        </Row>
                    </NotifyLi>
                ))}
            </CustomUl>
        </TableWrapper>
    )
}
