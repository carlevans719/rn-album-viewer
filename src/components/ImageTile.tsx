import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

type ImageTile = (params: { onClick?: () => void, uri: string, label?: string }) => JSX.Element;

const ImageTile: ImageTile = ({ onClick = () => {}, uri, label }) => {
  return (
    <View
      style={styles.tile}
      onTouchEnd={onClick}
    >
      <Image style={styles.image} source={{ uri }} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '49%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden', 
    backgroundColor: '#AA0000',
    marginBottom: 10,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFFFFF',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageTile;
