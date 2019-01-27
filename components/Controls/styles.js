import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    controls: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 200,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "space-around",
        alignItems: "center"
    },
    button: {
        height: 100,
        borderWidth: 1,
        borderColor: "white",
    },
    mainButton: {
        height: 130,
        borderWidth: 1,
        borderColor: "white",
    }
});

export default styles;