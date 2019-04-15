import React from 'react'
import { View, StyleSheet } from 'react-native'

interface ListSeparatorProps {
  highlighted: number,
  leadingItem: React.Component,
}
const ListSeparator = (_props: ListSeparatorProps) => (
  <View style={styles.separator}/>
)

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgb(200, 200, 200)',
  }
})

export default ListSeparator
