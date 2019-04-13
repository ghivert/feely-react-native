import React from 'react'
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import faker from 'faker'

const ACTIVITY_INDICATOR_SIZE = 10
const ACTIVITY_INDICATOR_INSIDE_SIZE = 5
const PROFILE_PICTURE_SIZE = 25
const STANDARD_PADDING = 12
const ICON_GREY = 'rgb(147, 148, 165)'
const TOPBAR_BACKGROUND_COLOR = 'rgb(60, 60, 90)'

interface ActivityIndicatorProps {
  color: string,
}
const ActivityIndicator = ({ color }: ActivityIndicatorProps) => (
  <View style={styles.activityIndicator.outside}>
    <View style={[ styles.activityIndicator.inside, { backgroundColor: color } ]}/>
  </View>
)

interface PeoplesIconProps {}
const PeoplesIcon = (_props: PeoplesIconProps) => (
  <View style={styles.topBar.itemPadding}>
    <Icon
      name='contacts'
      size={25}
      color={ICON_GREY}
    />
  </View>
)

interface ProfilePictureProps {}
const ProfilePicture = (_props: ProfilePictureProps) => (
  <View style={styles.topBar.itemPadding}>
    <ImageBackground
      source={{ uri: faker.image.imageUrl() }}
      style={styles.topBar.profilePictureContainer}
      imageStyle={styles.topBar.profilePictureImage}
    >
      <ActivityIndicator color={TOPBAR_BACKGROUND_COLOR}/>
    </ImageBackground>
  </View>
)

interface TopBarProps {}
const TopBar = (_props: TopBarProps) => (
  <SafeAreaView style={styles.topBar.main}>
    <PeoplesIcon/>
    <Text style={styles.topBar.title}>Chat</Text>
    <ProfilePicture/>
  </SafeAreaView>
)

interface ConversationsListItemProps {
  index: number,
  item: Object,
}
const renderConversationsListItem = ({ index, item }: ConversationsListItemProps) => {
  return (
    <View>
      <Text>{`Index: ${index}`}</Text>
      <Text>{`Test: ${item}`}</Text>
    </View>
  )
}

interface ConversationsListProps {}
const ConversationsList = (_props: ConversationsListProps) => (
  <FlatList
    data={[ 1, 2, 3, 4, 5 ]}
    renderItem={renderConversationsListItem}
    keyExtractor={(_item, index) => index.toString()}
  />
)

interface Props {}
export default (_props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content'/>
      <TopBar/>
      <ConversationsList/>
    </View>
  )
}

const styles = {
  topBar: StyleSheet.create({
    main: {
      flexDirection: 'row',
      backgroundColor: TOPBAR_BACKGROUND_COLOR,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemPadding: {
      padding: STANDARD_PADDING,
    },
    title: {
      color: 'rgb(240, 240, 240)',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 16,
    },
    profilePictureContainer: {
      width: PROFILE_PICTURE_SIZE,
      height: PROFILE_PICTURE_SIZE,
      alignItems: 'flex-end',
    },
    profilePictureImage: {
      borderRadius: PROFILE_PICTURE_SIZE / 2,
    },
  }),
  activityIndicator: StyleSheet.create({
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
  }),
}
