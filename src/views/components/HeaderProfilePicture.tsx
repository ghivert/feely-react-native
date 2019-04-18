import React from 'react'
import Native, { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import faker from 'faker'

import ActivityIndicator from './ActivityIndicator'
import {
  TOPBAR_BACKGROUND_COLOR,
} from '../styles/colors'
import {
  STANDARD_PADDING,
  TINY_PROFILE_PICTURE_SIZE,
} from '../styles/constants'

interface ProfilePictureProps {
  onPress: (event: Native.GestureResponderEvent) => void,
  activityBackgroundColor?: string,
}
const ProfilePicture: React.SFC<ProfilePictureProps> = ({ onPress, activityBackgroundColor }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.itemPadding}>
      <ImageBackground
        source={{ uri: faker.image.people() }}
        style={styles.profilePictureContainer}
        imageStyle={styles.profilePictureImage}
      >
        {activityBackgroundColor
          ? <ActivityIndicator color={activityBackgroundColor}/>
          : null
        }
      </ImageBackground>
    </View>
  </TouchableOpacity>
)

export default ProfilePicture

const styles = StyleSheet.create({
  itemPadding: {
    padding: STANDARD_PADDING,
  },
  profilePictureContainer: {
    width: TINY_PROFILE_PICTURE_SIZE,
    height: TINY_PROFILE_PICTURE_SIZE,
    alignItems: 'flex-end',
  },
  profilePictureImage: {
    borderRadius: TINY_PROFILE_PICTURE_SIZE / 2,
  },
})
