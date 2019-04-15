import React from 'react'
import Native, {
  View,
  FlatList,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import faker from 'faker'

import ActivityIndicator from './ActivityIndicator'

// Sizes
const NEW_MESSAGE_BUTTON_SIZE = 50
const PROFILE_PICTURE_SIZE = 25

// Padding
const TINY_PADDING = 3
const SMALL_PADDING = 6
const STANDARD_PADDING = 12
const MEDIUM_PADDING = 18
const LARGE_PADDING = 24
const XLARGE_PADDING = 36

// Colors
const LIGHT_GREEN = 'rgb(093, 196, 174)'
const LIGHT_ORANGE = 'rgb(198, 174, 174)'
const MAGENTA = 'rgb(176, 110, 207)'
const LIGHT_RED = 'rgb(219, 116, 175)'
const SUNNY_YELLOW = 'rgb(245, 208, 125)'
const LIGHT_YELLOW = 'rgb(248, 220, 157)'
const LIGHT_PURPLE = 'rgb(118, 124, 233)'
const ICON_GREY = 'rgb(147, 148, 165)'
const TOPBAR_BACKGROUND_COLOR = 'rgb(60, 60, 90)'
const NEW_MESSAGE_BUTTON_COLOR = 'rgb(140, 140, 245)'

interface PeoplesIconProps {}
const PeoplesIcon = (_props: PeoplesIconProps) => (
  <View style={styles.topBar.itemPadding}>
    <AntIcon
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
const getRandomColor = (): string => {
  const color = selectColor()
  counter = (counter + 1) % 7
  return color
}

const selectColor = (): string => {
  switch(counter) {
    case 0: return LIGHT_GREEN
    case 1: return LIGHT_ORANGE
    case 2: return MAGENTA
    case 3: return LIGHT_RED
    case 4: return SUNNY_YELLOW
    case 5: return LIGHT_YELLOW
    case 6: return LIGHT_PURPLE
    default: throw new Error('Random color undefined.')
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
    style={styles.common.responsiveSquare}
    resizeMode='cover'
  />
)

interface MoodProps {}
const Mood = (_props: MoodProps) => (
  <Text style={styles.conversationsItem.mood}>Relaxed</Text>
)

interface LastHourProps {}
const LastHour = (_props: LastHourProps) => (
  <Text style={styles.conversationsItem.lastHour}>now</Text>
)

interface ActivityIndicatorIfPresentProps {}
const ActivityIndicatorIfPresent = (_props: ActivityIndicatorIfPresentProps) => {
  if (Math.random() < 0.5) {
    return <ActivityIndicator color='white'/>
  } else {
    return null
  }
}

interface NameAndOnlineActivityIndicatorProps {}
const NameAndOnlineActivityIndicator = (_props: NameAndOnlineActivityIndicatorProps) => (
  <View style={[styles.common.row, styles.conversationsItem.nameAndActivity]}>
    <Text style={styles.conversationsItem.name}>{faker.name.findName()}</Text>
    <ActivityIndicatorIfPresent/>
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

interface MoodAndNameProps {}
const MoodAndName = (_props: MoodAndNameProps) => (
  <View style={styles.conversationsItem.moodAndName}>
    <Mood/>
    <Spacer size={TINY_PADDING}/>
    <NameAndOnlineActivityIndicator/>
    <Spacer size={TINY_PADDING}/>
    <LastMessage/>
  </View>
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
      <View style={styles.common.row}>
        <MoodAndName/>
        <View style={styles.common.baseline}>
          <LastHour/>
        </View>
      </View>
    </View>
  )
}

interface ConversationsListItemProps {
  index: number,
  item: Object,
}
const ConversationsListItem = (_props: ConversationsListItemProps) => (
  <View style={styles.common.row}>
    <ImageIndicator source={{ uri: faker.image.imageUrl() }}/>
    <RandomColor/>
    <ConversationsItemDetails/>
  </View>
)

const renderConversationsListItem: Native.ListRenderItem<number> = ({ index, item }) => (
  <ConversationsListItem index={index} item={item}/>
)

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
    data={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
    renderItem={renderConversationsListItem}
    keyExtractor={(_item, index) => index.toString()}
    ItemSeparatorComponent={ConversationsListSeparator}
    ListHeaderComponent={ConversationsListSeparator}
    ListFooterComponent={ConversationsListSeparator}
  />
)

interface NewMessageButtonProps {}
const NewMessageButton = (_props: NewMessageButtonProps) => (
  <TouchableOpacity>
    <View style={[styles.newMessageButton.main, styles.shadow.hard]}>
      <MaterialIcon
        size={30}
        name='add'
        color='rgb(242, 242, 242)'
      />
    </View>
  </TouchableOpacity>
)

interface Props {}
export default (_props: Props) => (
  <View style={styles.common.full}>
    <StatusBar barStyle='light-content'/>
    <TopBar/>
    <ConversationsList/>
    <NewMessageButton/>
  </View>
)

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
    responsiveSquare: {
      flex: 1,
      aspectRatio: 1,
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
      flex: 3,
      alignItems: 'center'
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
  shadow: StyleSheet.create({
    light: {
      shadowColor: "#bbb",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62
    },
    hard: {
      shadowColor: "#666",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 2.62
    },
  }),
  newMessageButton: StyleSheet.create({
    main: {
      position: 'absolute',
      bottom: XLARGE_PADDING,
      right: XLARGE_PADDING,
      width: NEW_MESSAGE_BUTTON_SIZE,
      height: NEW_MESSAGE_BUTTON_SIZE,
      borderRadius: NEW_MESSAGE_BUTTON_SIZE / 2,
      backgroundColor: NEW_MESSAGE_BUTTON_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
}
