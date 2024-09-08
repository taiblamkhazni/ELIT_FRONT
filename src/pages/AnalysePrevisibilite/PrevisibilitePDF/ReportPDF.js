/**
 * @file ReportPDF.js
 * @brief Ce fichier définit les composants DisplayImages, RenderVotes, DisplayMethodo et ReportPDF.
 */
import { memo } from "react"
import RobotoBold from "assets/fonts/Roboto/Roboto-Bold.woff"
import RobotoItalic from "assets/fonts/Roboto/Roboto-Italic.woff"
import RobotoRegular from "assets/fonts/Roboto/Roboto-Regular.woff"
import avatarDefault from "assets/images/avatarDefault.jpg";
import icon from "assets/images/iconPDF.png";
import {
  CircleRate
} from "pages/AnalyseMulticriteres/MulticriterePDF/ReportPDF"
import PropTypes from "prop-types"
import FirstPageReportPDF from "shared/newReportsTemplate/FirstPageReportPDF"

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer"
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
            <Text style={styles.spanSubtitle}>Étape 2 : </Text>
            <Text style={styles.analysisText}>Choix de la méthodologie</Text>
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
const DisplayImages = ({ result, aspectsBar, eScore, aspectsGauge }) => {
  return (
    <View style={{ padding: "0 10px", Width: "100px" }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

        <View style={styles.graphContainer_}>
          <Text style={styles.chartTitle}>Choix de la méthodologie</Text>
          <Image source={{ uri: aspectsBar }} style={{ height: 100, width: '100%' }} />
        </View>
        <View style={styles.graphContainer__}>
          <Text style={styles.chartTitle}>
            Valeur moyenne des 3 aspects décisionnels
          </Text>
          <Image source={{ uri: aspectsGauge }} style={{ height: 100, width: '100%' }} />
          <View style={styles.highlow}>
            <Text style={styles.low}>Low</Text>
            <Text style={styles.high}>High</Text>
          </View>
        </View>
      </View>
      {result === "low" && (
        <View style={styles.graphContainer}>
          <Text style={styles.chartTitle}>Résultat de l’analyse multicritères</Text>
          <Image source={{ uri: eScore }} />
        </View>
      )}
    </View>
  );
};


const RenderVotes = ({ votes, avatarsList, contributors }) => {
  return (
    <>
      {votes.map((vote, index) => {

        const contributor = contributors.find(
          (contributor) => contributor.contributerId === vote.userId
        );

        if (contributor) {
          const avatar = avatarsList.find((a) => a.userId === vote.userId);
          const urlAvatar = avatar.url ? avatar.url : avatarDefault;
          return (
            <View
              style={{
                width: "100%",
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2F0F9',
                borderRadius: 4,
                textAlign: 'left',
                padding: '10px',
                margin: '10px 0',
              }}
              key={index}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, width: '100%' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Image
                      src={urlAvatar}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: '50%',
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
                        {contributor.firstName} {contributor.lastName.toUpperCase()}
                      </Text>
                      <Text style={{ fontSize: 10, color: '#7A7A7A' }}>
                        {contributor?.func
                          ? contributor.func.charAt(0) + contributor.func.slice(1).toLowerCase()
                          : "Chef de projet"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ flex: 2, marginRight: 10, alignItems: 'center' }}>
                  <Text style={{ fontSize: 10, color: "#7A7A7A", marginBottom: 5, paddingLeft: 8 }}>Évaluation</Text>
                  <Svg viewBox="0 0 40 24" style={{
                    flexDirection: 'row', marginBottom: 10, width: 100,
                    height: 20,
                  }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <CircleRate
                        key={i}
                        cx={16 * i - 8}
                        stroke={vote.predictibilityValue >= i ? 'none' : '#CCCCCC'}
                      />
                    ))}
                  </Svg>
                </View>

                <View style={{ flex: 3 }}>
                  <Text style={{ fontSize: 10, color: "#7A7A7A", marginBottom: 5 }}>Commentaire</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      textAlign: 'justify',
                      color: '#1F1A28',
                    }}
                  >
                    {vote.justification}
                  </Text>
                </View>
              </View>
            </View>
          );
        } else {
          return null; // Si le contributeur n'est pas trouvé, retournez null ou un composant vide
        }
      })}
    </>
  );
};


