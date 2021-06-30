import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import ImageTile from '../components/ImageTile';

export interface Album extends MediaLibrary.Album {
  asset: MediaLibrary.Asset,
  assetCount: number,
};

const AlbumListView = () => {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState([] as Album[]);
  
  useEffect(() => {
    MediaLibrary.requestPermissionsAsync()
      .then(() => MediaLibrary.getAlbumsAsync())
      .then(albums => Promise.all(albums.map(album => {
        return MediaLibrary
          .getAssetsAsync({
            first: 1,
            album,
            sortBy: [
              [MediaLibrary.SortBy.creationTime, false],
            ],
          })
          .then(assets => ({
            ...album,
            asset: assets.assets[0],
            assetCount: assets.totalCount,
          }))
      })))
      .then(albums => albums.filter(album => album.assetCount))
      .then(albums => setAlbums(albums));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.albumWrapper}>
        {albums.map(album => (
          <ImageTile
            key={album.id}
            onClick={() => navigation.navigate('Album', { album })}
            uri={album.asset.uri}
            label={album.title}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    paddingTop: 40,
  },
  albumWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
});

export default AlbumListView;
