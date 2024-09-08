/**
 * @file ModalReportsLists.js
 * @brief Exports the ModalReportsLists.js.
 */
import { useEffect } from "react"
import { Col, Dropdown, Menu } from "antd"
import { MoreVertical } from "assets/icons"
import { NextStepButton } from "components/Button/Button"
import { InfoWrapper } from "components/Info/Info"
import { CustomModalEdit, CustomTitleModalEdit } from "components/Modal/Modal"
import { format, parseISO } from "date-fns"
import {
    deleteReportApi,
    downloadReportApi,
    previewReport,
} from "hooks/apis/ReportApi"
import { useDispatch, useSelector } from "react-redux"
import { getReportsListFetch, setReportsNumber } from "reducers/project/projectReducer"
import { SwalWithBootstrapButtons } from "utils/Swal/SwalComponents"
import { t } from "utils/translationUtils";

import {
    FilesTableHeader,
    FilesTableSection,
    FilesTableWrapper,
    FileTableItem,
} from "./FilesTable"

/**
 * @var MoreOptionsMenu
 * @brief MoreOptionsMenu.
 */
const MoreOptionsMenu = ({ reportId, projectId }) => {
    const dispatch = useDispatch()
    const project= useSelector(state => state.projectReducer.project);
    const currentUser = useSelector((state) => state.projectReducer.currentUser)
    const onPreviewReport = (reportId) => {
        previewReport(reportId)
    }
    const onDeleteReportById = (reportId) => {
        SwalWithBootstrapButtons.fire({
            title: t('projectDashboard.reportListModal.delete.title'),
            text: t('projectDashboard.reportListModal.delete.text'),
            showCancelButton: true,
            cancelButtonColor: "#C91432",
            confirmButtonColor: "#10B581",
            confirmButtonText: t('projectDashboard.reportListModal.delete.confirmButton'),
            cancelButtonText: t('projectDashboard.reportListModal.delete.cancelButton'),
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReportApi(reportId).then((result) => {
                    if (result.status === 200) {
                        dispatch(getReportsListFetch(projectId))
                    }
                })
            }
        })
    }
    return (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault()
                                onPreviewReport(reportId)
                            }}
                        >
                            {t('projectDashboard.reportListModal.menu.preview')}
                        </a>
                    ),
                },
                {
                    type: "divider",
                },
                {
                    key: "2",
                    label: (
                        <a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault()
                                downloadReportApi(reportId,project.name)
                            }}
                        >
                            {t('projectDashboard.reportListModal.menu.download')}
                        </a>
                    ),
                },
                (currentUser.contributerId == project.chefId ?({
                  type: "divider",
                }):""),
                (currentUser.contributerId == project.chefId ?(
                  {
                    key: "3",
                    label:
                        (<a
                            href="/#"
                            onClick={(e) => {
                                e.preventDefault()
                                onDeleteReportById(reportId)
                            }}
                        >
                            {t('projectDashboard.reportListModal.menu.delete')}
                        </a>)
                  }):"")

            ]}
        />
    )
}

/**
 * @var ModalReportsList
 * @brief ModalReportsList.
 */
const ModalReportsList = ({
    isModalOpen,
    setIsModalOpen,
    title,
    type,
}) => {
    const projectId = useSelector(state => state.projectReducer.projectId)
    const reportsList = useSelector(state => state.projectReducer.reportsList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReportsListFetch(projectId))
    }, [projectId,dispatch])

    useEffect(() => {
        if (reportsList) {
            const reportsReduce = reportsList.reduce(
                (acc, report) => {
                    if (report.type === type) {
                        acc[`${type}`] += 1
                    }
                    return acc
                },
                {
                    [type]: 0,
                }
            )
            dispatch(setReportsNumber({
                type: type, data: reportsReduce[type]
            }))
        }
    }, [reportsList, type,dispatch])

    const handleOk = () => {
        setIsModalOpen(false)
    }

    return (
        <CustomModalEdit
            title={
                <CustomTitleModalEdit>
                    {t('projectDashboard.reportListModal.title')}{" "}({title})
                </CustomTitleModalEdit>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleOk}
            footer={
                <NextStepButton key="close" onClick={handleOk}>
                    {t('projectDashboard.reportListModal.closeButton')}
                </NextStepButton>
            }
            width="50%"
        >
            <p>
                {t('projectDashboard.reportListModal.description')}{" "}
                {title === "Plan d'exécution" ? "le " + title : "l'" + title}.
            </p>
            <FilesTableSection span={24} boxshadow="0">
                <FilesTableWrapper>
                    <FilesTableHeader>
                        <Col span={2}></Col>
                        <Col span={12}>
                            <InfoWrapper fontSize="12px">{t('projectDashboard.reportListModal.file')}</InfoWrapper>
                        </Col>
                        <Col span={2}>
                            <InfoWrapper fontSize="12px">{t('projectDashboard.reportListModal.iteration')}</InfoWrapper>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5}>
                            <InfoWrapper fontSize="12px">{t('projectDashboard.reportListModal.createdAt')}</InfoWrapper>
                        </Col>
                        <Col span={2}>
                            <InfoWrapper fontSize="12px">{t('projectDashboard.reportListModal.actions')}</InfoWrapper>
                        </Col>
                    </FilesTableHeader>
                    {reportsList
                        ?.filter((report) => {
                            return report.type === type
                        })
                        .map((report, index) => (
                            <FileTableItem key={report.id}>
                                <Col span={2}>{index + 1}</Col>
                                <Col span={12}>{report.title}</Col>
                                <Col span={2}>{report.iteration}</Col>
                                <Col span={1}></Col>
                                <Col span={5}>
                                    {format(parseISO(report.creationDate), "dd/MM/yyyy")}
                                </Col>
                                <Col span={2}>
                                    <Dropdown
                                        overlay={<MoreOptionsMenu
                                            reportId={report.id}
                                            projectId={projectId}
                                        />}
                                        placement="bottomRight"
                                    >
                                        <a href="/#" onClick={(e) => e.preventDefault()}>
                                            <MoreVertical />
                                        </a>
                                    </Dropdown>
                                </Col>
                            </FileTableItem>
                        ))}
                </FilesTableWrapper>
            </FilesTableSection>
            <FileTableItem></FileTableItem>
        </CustomModalEdit >
    )
}

export default ModalReportsList
