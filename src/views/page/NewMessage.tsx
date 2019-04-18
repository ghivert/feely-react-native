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

interface HeaderProps {
  navigation: any,
}
const Header = ({ navigation }: HeaderProps) => (
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

interface SearchProps {}
const Search = (_props: SearchProps) => (
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

interface ContactsProps {}
const Contacts = (_props: ContactsProps) => (
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

interface MessageFieldProps {}
const MessageField = (_props: MessageFieldProps) => (
  <SafeAreaView>
    <TextInput
      style={styles.message.input}
      placeholder='Your message'
      multiline={true}
    />
  </SafeAreaView>
)

interface Props {
  navigation: any,
}
export default ({ navigation }: Props) => (
  <KeyboardAvoidingView behavior='padding'>
    <View style={styles.main.main}>
      <Header navigation={navigation}/>
      <Search/>
      <Contacts/>
      <MessageField/>
    </View>
  </KeyboardAvoidingView>
)

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
