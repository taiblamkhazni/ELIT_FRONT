/**
 * @file ReportPDF.js
 * @brief Ce fichier définit les composants DisplayImages et ReportPDF.
 */
import { memo } from "react"
import RobotoBold from "assets/fonts/Roboto/Roboto-Bold.woff"
import RobotoItalic from "assets/fonts/Roboto/Roboto-Italic.woff"
import RobotoRegular from "assets/fonts/Roboto/Roboto-Regular.woff"
import icon from "assets/images/iconPDF.png";
import PropTypes from 'prop-types';
import FirstPageReportPDF from "shared/newReportsTemplate/FirstPageReportPDF"
import Footer from "shared/ReportPDF/Footer";

import {
    Document,
    Font,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer"


/** Function to replace nested ternary operation in Text element */
/**
 * @var getMethodologyName
 * @brief getMethodologyName.
 */
const getMethodologyName = (name) => {
    if (name === "CLASSIC") {
        return "Classique";
    }
    if (name === "AGILE") {
        return "Agile";
    }
    return "Hybride";
};
/**
 * Header component for the report.
 * @param {string} titleTag - The main title to be displayed in the header.
 * @param {string} lowerTitleTag - The subtitle to be displayed below the main title.
 */

export const Titre = ({ titleTag = "", lowerTitleTag = "" }) => {
    return (
        <View style={{ marginBottom: "10px" }} fixed>
            <View style={styles.header}>
                <Image src={icon} style={styles.logo} />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.firstTitle}>
                        Rapport d'analyse collaborative
                    </Text>
                    <Text>
                        <Text style={styles.spanSubtitle}>Étape 3 : </Text>
                        <Text style={styles.analysisText}>Choix de la méthode</Text>
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
 * @var DisplayImages
 * @brief DisplayImages.
 */
const DisplayImages = ({ methodsBar, methodologiePie, choosenMethodology, chooseMethod, countVotes }) => {
    return (
        <View style={{ width: "100%" }}>
            <View
                style={{
                    width: "70%",
                    border: "1px solid #E9E9E9",
                    borderRadius: 4,
                    padding: "10px 18px",
                    margin: "0 auto",
                    marginBottom: 10,
                }}
            >
                <Text style={styles.chartTitle}>
                    Méthodologie{" "}
                    {getMethodologyName(choosenMethodology?.name)}
                </Text>
                <Text style={styles.chartText}>
                    Le résultat obtenu à l’issue du choix de la méthodologie indique
                    que l’équipe a convergé sur le choix de la méthode{" "}
                    {getMethodologyName(choosenMethodology?.name)}
                </Text>
                <Image style={styles.aspectsGauge} src={methodologiePie} />
            </View>
            <View style={styles.graphContainer}>
                <Text style={styles.chartTitle}>Résultat</Text>
                <Image style={styles.methodsBarStyle} src={methodsBar} />
                <View style={styles.chartResults}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.chartSubtitle}>Méthode choisie: </Text>
                        <Text style={styles.chartText}>
                            {chooseMethod && chooseMethod.map((m, index) => {
                                if (index < chooseMethod.length - 1) {
                                    return m + " & "
                                } else {
                                    return m
                                }
                            })}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.chartSubtitle}>Total de vote: </Text>
                        <Text style={styles.chartText}>{countVotes}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
/**
 * @var ReportPDF
 * @brief ReportPDF.
 */
const ReportPDF = memo(({
    methodsBar,
    methodologiePie,
    listQuestions,
    project,
    choosenMethodology,
    inputForm,
    chooseMethod,
    countVotes,
    avatarsList
}) => {
    return (
        <Document title={project.name}>
            <FirstPageReportPDF
                project={project}
                DisplayImages={
                    <DisplayImages
                        methodsBar={methodsBar}
                        methodologiePie={methodologiePie}
                        choosenMethodology={choosenMethodology}
                        chooseMethod={chooseMethod}
                        countVotes={countVotes}
                    />
                }
                subtitle="Étape 3 : Choix de la méthode"
                titre={<Titre />}
                avatarsList={avatarsList}
            />
            <Page size="A4" style={styles.page}>
                <Titre titleTag="Questionnaire sur les contraintes liées au contexte" />
                <View style={styles.section}>
                    {listQuestions?.map((question) => {
                        return (
                            <View key={question.id}>
                                {/* <View style={styles.questionWrapper}> */}
                                    {/* Question ID and Title in blue */}
                                    <Text style={styles.questionTitle}>
                                        <Text style={styles.blueText}>
                                            {`Question ${question.executionQuestionId}: `}
                                        </Text>
                                        <Text style={{ color: "#1F1A28" }}>{question.title}</Text>
                                    </Text>
                                    {/* Question Description */}
                                    <Text style={styles.questionDescription}>
                                        {question.description}
                                    </Text>
                                {/* </View> */}
                                {/* Answer text in blue */}
                                <Text style={styles.answerText}>
                                    <Text style={styles.blueText}>
                                        Réponse:
                                    </Text>{" "}
                                    {inputForm[question.executionQuestionId - 1]
                                        ? inputForm[question.executionQuestionId - 1]
                                        : "null"}
                                </Text>
                            </View>
                        )
                    })}
                    {/* <Footer name={project?.name}  /> */}
                    <View style={styles.footer} fixed>
                        <Text style={styles.textFooter}> Projet : {project?.name}</Text>
                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                            `${pageNumber} / ${totalPages}`
                        )} />
                    </View>
                </View>
            </Page>
        </Document>
    )
})

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
})

