import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class TrackName extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.trackNameWrap}>
                <Text style={styles.trackName}>Madina</Text>
            </View>
        );
    }
}