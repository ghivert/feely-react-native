import React from 'react'
import Native, {
  View,
  FlatList,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import faker from 'faker'

import {
  TINY_PADDING,
  SMALL_PADDING,
  STANDARD_PADDING,
  MEDIUM_PADDING,
  XLARGE_PADDING,
  PROFILE_PICTURE_SIZE,
  SMALL_PROFILE_PICTURE_SIZE,
} from '../styles/constants'
import commonStyles from '../styles'
import ActivityIndicator from '../components/ActivityIndicator'
import ListSeparator from '../components/ListSeparator'
import ContactsItem from '../components/ContactsItem'

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

interface PeoplesIconProps {
  onPress: (event: Native.GestureResponderEvent) => void,
}
const PeoplesIcon = ({ onPress }: PeoplesIconProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.topBar.itemPadding}>
      <AntIcon name='contacts' size={25} color={ICON_GREY}/>
    </View>
  </TouchableOpacity>
)

interface ProfilePictureProps {
  onPress: (event: Native.GestureResponderEvent) => void,
}
const ProfilePicture = ({ onPress }: ProfilePictureProps) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.topBar.itemPadding}>
      <ImageBackground
        source={{ uri: faker.image.people() }}
        style={styles.topBar.profilePictureContainer}
        imageStyle={styles.topBar.profilePictureImage}
      >
        <ActivityIndicator color={TOPBAR_BACKGROUND_COLOR}/>
      </ImageBackground>
    </View>
  </TouchableOpacity>
)

interface TopBarProps {
  onIconPress: (event: Native.GestureResponderEvent) => void,
  onProfilePicturePress: (event: Native.GestureResponderEvent) => void,
}
const TopBar = ({ onIconPress, onProfilePicturePress }: TopBarProps) => (
  <SafeAreaView style={styles.topBar.main}>
    <PeoplesIcon onPress={onIconPress}/>
    <Text style={styles.topBar.title}>Chat</Text>
    <ProfilePicture onPress={onProfilePicturePress}/>
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

interface ConversationsListProps {}
const ConversationsList = (_props: ConversationsListProps) => (
  <FlatList
    data={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
    renderItem={renderConversationsListItem}
    keyExtractor={(_item, index) => index.toString()}
    ItemSeparatorComponent={ListSeparator}
    ListHeaderComponent={ListSeparator}
    ListFooterComponent={ListSeparator}
  />
)

interface NewMessageButtonProps {
  navigation: any,
}
const NewMessageButton = ({ navigation }: NewMessageButtonProps) => (
  <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
    <View style={[styles.newMessageButton.main, styles.shadow.hard]}>
      <MaterialIcon size={30} name='add' color='rgb(242, 242, 242)'/>
    </View>
  </TouchableOpacity>
)

interface ContactsBarProps {
  right: string,
  onClose: (event: Native.GestureResponderEvent) => void,
}
const ContactsBar = ({ right, onClose }: ContactsBarProps) => (
  <View
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      right,
      flexDirection: 'row',
    }}
  >
    <View
      style={[{
        backgroundColor: 'rgb(233, 236, 242)',
      }, styles.shadow.hard]}
    >
      <SafeAreaView>
        <FlatList
          data={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
          renderItem={() =>
            <ContactsItem
              indicatorColor='rgb(233, 236, 242)'
              padIndicator={true}
            />
          }
          keyExtractor={(_item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={{ flex: 1 }}/>
    </TouchableWithoutFeedback>
  </View>
)

interface Props {
  navigation: any,
}
export default ({ navigation }: Props) => {
  const [ state, setState ] = React.useState('120%')
  return (
    <View style={styles.common.full}>
      <StatusBar barStyle='light-content'/>
      <TopBar
        onIconPress={() => setState('0%')}
        onProfilePicturePress={console.log}
      />
      <ConversationsList/>
      <NewMessageButton navigation={navigation}/>
      <ContactsBar right={state} onClose={() => setState('120%')}/>
    </View>
  )
}

const styles = {
  common: commonStyles,
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
      width: SMALL_PROFILE_PICTURE_SIZE,
      height: SMALL_PROFILE_PICTURE_SIZE,
      alignItems: 'flex-end',
    },
    profilePictureImage: {
      borderRadius: SMALL_PROFILE_PICTURE_SIZE / 2,
    },
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
      width: PROFILE_PICTURE_SIZE,
      height: PROFILE_PICTURE_SIZE,
      borderRadius: PROFILE_PICTURE_SIZE / 2,
      backgroundColor: NEW_MESSAGE_BUTTON_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
}
