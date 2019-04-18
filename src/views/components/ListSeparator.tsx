import React from 'react'
import { View, StyleSheet } from 'react-native'

import { SEPARATOR_GREY } from '../styles/colors'

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
    backgroundColor: SEPARATOR_GREY,
  }
})

export default ListSeparator
