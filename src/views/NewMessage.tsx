import React from 'react'
import Native, { View, SafeAreaView, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import ActivityIndicator from './ActivityIndicator'

interface HeaderProps {}
const Header = (_props: HeaderProps) => (
  <SafeAreaView>
    <View style={styles.header.main}>
      <Icon
        name='md-close'
        size={30}
        color='rgb(250, 250, 250)'
      />
      <Text>new message</Text>
    </View>
  </SafeAreaView>
)

interface SearchProps {}
const Search = (_props: SearchProps) => (
  <View>
    <Text>Write to:</Text>
    <TextInput/>
  </View>
)

interface ContactsItemProps {}
const ContactsItem = (_props: ContactsItemProps) => (
  <View/>
)

const renderContactsItem: Native.ListRenderItem<number> = () => (
  <ContactsItem/>
)

interface ContactsProps {}
const Contacts = (_props: ContactsProps) => (
  <FlatList
    data={[ 1, 2, 3, 4, 5, 6, 7, 8 ]}
    renderItem={renderContactsItem}
    keyExtractor={(_item, index) => index.toString()}
  />
)

interface MessageFieldProps {}
const MessageField = (_props: MessageFieldProps) => (
  <TextInput/>
)

interface Props {}
export default (_props: Props) => (
  <View style={styles.common.maxHeight}>
    <Header/>
    <Search/>
    <Contacts/>
    <MessageField/>
  </View>
)

const styles = {
  common: StyleSheet.create({
    maxHeight: {
      flexGrow: 1,
    },
  }),
  header: StyleSheet.create({
    main: {
      flexDirection: 'row',
    }
  }),
}
