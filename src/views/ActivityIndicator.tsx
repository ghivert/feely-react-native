import React from 'react'
import { View, StyleSheet } from 'react-native'

interface ActivityIndicatorProps {
  color: string,
}
const ActivityIndicator = ({ color }: ActivityIndicatorProps) => (
  <View style={styles.outside}>
    <View style={[ styles.inside, { backgroundColor: color } ]}/>
  </View>
)

const ACTIVITY_INDICATOR_SIZE = 10
const ACTIVITY_INDICATOR_INSIDE_SIZE = 5

const styles = StyleSheet.create({
  outside: {
    width: ACTIVITY_INDICATOR_SIZE,
    height: ACTIVITY_INDICATOR_SIZE,
    borderRadius: ACTIVITY_INDICATOR_SIZE / 2,
    backgroundColor: 'rgb(127, 212, 182)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inside: {
    width: ACTIVITY_INDICATOR_INSIDE_SIZE,
    height: ACTIVITY_INDICATOR_INSIDE_SIZE,
    borderRadius: ACTIVITY_INDICATOR_INSIDE_SIZE / 2,
  },
})

export default ActivityIndicator
