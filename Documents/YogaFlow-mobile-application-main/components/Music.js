import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MusicPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState({});

  const tracks = [
    { 
      id: 1, 
      title: 'Расслабление', 
      duration: '2 min',
      uri: require('../assets/music/music1.mp3'),
      cover: require('../assets/audio_screensaver/1.jpg')
    },
    { 
      id: 2, 
      title: 'Спокойствие', 
      duration: '2 min',
      uri: require('../assets/music/music2.mp3'),
      cover: require('../assets/audio_screensaver/2.png')
    },
    { 
      id: 3, 
      title: 'Лесной дождь', 
      duration: '5 min',
      uri: require('../assets/music/rain.mp3'),
      cover: require('../assets/audio_screensaver/forest_rain.png')
    },
    { 
      id: 4, 
      title: 'Звуки природы', 
      duration: '5 min',
      uri: require('../assets/music/nature.mp3'),
      cover: require('../assets/audio_screensaver/nature.png')
    },
    { 
      id: 5, 
      title: 'Морской бриз', 
      duration: '6 min',
      uri: require('../assets/music/sea.mp3'),
      cover: require('../assets/audio_screensaver/sea.png')
    },
  ];

  // ... (остальные функции остаются без изменений)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Расслабляющие звуки</Text>
      
      <TouchableOpacity 
        style={styles.playNowButton}
        onPress={() => handlePlayPress(tracks[0])}
      >
        <Text style={styles.playNowText}>включите музыку</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {tracks.map((track) => (
        <View key={track.id} style={styles.trackContainer}>
          {/* Добавлен Image для обложки */}
          <Image 
            source={track.cover} 
            style={styles.trackCover}
            resizeMode="cover"
          />
          
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackDuration}>{track.duration}</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => handlePlayPress(track)}
            style={styles.playButton}
          >
            <Ionicons 
              name={activeTrack === track.id && isPlaying ? 'pause' : 'play'} 
              size={20} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(229, 211, 186, 0.9)',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    color: '#4A4A4A',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  playNowButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    width: SCREEN_WIDTH * 0.6,
    alignSelf: 'center',
  },
  playNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  trackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  trackCover: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: '#4A4A4A',
    fontSize: 18,
    marginBottom: 5,
  },
  trackDuration: {
    color: '#888',
    fontSize: 14,
  },
  playButton: {
    backgroundColor: '#4A4A4A',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});