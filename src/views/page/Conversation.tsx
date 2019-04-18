import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import faker from 'faker'

import { Row, Padding } from '../feely-ui'
import ResizingView from '../components/ResizingView'
import MessageField from '../components/MessageField'
import ActivityIndicator from '../components/ActivityIndicator'
import ProfilePicture from '../components/HeaderProfilePicture'
import Mood from '../components/Mood'
import * as Color from '../helpers/colors'

import {
  TINY_PADDING,
  SMALL_PADDING,
  STANDARD_PADDING,
  LARGE_PADDING,
} from '../styles/constants'
import {
  CONTACTS_PALE_GREY,
  TOPBAR_BACKGROUND_COLOR,
  HARD_SHADOW,
  WHITE,
} from '../styles/colors'
import commonStyles from '../styles'

const BackArrow: React.SFC<NavigationScreenProps> = ({ navigation }) => (
  <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
    <Icon
      name='ios-arrow-back'
      size={25}
      color={HARD_SHADOW}
      style={styles.common.full}
    />
  </TouchableWithoutFeedback>
)

const MoodAndName: React.SFC = () => (
  <View>
    <Mood style={styles.common.right}>Relaxed</Mood>
    <Text style={[styles.common.right, styles.header.name]}>
      {faker.name.findName()}
    </Text>
  </View>
)

interface HeaderProps extends NavigationScreenProps {
  backgroundColor: string,
}
const Header: React.SFC<HeaderProps> = ({ navigation, backgroundColor }) => (
  <View>
    <SafeAreaView style={{ backgroundColor }}/>
    <View style={[styles.common.white, styles.common.shadow]}>
      <Row style={styles.header.main}>
        <BackArrow navigation={navigation}/>
        <Padding horizontal={STANDARD_PADDING}>
          <ActivityIndicator color={WHITE}/>
        </Padding>
        <MoodAndName/>
        <ProfilePicture
          onPress={() => console.warn('Profile picture pressed.')}
        />
      </Row>
    </View>
  </View>
)

interface MessageProps {}
const Message: React.SFC<MessageProps> = (_props) => {
  const isMine = Math.random() < 0.5
  return (
    <View style={[styles.message.main, isMine ? styles.message.mine : null]}>
      <Text style={styles.message.text}>{faker.lorem.lines()}</Text>
    </View>
  )
}

const MessagesList: React.SFC = (_props) => (
  <FlatList
    contentContainerStyle={styles.message.wrapper}
    data={[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]}
    renderItem={({ item, index }) => <Message/>}
    keyExtractor={(_item, index) => index.toString()}
    inverted
  />
)

const Conversation: React.SFC<NavigationScreenProps> = ({ navigation }) => (
  <ResizingView>
    <Header backgroundColor={Color.getRandom()} navigation={navigation}/>
    <MessagesList/>
    <MessageField
      backgroundColor={CONTACTS_PALE_GREY}
      onSubmit={content => console.warn('Send message pressed.')}
    />
  </ResizingView>
)

export default Conversation

const styles = {
  common: commonStyles,
  header: StyleSheet.create({
    top: {
      height: 5,
    },
    main: {
      alignItems: 'center',
      paddingHorizontal: LARGE_PADDING,
      paddingVertical: SMALL_PADDING,
    },
    name: {
      fontWeight: '600',
    },
  }),
  message: StyleSheet.create({
    wrapper: {
      paddingVertical: STANDARD_PADDING,
      paddingHorizontal: LARGE_PADDING,
    },
    main: {
      maxWidth: '80%',
      borderWidth: 1,
      borderColor: CONTACTS_PALE_GREY,
      margin: TINY_PADDING,
      padding: STANDARD_PADDING,
      borderRadius: 2,
    },
    mine: {
      alignSelf: 'flex-end',
      backgroundColor: CONTACTS_PALE_GREY,
    },
    text: {
      color: TOPBAR_BACKGROUND_COLOR,
      lineHeight: 20,
    },
  }),
}
