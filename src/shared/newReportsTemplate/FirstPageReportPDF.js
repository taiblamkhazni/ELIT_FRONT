/**
 * @file FirstPageReportPDF.js
 * @brief Ce fichier contient :
 * Le composant de la première page du rapport PDF de la nouvelle template du rapport PDF.
 * L'enregistrement des différentes variantes de la police Roboto pour utilisation dans le composant.
 * Le styles pour le composant de la première page du rapport PDF.
 */
import RobotoBold from "assets/fonts/Roboto/Roboto-Bold.woff";
import RobotoItalic from "assets/fonts/Roboto/Roboto-Italic.woff";
import RobotoRegular from "assets/fonts/Roboto/Roboto-Regular.woff";
import avatarDefault from "assets/images/avatarDefault.jpg";
import { format, parseISO } from "date-fns";
import { t } from "utils/translationUtils";

import { Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

/**
  * @brief FirstPageReportPDF : Le composant de la première page du rapport PDF.
  * @param project Le projet pour lequel le rapport est généré.
  * @param DisplayImages Les images à afficher dans le rapport.
  * @param subtitle Le sous-titre du rapport.
  * @param titre Le titre du rapport.
  * @param avatarsList La liste des avatars des collaborateurs du projet.
**/
const FirstPageReportPDF = ({
  project,
  DisplayImages,
  titre,
  avatarsList = [],
}) => {

  return (
    <Page size="A4" style={styles.page}>
      {titre}
      <View style={styles.section}>
        <View style={styles.sectionTitle}>
          <Text style={styles.title}>
            <Text style={styles.span}>Projet : </Text>
            {project?.name}
          </Text>
          <Text style={styles.createdAt}>
            {t('pdfReport.createdAt')} {format(parseISO(project?.createdAt), "dd/MM/yyyy")}
          </Text>
        </View>
        <View style={styles.sectionColabs}>
          <View>
            <Text style={styles.collabsTitle}>{t('pdfReport.collabsTitle')}</Text>
          </View>
          {project?.contributors.map((contributor) => {
            const urlAvatar = avatarsList.filter(
              (a) => a.userId === contributor.contributerId
            )[0]?.url;
            return (
              <View key={contributor.contributerId} style={styles.colab}>
                <Image
                  src={urlAvatar ? urlAvatar : avatarDefault}
                  style={styles.avatar}
                />
                <Text style={styles.nameAndJob}>
                  {contributor.firstName} {contributor.lastName.toUpperCase()}
                </Text>
                <Text style={styles.nameAndJob}>
                  {contributor?.func !== null
                    ? contributor?.func?.charAt(0) +
                    contributor?.func?.slice(1)?.toLowerCase()
                    : ""}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.content}>
          <View style={styles.pagination}>{DisplayImages}</View>
          <View style={styles.footer} fixed>
            <Text style={styles.textFooter}> Projet : {project?.name}</Text>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} />
          </View>
        </View>
      </View>
    </Page>
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

/**
 * @brief styles : Les styles pour le composant de la première page du rapport PDF.
 */
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    margin: "0 auto",
  },
  section: {
    margin: "0 30px",
  },
  sectionTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    padding: "5px",
    marginBottom: "-10px",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: "-10px",
  },
  span: {
    color: "#6a6a6a",
  },
  createdAt: {
    marginBottom: "20px",
    textAlign: "right",
    fontSize: 10,
    color: "#7A7A7A",
  },
  sectionColabs: {
    width: "100%",
    backgroundColor: "#e2f0f9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: "23px",
    padding: "3px",
  },
  collabsTitle: {
    color: "#248bc0",
    fontWeight: "bold",
    fontSize: 12,
  },
  colab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  avatar: {
    borderRadius: "50%",
    width: 20,
    height: 20,
    border: "2px solid #E9E9E9",
    margin: "0 auto",
    marginBottom: "1px",
  },
  nameAndJob: {
    fontSize: 10,
    marginBottom: "2px",
  },
  content: {
    display: "inline-block",
    float: "left",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 10,
    color: "black",
    display: "block",
    width: 200,
    padding: "0px 5px",
  },
  spanSubtitle: {
    color: "#248BC0",
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
  pagination: {
    height: "90%",
    padding: "0px 5px",
  },
  pages: {
    fontSize: 8,
    textAlign: "right",
    marginRight: 5,
  },
});
export default FirstPageReportPDF;
