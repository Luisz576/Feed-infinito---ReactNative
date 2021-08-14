import React from 'react';
import { View } from 'react-native';
import MyList from './src/components/MyList';

export default function App() {
  return(
    <View style={{ flex: 1, marginRight: 10 }}>
      <MyList/>
    </View>
  );
}