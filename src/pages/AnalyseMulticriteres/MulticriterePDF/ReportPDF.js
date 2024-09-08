/**
 * @file ReportPDF.js
 * @brief Ce fichier contient :
 * Le composant  rapport PDF de l'analyse Multicraitère avec des sous composant: Titre, CircleRatee et DisplayImages.
 * L'enregistrement des différentes variantes de la police Roboto pour utilisation dans le composant.
 * Le styles pour le composant.
 */
import RobotoBold from "assets/fonts/Roboto/Roboto-Bold.woff";
import RobotoItalic from "assets/fonts/Roboto/Roboto-Italic.woff";
import RobotoRegular from "assets/fonts/Roboto/Roboto-Regular.woff";
import icon from "assets/images/iconPDF.png";
import PropTypes from "prop-types";
import FirstPageReportPDF from "shared/newReportsTemplate/FirstPageReportPDF";

/**
 * @external @react-pdf/renderer
 */
import {
    Circle,
    Document,
    Font,
    Image,
    Page,
    StyleSheet,
    Svg,
    Text,
    View,
} from "@react-pdf/renderer";

/**
 * Header component for the report.
 * @param {string} titleTag - The main title to be displayed in the header.
 * @param {string} lowerTitleTag - The subtitle to be displayed below the main title.
 */

export const Titre = ({ titleTag = "", lowerTitleTag = "" }) => {
    return (
        <View style={{ marginBottom: "10px" }}>
            <View style={styles.header}>
                <Image src={icon} style={styles.logo} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.firstTitle}>
                        Rapport d'analyse collaborative
                    </Text>
                    <Text>
                        <Text style={styles.spanSubtitle}>Étape 1 : </Text>
                        <Text style={styles.analysisText}>Analyse multicritères</Text>
                    </Text>
                </View>
            </View>

            <Text style={styles.tag}>{titleTag}</Text>
            <Text style={styles.lowerTag}>{lowerTitleTag}</Text>
        </View>
    );
};

Titre.propTypes = {
    titleTag: PropTypes.string,
    lowerTitleTag: PropTypes.string,
};

/**
 * Component to display the rate in a circular format.
 * @param {number} cx - The x-axis coordinate of the circle's center.
 * @param {string} stroke - The color of the stroke.
 */
export const CircleRate = ({ cx, stroke }) => {
    return (
        <Circle
            cx={cx}
            cy={8}
            r={7}
            stroke={stroke === "none" ? "#197CAD" : stroke}
            strokeWidth="2"
            style={{ fill: stroke === "none" ? "#197CAD" : "none" }}
        />
    );
};
/**
 * Component to display various images like bar chart and column charts.
 */
const DisplayImages = ({ props }) => {
    return (
        <View style={styles.baseContainer}>
            <View style={styles.resultContainer}>
                <Text style={styles.chartTitleResults}>Résultat</Text>
                <Image src={props.bar} />
            </View>
            <View style={styles.chartContainer}>
                <View style={styles.columnChartContainer}>
                    <Text style={styles.chartTitle}>Spécificité</Text>
                    <Image src={props.specificite} style={styles.chartColumn} />
                </View>
                <View style={styles.columnChartContainer}>
                    <Text style={styles.chartTitle}>Certitude</Text>
                    <Image src={props.certitude} style={styles.chartColumn} />
                </View>
            </View>
            <View style={styles.columnChartContainerAlone}>
                <Text style={styles.chartTitle}>Manoeuvrabilité</Text>
                <Image src={props.manoeuvrabilite} style={styles.chartColumn} />
            </View>
        </View>
    );
};
/**
 * Component to render images based on the provided step name.
 */
const ImageRenderer = ({ stepName, props }) => {
    let imageWeightStep = null;
    switch (stepName) {
        case "Spécificité":
            imageWeightStep = props.specificiteWeightBase64;
            break;
        case "Certitude":
            imageWeightStep = props.certitudeWeightBase64;
            break;
        case "Manoeuvrabilité":
            imageWeightStep = props.manoeuvrabiliteWeightBase64;
            break;
        default:
            break;
    }

    return (
        imageWeightStep && (
            <Image
                src={imageWeightStep}
                style={{
                    width: 200,
                    height: 100,
                    margin: "0 auto",
                    marginVertical: 10,
                }}
            />
        )
    );
};
/**
 * Component to render a list of questions with their associated ratings.
 */
