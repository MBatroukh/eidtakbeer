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
import Sound from 'react-native-sound';
import MusicControl from 'react-native-music-control';
import GoogleCast, { CastButton } from 'react-native-google-cast';

import {
  Player,
  Recorder,
  MediaStates
} from 'react-native-audio-toolkit';

var newAudio = 'nyan.mp3';
var soundFile;

changeFile = (newFile) => {

  if (newFile == "") {
    newAudio = "nyan.mp3";
  } else {
    newAudio = newFile;
    soundFile = new Sound(newAudio, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + soundFile.getDuration() + 'number of channels: ' + soundFile.getNumberOfChannels());
    });
  }
  alert(newAudio);
  return newAudio;
}

// Load the sound file 'sound.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
soundFile = new Sound(newAudio, Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    alert('failed to load the sound', error);
    return;
  }
  alert(newAudio)
  // loaded successfully
  // alert('duration in seconds: ' + soundFile.getDuration() + 'number of channels: ' + soundFile.getNumberOfChannels());
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

type Props = {};
export default class App extends Component<Props> {
  state = {
    lines: [],
    gradientNumber: 0,
    currentFileLabel: "Nyan Cat",
    currentFile: "nyan.mp3",
    isPlaying: false,
    isLooping: false,
    casting: false
  }

  componentDidMount() {
    // this.player = null;
    // this.recorder = null;

    // // this._reloadPlayer();
    this.setState({
      gradientNumber: Math.floor(Math.random() * gradients.length)
    })
  }

  render() {
    const { gradientNumber, currentFileLabel, currentFile, casting } = this.state;

    const gradientFrom = gradients[gradientNumber].from;
    const gradientTo = gradients[gradientNumber].to;

    // Enable playback in silence mode
    Sound.setCategory('Playback');

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

    const navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={styles.current}>Current Recitation:</Text>
        <Picker
          selectedValue={this.state.currentFile}
          style={{ height: 50, width: "100%" }}
          onValueChange={(itemValue, itemIndex) => {
            changeFile(itemValue);
            this.setState({
              currentFile: itemValue,
              currentFileLabel: files[itemIndex].displayName
            })
          }
          }>
          {files.map(index => {
            return <Picker.Item key={index} label={index.displayName} value={index.fileName} />
          })}
        </Picker>
        {/* <Text style={styles.currentFile}>Madina</Text> */}
        <Text style={styles.menuItem}>Contribute</Text>
      </View>
    );
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.on('play', () => {
      playSound()
      // state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
    })
    MusicControl.on('pause', () => {
      pauseSound()
    })
    MusicControl.on('stop', () => {
      stopSound()
    })
    MusicControl.setNowPlaying({
      title: currentFileLabel,
      artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
      color: 0xFFFFFF, // Notification Color - Android Only
      notificationIcon: 'my_custom_icon' // Android Only (String), Android Drawable resource name for a custom notification icon
    })

    const playSound = () => {
      // new Player('nyan.mp3', Object ? playbackOptions)
      console.log("playing?")
      soundFile.play((success) => {
        if (success) {
          stopSound();
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

    const playSoundCast = () => {
      GoogleCast.play();
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

    const pauseSoundCast = () => {
      GoogleCast.pause()
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

    const stopSoundCast = () => {
      GoogleCast.stop()
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


    // Connection established
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_STARTED, () => {
      this.setState({
        casting: true
      })
    })

    // Disconnected (error provides explanation if ended forcefully)
    GoogleCast.EventEmitter.addListener(GoogleCast.SESSION_ENDED, error => {
      this.setState({
        casting: false
      })
    })


    GoogleCast.castMedia({
      mediaUrl: 'http://batroukh.com/eidtakbeer/nyan.mp3',
      imageUrl:
        'https://thestraightpath.ca/wp-content/uploads/2017/12/grace-zhu-422238-e1514760402317.jpg',
      title: 'Nyan Cat',
      streamDuration: 596, // seconds
      contentType: 'audio/mp3', // Optional, default is "video/mp4"
      playPosition: 0, // seconds
    })

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}
        ref="MenuDrawer">
        <LinearGradient colors={[gradientFrom, gradientTo]} style={styles.container}>
          <Header openMenu={openMenu} />
          <CastButton style={{ width: 24, height: 24 }} />
          <Visualization />
          {/* <Button title="Tap Me?" onPress={() => }>Tap Me</Button> */}
          <TrackName currentFile={currentFileLabel} />
          {casting ?
            <Controls
              play={playSoundCast}
              pause={pauseSoundCast}
              stop={stopSoundCast}
              loop={() => loopSound(this.state.isLooping)}
              isLooping={this.state.isLooping}
              isPlaying={this.state.isPlaying} />
            :
            <Controls
              play={playSound}
              pause={pauseSound}
              stop={stopSound}
              loop={() => loopSound(this.state.isLooping)}
              isLooping={this.state.isLooping}
              isPlaying={this.state.isPlaying} />
          }
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
