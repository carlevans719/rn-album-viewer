import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AlbumListView from './src/views/AlbumListView';
import AlbumView from './src/views/AlbumView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AlbumListView} />
        <Stack.Screen name="Album" component={AlbumView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