const QuestionRenderer = ({ questions, stepRef }) => {
    return [...questions]
        .sort((a, b) => {
            const idA = a?.questionRef.split("_");
            const idB = b?.questionRef.split("_");
            return idA[1] > idB[1] ? 1 : -1;
        })
        .map((question, index) => {
            const questionNumber = `${stepRef}.${index + 1}`;
            return (
                <View key={question.questionRef}>
                    <Text style={styles.questionText}>
                        <Text
                            style={styles.preQuestionText}
                        >{`Question ${questionNumber}:`}</Text>{" "}
                        {`${question.questionText}`}
                    </Text>
                    <Text style={styles.answerText}>
                        <Text style={styles.preAnswerText}>Réponse: </Text>
                        {`${question.answerText}`}
                    </Text>
                    {/* Criterias */}
                    <View style={styles.criteriaContainer}>
                        {[...question.criterias]
                            .sort((a, b) => {
                                if (a.criteriaName < b.criteriaName) {
                                    return -1;
                                }
                                if (a.criteriaName > b.criteriaName) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map((criteria) => {
                                return (
                                    <View key={criteria.criteriaName} style={styles.criteriaItem}>
                                        <Text style={styles.rating}>{criteria.criteriaName}</Text>
                                        <Svg viewBox="0 0 40 24" style={styles.svg}>
                                            <CircleRate
                                                cx={-24}
                                                stroke={
                                                    criteria.criteriaValue >= 1 ? "none" : "#CCCCCC"
                                                }
                                            />
                                            <CircleRate
                                                cx={-3}
                                                stroke={
                                                    criteria.criteriaValue >= 2 ? "none" : "#CCCCCC"
                                                }
                                            />
                                            <CircleRate
                                                cx={18}
                                                stroke={
                                                    criteria.criteriaValue >= 3 ? "none" : "#CCCCCC"
                                                }
                                            />
                                            <CircleRate
                                                cx={39}
                                                stroke={
                                                    criteria.criteriaValue >= 4 ? "none" : "#CCCCCC"
                                                }
                                            />
                                            <CircleRate
                                                cx={60}
                                                stroke={
                                                    criteria.criteriaValue === 5 ? "none" : "#CCCCCC"
                                                }
                                            />
                                        </Svg>
                                    </View>
                                );
                            })}
                    </View>
                </View>
            );
        });
};

const MyDocument = ({
    project,
    analyseMulticriteresResult,
    avatarsList,
    props,
}) => (
    <Document title={project?.name}>
        <FirstPageReportPDF
            project={project}
            DisplayImages={<DisplayImages props={props} />}
            subtitle="Analyse multicritères"
            titre={<Titre />}
            avatarsList={avatarsList}
        />
        {/* Steps */}
        {[...analyseMulticriteresResult.formSteps]
            .sort((a, b) => (a?.stepRef > b?.stepRef ? 1 : -1))
            .map((step) => {
                return (
                    <Page size="A4" style={styles.page} key={step?.stepRef}>

                        <View style={styles.sectionWrapper}>
                            <View style={styles.section}>
                                <Titre titleTag={`Critères d'évaluation : ${step?.stepName}`} />
                                <ImageRenderer stepName={step?.stepName} props={props} />
                                <QuestionRenderer
                                    questions={step?.formQuestions}
                                    stepRef={step?.stepRef}
                                />
                            </View>
                            <View style={styles.footer} fixed>
                                <Text style={styles.textFooter}> Projet : {project?.name}</Text>
                                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                                    `${pageNumber} / ${totalPages}`
                                )} />
                            </View>
                        </View>
                    </Page>
                );
            })}
    </Document>
);
const ReportPDF = (props) => {
    return (
        <MyDocument
            project={props.project}
            analyseMulticriteresResult={props.analyseMulticriteresResult}
            avatarsList={props.avatarsList}
            props={props}
        />
    );
};

