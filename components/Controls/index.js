import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export default class Controls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { play, pause, stop, loop, isPlaying, isLooping } = this.props

        return (
            <View style={styles.controls}>
                <TouchableOpacity onPress={stop}>
                    <Icon
                        style={styles.button}
                        name={Platform.OS === "ios" ? "ios-square-outline" : "md-square-outline"}
                        color="#ffffff"
                        size={40}
                    />
                </TouchableOpacity>
                {isPlaying ?
                    <TouchableOpacity onPress={pause}>
                        <Icon
                            style={styles.mainButtonPause}
                            name={Platform.OS === "ios" ? "ios-pause" : "md-pause"}
                            color="#ffffff"
                            size={60}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={play}>
                        <Icon
                            style={styles.mainButtonPlay}
                            name={Platform.OS === "ios" ? "ios-play" : "md-play"}
                            color="#ffffff"
                            size={70}
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={loop}>
                    {isLooping ?
                        <Icon
                            style={styles.active}
                            name={Platform.OS === "ios" ? "ios-infinite" : "md-infinite"}
                            color="#ffffff"
                            size={40}
                        />
                        :
                        <Icon
                            style={styles.button}
                            name={Platform.OS === "ios" ? "ios-infinite" : "md-infinite"}
                            color="#ffffff"
                            size={40}
                        />
                    }
                </TouchableOpacity>
            </View>
        );
    }
}