const styles = StyleSheet.create({
    page: {
        fontFamily: "Roboto",
    },
    section: {
        flexGrow: 1,
        backgroundColor: "#F7FBFF",
        padding: 21,
        border: "1px solid #CCCCCC",
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 4,
    },
    createdAt: {
        textAlign: "center",
        fontSize: 10,
        fontStyle: "italic",
        color: "#7A7A7A",
    },
    subtitle: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 20,
        marginTop: 10,
        color: "#248BC0",
    },
    graphContainer: {
        padding: 10,
        border: "1px solid #E9E9E9",
        width: "80%",
        margin: "0 auto",
        borderRadius: 4,
    },
    svg: {
        width: 160,
        height: 32,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    vote: {
        margin: 6,
    },
    voteParamMethodology: {
        fontSize: 14,
        marginBottom: 8,
    },
    voteParamJustification: {
        fontSize: 12,
        marginHorizontal: 10,
        textAlign: "justify",
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
        marginBottom: 10,
    },
    chartResults: {
        flexDirection: "row",
        justifyContent: "space-around",
        fontSize: 13,
        marginVertical: 4,
        marginBottom: 10,
    },
    chartTitle: {
        color: "#248bc0",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        margin: 10,
        marginTop: 0,
    },
    chartSubtitle: {
        color: "#248bc0",
        fontWeight: "bold",
    },
    chartText: {
        fontSize: 13,
        marginBottom: 10,
    },
    aspectsGauge: {
        width: 150,
        marginHorizontal: "auto",
        marginVertical: 0,
    },
    methodsBarStyle: {
        width: 400,
        marginHorizontal: "auto",
        marginVertical: 0,
    },
    questionWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    questionTitle: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 13,
        color: "#1F1A28",
    },
    questionDescription: {
        marginTop: 10,
        fontSize: 12,
        marginHorizontal: 4,
    },
    answerText: {
        marginVertical: 16,
        marginHorizontal: 10,
        fontSize: 11,
        textAlign: "justify",
    },
    stepTitle: {
        marginTop: 20,
        fontSize: 16,
        color: "#248BC0",
        fontWeight: "bold",
    },
    pages: {
        fontSize: 8,
        textAlign: "right",
    },
    avatar: {
        borderRadius: "50%",
        width: 32,
        height: 32,
        border: "2px solid #E9E9E9",
        marginBottom: 4,
        marginRight: 15,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        borderBottom: "1px solid #248BC0",
        position: "absolute", // Ensures the footer is positioned absolutely
        bottom: 0, // Places the footer at the bottom of the page
        left: 0, // Ensures the footer stretches to the left edge
        right: 0, // Ensures the footer stretches to the right edge
        padding: 10, // Optional: Adds padding inside the footer
    },
    pageNumber: {
        textAlign: 'right',
        color: 'grey',
        fontSize: 9,
    },
    textFooter: {
        textAlign: "left",
        color: "#248BC0",
        fontSize: 9,
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
    headerTextContainer: {
        paddingLeft: "20px",
    },
    firstTitle: {
        fontWeight: "bold",
        paddingTop: "5%",
        margin: "0 auto",
        fontSize: "18px",
    },
    blueText: {
        color: "#248BC0", // Blue color for specified text
    },
})

export default ReportPDF
