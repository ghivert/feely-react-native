import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import faker from 'faker'

import {
  STANDARD_PADDING,
  LARGE_PADDING,
  PROFILE_PICTURE_SIZE,
} from '../styles/constants'
import ActivityIndicator from './ActivityIndicator'

interface ContactsItemProps {
  indicatorColor: string,
  padIndicator?: boolean,
}
const ContactsItem = ({ indicatorColor, padIndicator }: ContactsItemProps) => (
  <View style={styles.main}>
    <Image
      source={{ uri: faker.image.people() }}
      style={styles.image}
    />
    <Text style={styles.title}>{faker.name.findName()}</Text>
    <View style={{ flex: padIndicator ? 1 : 0 }}/>
    <ActivityIndicator color={indicatorColor}/>
  </View>
)

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: STANDARD_PADDING,
    paddingHorizontal: LARGE_PADDING,
  },
  image: {
    width: PROFILE_PICTURE_SIZE,
    height: PROFILE_PICTURE_SIZE,
    borderRadius: PROFILE_PICTURE_SIZE / 2,
  },
  title: {
    paddingHorizontal: STANDARD_PADDING,
    fontWeight: '700',
    fontSize: 14
  },
})

export default ContactsItem
