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
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import faker from 'faker'

import { Round, Spacer } from '../feely-ui'
import ActivityIndicator from '../components/ActivityIndicator'
import ListSeparator from '../components/ListSeparator'
import ContactsItem from '../components/ContactsItem'
import ProfilePicture from '../components/HeaderProfilePicture'
import Mood from '../components/Mood'
import * as Color from '../helpers/colors'
import {
  TINY_PADDING,
  SMALL_PADDING,
  STANDARD_PADDING,
  MEDIUM_PADDING,
  XLARGE_PADDING,
  PROFILE_PICTURE_SIZE,
} from '../styles/constants'
import {
  ICON_GREY,
  DARK_MEDIUM_GREY,
  MEDIUM_GREY,
  TOPBAR_BACKGROUND_COLOR,
  NEW_MESSAGE_BUTTON_COLOR,
  DARK_PALE_GREY,
  PALE_GREY,
  HARD_SHADOW,
  CONTACTS_PALE_GREY,
} from '../styles/colors'
import commonStyles from '../styles'

interface PeoplesIconProps {
  onPress: (event: Native.GestureResponderEvent) => void,
}
const PeoplesIcon: React.SFC<PeoplesIconProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.topBar.itemPadding}>
      <AntIcon name='contacts' size={25} color={ICON_GREY}/>
    </View>
  </TouchableOpacity>
)

interface TopBarProps {
  onIconPress: (event: Native.GestureResponderEvent) => void,
  onProfilePicturePress: (event: Native.GestureResponderEvent) => void,
}
const TopBar: React.SFC<TopBarProps> = ({ onIconPress, onProfilePicturePress }) => (
  <SafeAreaView style={styles.topBar.main}>
    <PeoplesIcon onPress={onIconPress}/>
    <Text style={styles.topBar.title}>Chat</Text>
    <ProfilePicture
      onPress={onProfilePicturePress}
      activityBackgroundColor={TOPBAR_BACKGROUND_COLOR}
    />
  </SafeAreaView>
)

const RandomColor: React.SFC = (_props) => (
  <View
    style={[
      styles.conversationsItem.randomColor,
      { backgroundColor: Color.getRandom() },
    ]}
  />
)

interface ImageIndicatorProps {
  source: Native.ImageSourcePropType,
}
const ImageIndicator: React.SFC<ImageIndicatorProps> = ({ source }) => (
  <ImageBackground
    source={source}
    style={styles.common.responsiveSquare}
    resizeMode='cover'
  />
)

const LastHour: React.SFC = (_props) => (
  <Text style={styles.conversationsItem.lastHour}>now</Text>
)

const ActivityIndicatorIfPresent: React.SFC = (_props) => {
  if (Math.random() < 0.5) {
    return <ActivityIndicator color='white'/>
  } else {
    return null
  }
}

const NameAndOnlineActivityIndicator: React.SFC = (_props) => (
  <View style={[styles.common.row, styles.conversationsItem.nameAndActivity]}>
    <Text style={styles.conversationsItem.name}>{faker.name.findName()}</Text>
    <ActivityIndicatorIfPresent/>
  </View>
)

const LastMessage: React.SFC = (_props) => (
  <Text
    numberOfLines={1}
    ellipsizeMode='tail'
    style={styles.conversationsItem.lastMessage}
  >
    {faker.lorem.sentence()}
  </Text>
)

const MoodAndName: React.SFC = (_props) => (
  <View style={styles.conversationsItem.moodAndName}>
    <Mood/>
    <Spacer size={TINY_PADDING}/>
    <NameAndOnlineActivityIndicator/>
    <Spacer size={TINY_PADDING}/>
    <LastMessage/>
  </View>
)

