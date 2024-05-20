// src/components/VideoCard.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { MaterialIcons } from '@expo/vector-icons';

const VideoCard = ({ source, title, description }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setIsVideoVisible(true)} style={styles.videoContainer}>
        {!isVideoVisible && (
          <View style={styles.overlay}>
            <MaterialIcons name="play-circle-outline" size={64} color="white" />
          </View>
        )}
        {isVideoVisible && (
          <Video source={source} style={styles.video} useNativeControls shouldPlay resizeMode="contain" />
        )}
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    overflow: "hidden",
  },
  videoContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 8,
  },
  description: {
    fontSize: 14,
    color: "#bbb",
    padding: 8,
  },
});

export default VideoCard;
