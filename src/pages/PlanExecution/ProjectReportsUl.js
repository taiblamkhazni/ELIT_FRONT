/**
 * @file ProjectReportsUI.js
 * @brief Exports the ProjectReportsUI.js.
 */
import { useCallback, useState } from "react"
import { Pdf } from "assets/icons"
import TYPES from "common/analyseTypes"
import { ButtonNoBackground } from "components/Button/Button"
import { InfoWrapper } from "components/Info/Info"
import { CustomUl } from "components/List/List"
import { TableWrapper } from "components/Table/Table"
import { TitleSection } from "components/Title/Title"
import ModalReportsList from "pages/ProjectDashboard/ModalReportsList"
import { moreOneReports } from "pages/ProjectDashboard/StageBase"
import { useSelector } from "react-redux"

/**
 * @var default
 * @brief default.
 */
export default ({ reports }) => {
    const [isModalOpenMulti, setIsModalOpenMulti] = useState(false)
    const [isModalOpenPrevi, setIsModalOpenPrevi] = useState(false)
    const reportsNumber = useSelector(
        (state) => state.projectReducer.reportsNumber
    )

    const handleClickMulti = useCallback(() => {
        setIsModalOpenMulti(true)
    }, [])

    const handleClickPrevi = useCallback(() => {
        setIsModalOpenPrevi(true)
    }, [])

    return (
        <TableWrapper>
            <TitleSection margin="0px">Rapports</TitleSection>
            <CustomUl style={{ textAlign: "left" }}>
                {reports.map((report) => (
                    <li key={report.id} style={{ margin: "1.5rem 0" }}>
                        <InfoWrapper fontSize="16px" margin="0 0 .5rem 0">
                            {report.step}
                        </InfoWrapper>
                        <>
                            {report.type === "multicriteria_report" ? (
                                <>
                                    <ModalReportsList
                                        isModalOpen={isModalOpenMulti}
                                        setIsModalOpen={setIsModalOpenMulti}
                                        title={report.step}
                                        type={report.type}
                                        key={report.id}
                                    />
                                    <ButtonNoBackground
                                        margin="6px auto"
                                        width="90%"
                                        onClick={handleClickMulti}
                                    >
                                        Voir le{moreOneReports(reportsNumber[TYPES.multicriteria])}{" "}
                                        rapport{moreOneReports(reportsNumber[TYPES.multicriteria])}{" "}
                                        ({reportsNumber[TYPES.multicriteria]}) <Pdf />
                                    </ButtonNoBackground>
                                </>
                            ) : (
                                <>
                                    <ModalReportsList
                                        isModalOpen={isModalOpenPrevi}
                                        setIsModalOpen={setIsModalOpenPrevi}
                                        title={report.step}
                                        type={report.type}
                                        key={report.id}
                                    />
                                    <ButtonNoBackground
                                        margin="6px auto"
                                        width="90%"
                                        onClick={handleClickPrevi}
                                    >
                                        Voir le{moreOneReports(reportsNumber[TYPES.predictibility])}{" "}
                                        rapport{moreOneReports(reportsNumber[TYPES.predictibility])}{" "}
                                        ({reportsNumber[TYPES.predictibility]}) <Pdf />
                                    </ButtonNoBackground>
                                </>
                            )}
                        </>
                    </li>
                ))}
            </CustomUl>
        </TableWrapper>
    )
}
