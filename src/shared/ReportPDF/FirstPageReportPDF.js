/**
 * @file FirstPageReportPDF.js
 * @brief Ce fichier contient :
 * Le composant de la première page du rapport PDF.
 * L'enregistrement des différentes variantes de la police Roboto pour utilisation dans le composant.
 * Le styles pour le composant de la première page du rapport PDF.
 */
import RobotoBold from "assets/fonts/Roboto/Roboto-Bold.woff"
import RobotoItalic from "assets/fonts/Roboto/Roboto-Italic.woff"
import RobotoRegular from "assets/fonts/Roboto/Roboto-Regular.woff"
import { format, parseISO } from "date-fns"
import { t } from "utils/translationUtils";

import { Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

/**
 * @var default
 * @brief default.
 */
export default ({ project, DisplayImages, subtitle, nbPages = 4 }) => {
    return (
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>{project.name}</Text>
                <Text style={styles.createdAt}>
                    {t('pdfReport.createdAt')} {format(parseISO(project.createdAt), "dd/MM/yyyy")}
                </Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <View>
                    <Text style={styles.collabs}>{t('pdfReport.collabsTitle')}</Text>
                    {project.contributors.map((contributor) => {
                        return (
                            <Text key={contributor.id} style={styles.users}>
                                - {contributor.lastName.toUpperCase()} {contributor.firstName}{" "}
                                / {contributor.job} /{" "}
                                {contributor.role === "CDP"
                                    ? t('pdfReport.roleCDP')
                                    : contributor.role}
                            </Text>
                        )
                    })}
                </View>
                {DisplayImages}
            </View>
            <Text style={styles.pages}>1/{nbPages}</Text>
        </Page>
    )
}

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

/**
 * @var styles
 * @brief styles.
 */
const styles = StyleSheet.create({
    page: {
        padding: 16,
        fontFamily: "Roboto",
    },
    pages: {
        fontSize: 8,
        textAlign: "right",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
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
    collabs: {
        color: "#248bc0",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    users: {
        fontSize: 13,
        marginVertical: 4,
    }
})
