import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.header}>
                <Text>Menu</Text>
                <Text>Options</Text>
            </View>
        );
    }
}