import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import ImageTile from '../components/ImageTile';

const AlbumView = () => {
  const navigation = useNavigation();
  const { params: { album } } = useRoute<any>();
  const [assets, setAssets] = useState({} as MediaLibrary.PagedInfo<MediaLibrary.Asset>);

  useEffect(() => {
    navigation.setOptions({ title: album.title });

    MediaLibrary.getAssetsAsync({
      album,
    })
    .then(assets => {
      setAssets(assets);
    })
  }, [album]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        {assets?.assets?.map(asset => (
          <ImageTile key={asset.id} uri={asset.uri} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default AlbumView;
