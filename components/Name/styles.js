import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    trackNameWrap: {
        display: "flex",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    trackName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white"
    }
});

export default styles;