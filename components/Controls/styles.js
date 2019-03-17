import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    controls: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 200,
        justifyContent: "space-around",
        alignItems: "center"
    },
    mainButtonPlay: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 20,
        borderRadius: 150
    },
    mainButtonPause: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 27,
        paddingRight: 27,
        borderRadius: 150
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 150
    },
    active: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 150
    },
});

export default styles;