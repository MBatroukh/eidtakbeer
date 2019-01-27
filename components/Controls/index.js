import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class Controls extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.controls}>
                <Text style={styles.button}>Stop</Text>
                <Text style={styles.mainButton}>Play</Text>
                <Text style={styles.button}>Loop</Text>
            </View>
        );
    }
}