const ConversationsItemDetails: React.SFC = (_props) => {
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
const ConversationsListItem: React.SFC<ConversationsListItemProps> = (_props) => (
  <View style={styles.common.row}>
    <ImageIndicator source={{ uri: faker.image.imageUrl() }}/>
    <RandomColor/>
    <ConversationsItemDetails/>
  </View>
)

const renderConversationsListItem: Native.ListRenderItem<number> = ({ index, item }) => (
  <ConversationsListItem index={index} item={item}/>
)

const ConversationsList: React.SFC = (_props) => (
  <FlatList
    data={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
    renderItem={renderConversationsListItem}
    keyExtractor={(_item, index) => index.toString()}
    ItemSeparatorComponent={ListSeparator}
    ListHeaderComponent={ListSeparator}
    ListFooterComponent={ListSeparator}
  />
)

const NewMessageButton: React.SFC<NavigationScreenProps> = ({ navigation }) => (
  <View style={[styles.newMessageButton.wrapper, styles.common.shadow]}>
    <TouchableOpacity onPress={() => navigation.navigate('NewMessage')}>
      <Round size={PROFILE_PICTURE_SIZE} backgroundColor={NEW_MESSAGE_BUTTON_COLOR}>
        <MaterialIcon size={30} name='add' color={PALE_GREY}/>
      </Round>
    </TouchableOpacity>
  </View>
)

const useAnimation = (right: number, state: Animated.Value) => {
  React.useEffect(() => {
    Animated.timing(state, {
      toValue: right,
      duration: 350,
    }).start()
  })
}

const computeRight = (state: Animated.Value) => ({
  right: state.interpolate({
    inputRange: [ 0, 120 ],
    outputRange: [ '0%', '120%' ],
  }),
})

const renderContactsBarItem = () => (
  <ContactsItem
    indicatorColor={CONTACTS_PALE_GREY}
    padIndicator={true}
  />
)

const ContactsBarList: React.SFC = (_props) => (
  <View style={[styles.contactsBar.background, styles.common.shadow]}>
    <SafeAreaView>
      <FlatList
        data={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderContactsBarItem}
      />
    </SafeAreaView>
  </View>
)

interface ContactsBarBackProps {
  onClose: (event: Native.GestureResponderEvent) => void,
}
const ContactsBarBack: React.SFC<ContactsBarBackProps> = ({ onClose }) => (
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={{ flex: 1 }}/>
  </TouchableWithoutFeedback>
)

interface ContactsBarProps {
  right: number,
  onClose: (event: Native.GestureResponderEvent) => void,
}
const ContactsBar: React.SFC<ContactsBarProps> = ({ right, onClose }) => {
  const [ state ] = React.useState(new Animated.Value(right))
  useAnimation(right, state)
  return (
    <Animated.View style={[styles.contactsBar.main, computeRight(state)]}>
      <ContactsBarList/>
      <ContactsBarBack onClose={onClose}/>
    </Animated.View>
  )
}

const AllChats: React.SFC<NavigationScreenProps> = ({ navigation }) => {
  const [ state, setState ] = React.useState(120)
  return (
    <View style={styles.common.full}>
      <StatusBar barStyle='light-content'/>
      <TopBar
        onIconPress={() => setState(0)}
        onProfilePicturePress={() => {
          console.warn('Profile Picture Pressed')
        }}
      />
      <ConversationsList/>
      <NewMessageButton navigation={navigation}/>
      <ContactsBar right={state} onClose={() => setState(120)}/>
    </View>
  )
}

export default AllChats

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
      color: DARK_PALE_GREY,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontSize: 16,
    },
  }),
  conversationsItem: StyleSheet.create({
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
    lastHour: {
      color: MEDIUM_GREY,
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
      color: DARK_MEDIUM_GREY,
    },
  }),
  newMessageButton: StyleSheet.create({
    wrapper: {
      zIndex: 1,
      position: 'absolute',
      bottom: XLARGE_PADDING,
      right: XLARGE_PADDING,
    },
  }),
  contactsBar: StyleSheet.create({
    main: {
      flexDirection: 'row',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    background: {
      backgroundColor: CONTACTS_PALE_GREY,
    },
  }),
}
