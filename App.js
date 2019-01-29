/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Dimensions, DrawerLayoutAndroid, Picker } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './components/Header';
import Visualization from './components/Visualization';
import TrackName from './components/Name';
import Controls from './components/Controls';
import Svg, {
  Circle,
  Rect,
  // Path,
} from 'react-native-svg';
// import { AnimatedSVGPath } from 'react-native-svg-animations';

// const play = "M146.9,79.5L35.1,5.9C15.8-6.8,0,1.7,0,24.8v154.9c0,23.1,15.8,31.6,35.1,19l111.7-73.1C166.2,112.9,166.2,92.2,146.9,79.5z M132, 110.1l - 99.3, 65c - 6.4, 4.2 - 11.7, 1.4 - 11.7 - 6.3V35.7c0 - 7.7, 5.3 - 10.5, 11.7 - 6.3L132, 94.8C138.5, 99, 138.5, 105.9, 132, 110.1z";
// const play = "M366.2,204.2c-9.8,0-15-5.6-15-15.1V77.2h-85v28h19.5c9.8,0,8.5,2.1,8.5,11.6v72.4c0,9.5,0.5,15.1-9.3,15.1H277h-20.7c-8.5,0-14.2-4.1-14.2-12.9V52.4c0-8.5,5.7-12.3,14.2-12.3h18.8v-28h-127v28h18.1c8.5,0,9.9,2.1,9.9,8.9v56.1h-75V53.4c0-11.5,8.6-13.3,17-13.3h11v-28H2.2v28h26c8.5,0,12,2.1,12,7.9v142.2c0,8.5-3.6,13.9-12,13.9h-21v33h122v-33h-11c-8.5,0-17-4.1-17-12.2v-57.8h75v58.4c0,9.1-1.4,11.6-9.9,11.6h-18.1v33h122.9h5.9h102.2v-33H366.2z"

// Import the react-native-sound module
var Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

// Load the sound file 'sound.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var soundFile = new Sound('nyan.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    alert('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + soundFile.getDuration() + 'number of channels: ' + soundFile.getNumberOfChannels());
});

// Release the audio player resource
soundFile.release();

const gradients = [
  {
    "from": "#e55d87",
    "to": "#5fc3e4"
  }, {
    "from": "#3ca55c",
    "to": "#b5ac49"
  }, {
    "from": "#348f50",
    "to": "#56b4d3"
  }, {
    "from": "#8360c3",
    "to": "#2ebf91"
  }, {
    "from": "#fc5c7d",
    "to": "#6a82fb"
  }
]

const files = [
  {
    "displayName": "Nyan Cat",
    "fileName": "nyan.mp3"
  },
  {
    "displayName": "Bells",
    "fileName": "bell.mp3"
  },
  {
    "displayName": "Door Bell",
    "fileName": "door.mp3"
  },
]

type Props = {};
export default class App extends Component<Props> {
  state = {
    lines: [],
    gradientNumber: 0,
    currentFileLabel: "Nyan Cat",
    currentFile: "nyan.mp3",
    isPlaying: false,
    isLooping: false
  }

  componentDidMount() {
    this.setState({
      gradientNumber: Math.floor(Math.random() * gradients.length)
    })
  }

  render() {
    const { gradientNumber, currentFileLabel, currentFile } = this.state;

    const gradientFrom = gradients[gradientNumber].from;
    const gradientTo = gradients[gradientNumber].to;


    const navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={styles.current}>Current Recitation:</Text>
        <Picker
          selectedValue={this.state.currentFile}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              currentFile: itemValue,
              currentFileLabel: files[itemIndex].displayName
            })
          }>
          {files.map(index => {
            return <Picker.Item key={index} label={index.displayName} value={index.fileName} />
          })}
        </Picker>
        {/* <Text style={styles.currentFile}>Madina</Text> */}
        <Text style={styles.menuItem}>Contribute</Text>
      </View>
    );

    const playSound = () => {
      soundFile.play((success) => {
        if (success) {
          soundFile.stop();
        } else {
          alert('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          soundFile.reset();
        }
      });
      // soundFile.play()
      this.setState({
        isPlaying: true
      })
    }
    const pauseSound = () => {
      soundFile.pause()
      this.setState({
        isPlaying: false
      })
    }
    const stopSound = () => {
      soundFile.stop()
      this.setState({
        isPlaying: false,
        isLooping: false
      })
    }
    const loopSound = (loopingStatus) => {
      if (loopingStatus) {
        soundFile.setNumberOfLoops(0)
      } else {
        soundFile.setNumberOfLoops(-1)
      }
      this.setState({
        isLooping: !loopingStatus
      })
    }

    const openMenu = () => {
      this.refs['MenuDrawer'].openDrawer()
    }

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref="MenuDrawer">
        <LinearGradient colors={[gradientFrom, gradientTo]} style={styles.container}>
          <Header openMenu={openMenu} />
          <Visualization />
          {/* <Button title="Tap Me?" onPress={() => }>Tap Me</Button> */}
          <TrackName currentFile={currentFileLabel} />
          <Controls
            play={playSound}
            pause={pauseSound}
            stop={stopSound}
            loop={() => loopSound(this.state.isLooping)}
            isLooping={this.state.isLooping}
            isPlaying={this.state.isPlaying} />
        </LinearGradient>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  menuItem: {
    padding: 10,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "#cccccc",
  },
  current: {
    fontSize: 20,
    padding: 10,

  },
  currentFile: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  }
  // welcome: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
});
