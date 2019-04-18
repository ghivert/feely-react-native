import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'

import {
  STANDARD_PADDING,
  LARGE_PADDING,
  SMALL_PROFILE_PICTURE_SIZE,
} from '../styles/constants'
import {
  WHITE,
  ALMOST_WHITE,
  NEW_MESSAGE_BUTTON_COLOR,
  LIGHTER_PURPLE,
  PALE_GREY,
  DARK_PURPLE,
  XLIGHTER_PURPLE,
} from '../styles/colors'
import commonStyles from '../styles'
import ListSeparator from '../components/ListSeparator'
import ContactsItem from '../components/ContactsItem'

const Header: React.SFC<NavigationScreenProps> = ({ navigation }) => (
  <LinearGradient
    colors={[ NEW_MESSAGE_BUTTON_COLOR, LIGHTER_PURPLE ]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <SafeAreaView>
      <View style={styles.header.main}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.common.full}
        >
          <Icon
            name='md-close'
            size={25}
            color={ALMOST_WHITE}
          />
        </TouchableOpacity>
        <Text style={styles.header.title}>new message</Text>
        <View style={styles.common.full}/>
      </View>
    </SafeAreaView>
  </LinearGradient>
)

const Search: React.SFC = (_props) => (
  <LinearGradient
    colors={[ DARK_PURPLE, XLIGHTER_PURPLE ]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
  >
    <View style={styles.search.main}>
      <Text style={styles.search.title}>Write to:</Text>
      <TextInput style={styles.search.input}/>
    </View>
  </LinearGradient>
)

const Contacts: React.SFC = (_props) => (
  <FlatList
    style={styles.contacts.main}
    data={[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ]}
    renderItem={() => <ContactsItem indicatorColor={PALE_GREY}/>}
    keyExtractor={(_item, index) => index.toString()}
    ItemSeparatorComponent={ListSeparator}
    ListHeaderComponent={ListSeparator}
    ListFooterComponent={ListSeparator}
  />
)

const MessageField: React.SFC = (_props) => (
  <SafeAreaView>
    <TextInput
      style={styles.message.input}
      placeholder='Your message'
      multiline={true}
    />
  </SafeAreaView>
)

const ResizingView: React.SFC = ({ children }) => (
  <KeyboardAvoidingView behavior='padding'>
    <View style={styles.main.main}>
      {children}
    </View>
  </KeyboardAvoidingView>
)

const NewMessage: React.SFC<NavigationScreenProps> = (props) => (
  <ResizingView>
    <Header navigation={props.navigation}/>
    <Search/>
    <Contacts/>
    <MessageField/>
  </ResizingView>
)
export default NewMessage

const styles = {
  common: commonStyles,
  main: StyleSheet.create({
    main: {
      maxHeight: '100%',
      flexGrow: 1,
    },
  }),
  header: StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
      paddingVertical: STANDARD_PADDING,
      paddingHorizontal: LARGE_PADDING,
    },
    title: {
      flex: 1,
      textTransform: 'uppercase',
      textAlign: 'center',
      color: WHITE,
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
  }),
  search: StyleSheet.create({
    main: {
      flexDirection: 'row',
      padding: LARGE_PADDING,
    },
    title: {
      color: WHITE,
      fontWeight: '500',
      fontSize: 14,
    },
    input: {
      flex: 1,
      marginHorizontal: STANDARD_PADDING,
      color: WHITE,
    },
  }),
  contacts: StyleSheet.create({
    main: {
      flexGrow: 1,
      backgroundColor: PALE_GREY,
    },
  }),
  contactsItem: StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: STANDARD_PADDING,
      paddingHorizontal: LARGE_PADDING,
    },
    image: {
      width: SMALL_PROFILE_PICTURE_SIZE,
      height: SMALL_PROFILE_PICTURE_SIZE,
      borderRadius: SMALL_PROFILE_PICTURE_SIZE / 2,
    },
    title: {
      paddingHorizontal: STANDARD_PADDING,
      fontWeight: '700',
      fontSize: 14
    },
  }),
  message: StyleSheet.create({
    input: {
      margin: LARGE_PADDING,
      fontSize: 14,
      fontWeight: '500',
    },
  }),
}