const DisplayMethodo = ({ methodologieChoosed, nbVote, voteByMethode, avatarsList, contributors }) => {

  const methodos = [
    {
      nameEn: 'CLASSIC',
      nameFr: 'Classique',
      texte: 'classique'
    },
    {
      nameEn: 'AGILE',
      nameFr: 'Agile',
      texte: 'agile'
    },
    {
      nameEn: 'HYBRID',
      nameFr: 'Hybride',
      texte: 'hybride'
    }
  ];
  return (
    <>
      {methodos.map((methodo) => {
        return (
          <View key={methodo.nameEn}>
            <Text style={{ marginTop: "8px" }}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Méthode:{" "}
              </Text>
              <Text
                style={{
                  color:
                    methodologieChoosed === methodo.nameEn
                      ? "#21A759"
                      : "#7A7A7A",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {methodo.nameFr}
              </Text>
            </Text>
            <Text style={styles.votant}>
              <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></Svg>
              Nombre de votants: {nbVote[methodo.texte]}
            </Text>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <RenderVotes votes={voteByMethode[methodo.texte]} avatarsList={avatarsList} contributors={contributors} />
            </View>
          </View>
        )
      })}
    </>
  )
}
//Display Brainstorming Component
const DisplayBrainstorming = ({ brainstormingResume, avatarsList }) => (
  <>
    {brainstormingResume
      .map((brainstormingRes, index) => {
        return (
          <View style={styles.section__} key={index}>
            {brainstormingRes.formQuestions
              .map((question, questionIndex) => {
                const questionNumber = `Question ${index + 1}.${questionIndex + 1}`
                return (
                  <View key={question.id} wrap={false}>
                    <Text>
                      <Text
                        style={styles.preQuestionText}
                      >{`${questionNumber}:`}</Text>{" "}
                      {question.questionText}
                    </Text>
                    <Text style={styles.answerText}>
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
                    <Text style={{ fontSize: "10px" }}>
                      Commentaire{"(s) ("}{question.brainstormings.length}{")"}
                    </Text>
                    {question.brainstormings.map(
                      (brainstorming) => {
                        const avatar = avatarsList.find((a) => a.userId === brainstorming.userId);
                        const urlAvatar = avatar.url ? avatar.url : avatarDefault;
                        return (
                          <View
                            key={brainstorming.id}
                            style={{
                              border: "1px solid #CCCCCC",
                              borderRadius: 4,
                              backgroundColor: brainstorming.isChecked ? "#10B5811a" : "#FFFFFF",
                              padding: 13,
                              margin: "5px 0 5px 0",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                width: "50%",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                src={urlAvatar}
                                style={styles.avatar}
                              />
                              <Text
                                style={{ fontSize: 13, marginRight: 8 }}
                              >
                                {brainstorming.firstName}{" "}
                                {brainstorming.lastName.toUpperCase()}
                              </Text>
                              <Text
                                style={{ color: "#7A7A7A", fontSize: 13 }}
                              >
                                {brainstorming.role === "CDP"
                                  ? "Chef de projet"
                                  : brainstorming.role}
                              </Text>
                            </View>
                            <Text
                              style={{
                                textAlign: "justify",
                                fontSize: 12,
                                marginTop: 10,
                                color: "#000000",
                              }}
                            >
                              {brainstorming.brainstormingText}
                            </Text>

                          </View>
                        )
                      }
                    )}
                  </View>

                )
              })}

          </View>
        )
      })}

  </>
);

/** Previsibility analysis report */
const ReportPDF = memo(
  ({
    project,
    votes,
    eScore,
    aspectsBar,
    aspectsGauge,
    result,
    brainstormingResume,
    methodologieChoosed,
    methodologies,
    avatarsList,
  }) => {
    const nbVote = methodologies.reduce(
      (acc, m) => {
        if (m.name === "AGILE") {
          acc["agile"] = m.nbVotes
        } else if (m.name === "HYBRID") {
          acc["hybride"] = m.nbVotes
        } else if (m.name === "CLASSIC") {
          acc["classique"] = m.nbVotes
        }
        return acc
      },
      { classique: 0, hybride: 0, agile: 0 }
    )

    const voteByMethode = votes.reduce(
      (acc, m) => {
        if (m.chosenPMM === "AGILE") {
          acc["agile"] = [...acc["agile"], m]
        } else if (m.chosenPMM === "HYBRID") {
          acc["hybride"] = [...acc["hybride"], m]
        } else if (m.chosenPMM === "CLASSIC") {
          acc["classique"] = [...acc["classique"], m]
        }
        return acc
      },
      { classique: [], hybride: [], agile: [] }
    )

    return (
      <Document title={project.name}>
        <FirstPageReportPDF
          titre={<Titre />}
          project={project}
          DisplayImages={<DisplayImages result={result} aspectsBar={aspectsBar} eScore={eScore} aspectsGauge={aspectsGauge} />}
          subtitle="Étape 2 : Choix de la méthodologie"
          avatarsList={avatarsList}
        />
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.sectionWrapper}>
            <View style={styles.section}>
              <Titre titleTag={`Details des votes`} />
              <DisplayMethodo
                methodologieChoosed={methodologieChoosed}
                nbVote={nbVote}
                voteByMethode={voteByMethode}
                avatarsList={avatarsList}
                contributors={project.contributors}
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
        {
          brainstormingResume.length > 0 && (
            <Page size="A4" style={styles.page} wrap>
              <Titre titleTag={"Résumé du brainstorming"} />
              <DisplayBrainstorming brainstormingResume={brainstormingResume} avatarsList={avatarsList} />
              <View style={styles.footer} fixed>
                <Text style={styles.textFooter}> Projet : {project?.name}</Text>
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                  `${pageNumber} / ${totalPages}`
                )} />
              </View>
            </Page>
          )
        }

      </Document>
    )
  }
);

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
  avatar: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    border: "2px solid #E9E9E9",
    margin: "0 auto",
    marginBottom: "1px",
  },
  votant: {
    marginBottom: "20px",
    textAlign: "right",
    fontSize: 10,
    color: "#7A7A7A",
    marginTop: "8px",
  },
  section: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    border: "1px solid #CCCCCC",
    borderRadius: 3,
    height: "94%",
    padding: "11px 18px",
  },
  section__: {
    backgroundColor: "#FFFFFF",
    padding: "11px 18px",
  },
  sectionWrapper: {
    backgroundColor: "#F7FBFF",
    border: "1px solid #E9E9E9",
    padding: 15,
  },
  description: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: "#7A7A7A",
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
  spanSubtitle: {
    color: "#248BC0",
  },
  graphContainer: {
    margin: "8 0",
    border: "1px solid #E9E9E9",
    borderRadius: 4,
    width: "100%",
    padding: 10,
  },
  graphContainer_: {
    margin: 1,
    border: "1px solid #E9E9E9",
    borderRadius: 4,
    width: "70%",
    padding: 10,
  },
  graphContainer__: {
    margin: 1,
    border: "1px solid #E9E9E9",
    borderRadius: 4,
    width: "30%",
    padding: 10,
  },
  chartResultsMoyen: {
    border: "1px solid #E9E9E9",
    borderRadius: 4,
    width: "100%",
    padding: 18,
    margin: "0 auto",
    marginTop: 8,
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
    height: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "0 auto",
    marginBottom: "5px",
    paddingLeft: "3px",
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
  chartTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
    margin: "0 10px",
  },
  aspectsGauge: {
    height: 80,
    width: 80,
    marginHorizontal: "auto",
  },
  highlow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 135,
    margin: "auto",
  },
  high: {
    fontSize: 10,
    color: "#39B7BF",
    fontWeight: "bold",
  },
  low: {
    fontSize: 10,
    color: "#FB8519",
    fontWeight: "bold",
  },
  percentages: {
    fontSize: 10,
    fontWeight: "bold",
  },
  pages: {
    fontSize: 8,
    textAlign: "right",
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
  analysisText: {
    color: "#000000",
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




  chartTitleResults: {
    color: "#248bc0",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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

  headerWrapper: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    textAlign: 'right',
    color: 'grey',
    fontSize: 9,
  },
  textFooter: {
    textAlign: "left",
    color: "#248BC0",
    fontSize: 9,
  },
})

ReportPDF.propTypes = {
  project: PropTypes.object,
  votes: PropTypes.array,
  eScore: PropTypes.string,
  aspectsBar: PropTypes.string,
  aspectsGauge: PropTypes.string,
  result: PropTypes.string, // (high|low) - the analysis status
  methodologieChoosed: PropTypes.string, // (CLASSIC|AGILE|HYBRID) - the decided methodology for project
  methodologies: PropTypes.array,
  avatarsList: PropTypes.array,
}

export default ReportPDF