Font.register({
    family: "Roboto",
    fonts: [
        {
            src: RobotoRegular,
        },
        {
            src: RobotoBold,
            fontWeight: 600,
        },
        {
            src: RobotoItalic,
            fontWeight: 400,
            fontStyle: "italic",
        },
    ],
    format: "truetype",
});

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
    },
    sectionWrapper: {
        backgroundColor: "#F7FBFF",
        border: "1px solid #E9E9E9",
        padding: 15,
    },
    section: {
        flexGrow: 1,
        backgroundColor: "#FFFFFF",
        border: "1px solid #CCCCCC",
        borderRadius: 8,
        marginBottom: 5,
        height: "94%",
        padding: "11px 18px",
    },
    baseContainer: {
        width: "100%",
    },
    resultContainer: {
        padding: 18,
        border: "1px solid #E9E9E9",
        width: "100%",
        borderRadius: 4,
    },
    chartContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
        marginTop: 14,
    },
    columnChartContainer: {
        padding: 10,
        border: "1px solid #E9E9E9",
        width: 280,
        borderRadius: 4,
        margin: 1,
    },
    columnChartContainerAlone: {
        padding: "10",
        border: "1px solid #E9E9E9",
        width: "50%",
        borderRadius: 4,
    },
    chartColumn: {
        width: "80%",
        margin: "0 auto",
    },
    criteriaContainer: {
        backgroundColor: "#F7FBFF",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
        border: "1px solid #E2F0F9",
        borderRadius: 4,
        padding: "5px 14px",
    },
    svg: {
        width: 100,
        height: 20,
    },
    collabs: {
        color: "#248bc0",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    users: {
        fontSize: 13,
        marginVertical: 4,
    },
    chartTitleResults: {
        color: "#248bc0",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    chartTitle: {
        color: "#248bc0",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    stepTitle: {
        fontSize: 16,
        color: "#248BC0",
        fontWeight: "bold",
    },
    questionText: {
        marginTop: 10,
        fontWeight: "semibold",
        fontSize: 13,
        textAlign: "justify",
    },
    preQuestionText: {
        color: "#248BC0",
    },
    answerText: {
        marginVertical: 6,
        marginHorizontal: 10,
        fontSize: 11,
        textAlign: "justify",
    },
    preAnswerText: {
        fontWeight: 700,
    },
    rating: {
        fontWeight: 700,
        fontSize: 12,
    },
    pages: {
        fontSize: 8,
        textAlign: "right",
    },
    headerWrapper: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header: {
        Width: "100%",
        height: "100px",
        backgroundColor: "#e2f0f9",
        display: "flex",
        flexDirection: "row",
    },
    logo: {
        width: "20%",
    },
    firstTitle: {
        fontWeight: "bold",
        paddingTop: "5%",
        margin: "0 auto",
        fontSize: "18px",
    },
    tag: {
        color: "#000000",
        fontSize: 16,
        fontWeight: 700,
        fontStyle: "normal",
        margin: "7px",
    },
    lowerTag: {
        color: "#E88774",
        fontSize: 16,
        fontWeight: 700,
        fontStyle: "normal",
    },
    spanSubtitle: {
        color: "#248BC0",
    },
    analysisText: {
        color: "#000000",
    },
    headerTextContainer: {
        paddingLeft: "20px",
    },
    criteriaItem: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 5,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        borderBottom: "1px solid #248BC0",
    },
    pageNumber: {
        fontSize: 9,
        textAlign: 'right',
        color: 'grey',
      },
    textFooter: {
        textAlign: "left",
        color: "#248BC0",
        fontSize: 9,
    },
});

ReportPDF.propTypes = {
    project: PropTypes.object,
    bar: PropTypes.string,
    specificite: PropTypes.string,
    certitude: PropTypes.string,
    manoeuvrabilite: PropTypes.string,
    specificiteWeightBase64: PropTypes.string,
    certitudeWeightBase64: PropTypes.string,
    manoeuvrabiliteWeightBase64: PropTypes.string,
    analyseMulticriteresResult: PropTypes.object,
    avatarsList: PropTypes.array,
};

export default ReportPDF;
