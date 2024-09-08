/**
 * @file Footer.js
 * @brief This component renders the footer for each page, displaying the project name and the current page number.
 */
import {
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer" // or 'react-pdf' if you're using React PDF



const Footer = ({ name }) => {
    return (
        <View style={styles.footer} fixed>
            <Text style={styles.textFooter}>Projet : {name}</Text>
            <Text style={styles.pageNumber}  render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        borderBottom: "1px solid #248BC0",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    textFooter: {
        textAlign: "left",
        color: "#248BC0",
        fontSize: 9,
    },
    pageNumber: {
        textAlign: 'right',
        color: 'grey',
        fontSize: 9,
    },
});

export default Footer;
