import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class Visualization extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.visualization}>
                <Text>Visualization goes here</Text>
            </View>
        );
    }
}