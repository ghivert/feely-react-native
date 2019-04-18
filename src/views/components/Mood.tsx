import React from 'react'
import Native, { Text, StyleSheet } from 'react-native'

import { MEDIUM_GREY } from '../styles/colors'

interface MoodProps {
  style?: Native.StyleProp<Native.TextStyle>,
}
const Mood: React.SFC<MoodProps> = ({ style }) => (
  <Text style={[style, styles.mood]}>Relaxed</Text>
)

export default Mood

const styles = StyleSheet.create({
  mood: {
    color: MEDIUM_GREY,
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '600',
  }
})
