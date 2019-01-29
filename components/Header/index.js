import React, { Component } from "react";
import { View } from "react-native";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { openMenu } = this.props

        return (
            <View style={styles.header}>
                <Icon
                    style={styles.menu}
                    name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                    color="#ffffff"
                    size={40}
                    onPress={openMenu}
                />
                <Icon
                    style={styles.more}
                    name={Platform.OS === "ios" ? "ios-more" : "md-more"}
                    color="#ffffff"
                    size={35}
                // onPress={openMenu}
                />
            </View>
        );
    }
}