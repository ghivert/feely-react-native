import React, { useState } from 'react'
import Native, { View, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'

import {
  STANDARD_PADDING,
  LARGE_PADDING,
} from '../styles/constants'
import {
  WHITE,
  TOPBAR_BACKGROUND_COLOR,
  HARD_SHADOW,
  NEW_MESSAGE_BUTTON_COLOR,
} from '../styles/colors'
import { Round } from '../feely-ui'

const MAIN_SIZE = 30

interface SendButtonProps {
  active: boolean,
  onPress: (event: Native.GestureResponderEvent) => void,
}
const TouchableIfActive: React.SFC<SendButtonProps> = ({ active, onPress, children }) => {
  if (active) {
    return (
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}

const SendButton: React.SFC<SendButtonProps> = ({ active, onPress }) => (
  <TouchableIfActive active={active} onPress={onPress}>
    <Round size={MAIN_SIZE * 1.5} backgroundColor={active ? NEW_MESSAGE_BUTTON_COLOR : HARD_SHADOW}>
      <FeatherIcon name='send' color={WHITE} size={20}/>
    </Round>
  </TouchableIfActive>
)

interface MessageField {
  backgroundColor?: string,
  onSubmit?: (content: string) => void,
}
const MessageField: React.SFC<MessageField> = ({ backgroundColor, onSubmit }) => {
  const [ content, setContent ] = useState('')
  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor || WHITE }}>
      <View style={styles.main}>
        <AntIcon name='camerao' color={HARD_SHADOW} size={MAIN_SIZE}/>
        <TextInput
          value={content}
          onChangeText={setContent}
          style={styles.input}
          placeholder='Your message'
          multiline={true}
        />
        <SendButton
          onPress={() => onSubmit
            ? onSubmit(content)
            : console.warn(`Field pressed: ${content}`)
          }
          active={content !== ''}
        />
      </View>
    </SafeAreaView>
  )
}

export default MessageField

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: LARGE_PADDING,
  },
  input: {
    flex: 1,
    marginHorizontal: STANDARD_PADDING,
    color: TOPBAR_BACKGROUND_COLOR,
    fontSize: 14,
    fontWeight: '500',
    flexShrink: 1,
    minHeight: 30,
  },
})
