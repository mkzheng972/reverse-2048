import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from './client/components/header/Header'
import Grid from './client/components/grid/Grid'

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Grid />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
