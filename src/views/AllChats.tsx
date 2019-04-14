import React from 'react'
import Native, {
  View,
  FlatList,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import faker from 'faker'

const ACTIVITY_INDICATOR_SIZE = 10
const ACTIVITY_INDICATOR_INSIDE_SIZE = 5
const PROFILE_PICTURE_SIZE = 25
const TINY_PADDING = 3
const SMALL_PADDING = 6
const STANDARD_PADDING = 12
const MEDIUM_PADDING = 18
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


let counter = 0
const getRandomColor = () => {
  const color = selectColor()
  counter = (counter + 1) % 7
  return color
}

const selectColor = () => {
  switch(counter) {
    case 0: return 'rgb(093, 196, 174)'
    case 1: return 'rgb(198, 174, 174)'
    case 2: return 'rgb(176, 110, 207)'
    case 3: return 'rgb(219, 116, 175)'
    case 4: return 'rgb(245, 208, 125)'
    case 5: return 'rgb(248, 220, 157)'
    case 6: return 'rgb(118, 124, 233)'
  }
}

interface RandomColorProps {}
const RandomColor = (_props: RandomColorProps) => (
  <View
    style={[
      styles.conversationsItem.randomColor,
      { backgroundColor: getRandomColor() },
    ]}
  />
)

interface ImageIndicatorProps {
  source: Native.ImageSourcePropType,
}
const ImageIndicator = ({ source }: ImageIndicatorProps) => (
  <ImageBackground
    source={source}
    style={styles.conversationsItem.profilePictureContainer}
  >
  </ImageBackground>
)

interface MoodProps {}
const Mood = (_props: MoodProps) => (
  <Text style={styles.conversationsItem.mood}>Relaxed</Text>
)

interface LastHourProps {}
const LastHour = (_props: LastHourProps) => (
  <Text style={styles.conversationsItem.lastHour}>now</Text>
)

interface NameAndOnlineActivityIndicatorProps {}
const NameAndOnlineActivityIndicator = (_props: NameAndOnlineActivityIndicatorProps) => (
  <View style={[styles.common.row, styles.conversationsItem.nameAndActivity]}>
    <Text style={styles.conversationsItem.name}>{faker.name.findName()}</Text>
    <ActivityIndicator color='white'/>
  </View>
)

interface LastMessageProps {}
const LastMessage = (_props: LastMessageProps) => (
  <Text
    numberOfLines={1}
    ellipsizeMode='tail'
    style={styles.conversationsItem.lastMessage}
  >
    {faker.lorem.sentence()}
  </Text>
)

interface SpacerProps { size: number }
const Spacer = ({ size }: SpacerProps) => (
  <View style={{ padding: size / 2 }}/>
)

interface ConversationsItemDetailsProps {}
const ConversationsItemDetails = (_props: ConversationsItemDetailsProps) => {
  const mainStyle = [
    styles.common.full,
    styles.common.row,
    styles.conversationsItem.details,
  ]
  return (
    <View style={mainStyle}>
      <View style={styles.conversationsItem.moodAndName}>
        <Mood/>
        <Spacer size={TINY_PADDING}/>
        <NameAndOnlineActivityIndicator/>
        <Spacer size={TINY_PADDING}/>
        <LastMessage/>
      </View>
      <View style={styles.common.baseline}>
        <LastHour/>
      </View>
    </View>
  )
}

interface ConversationsListItemProps {
  index: number,
  item: Object,
}
const renderConversationsListItem = ({ index, item }: ConversationsListItemProps) => {
  return (
    <View style={styles.common.row}>
      <ImageIndicator source={{ uri: faker.image.imageUrl() }}/>
      <RandomColor/>
      <ConversationsItemDetails/>
    </View>
  )
}

interface ConversationsListSeparatorProps {
  highlighted: number,
  leadingItem: React.Component,
}
const ConversationsListSeparator = (_props: ConversationsListSeparatorProps) => (
  <View style={styles.conversations.separator}/>
)

interface ConversationsListProps {}
const ConversationsList = (_props: ConversationsListProps) => (
  <FlatList
    data={[ 1, 2, 3, 4, 5 ]}
    renderItem={renderConversationsListItem}
    keyExtractor={(_item, index) => index.toString()}
    ItemSeparatorComponent={ConversationsListSeparator}
    ListFooterComponent={ConversationsListSeparator}
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
  common: StyleSheet.create({
    full: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    baseline: {
      alignItems: 'baseline',
    },
  }),
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
  conversations: StyleSheet.create({
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'rgb(200, 200, 200)',
    }
  }),
  conversationsItem: StyleSheet.create({
    profilePictureContainer: {
      width: 40,
      height: 40,
    },
    randomColor: {
      height: '100%',
      width: 10,
    },
    details: {
      padding: MEDIUM_PADDING,
    },
    moodAndName: {
      alignItems: 'baseline',
      flex: 1,
    },
    mood: {
      color: 'rgb(178, 178, 178)',
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: '600',
    },
    lastHour: {
      color: 'rgb(178, 178, 178)',
      fontSize: 10,
      fontWeight: '600',
    },
    nameAndActivity: {
      alignItems: 'center',
    },
    name: {
      fontWeight: '600',
      paddingRight: SMALL_PADDING,
    },
    lastMessage: {
      fontWeight: '500',
      color: 'rgb(160, 160, 160)',
    },
  }),
}
