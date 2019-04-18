import React from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native'

const ResizingView: React.SFC = ({ children }) => (
  <KeyboardAvoidingView behavior='padding' style={styles.full}>
    <View style={styles.main}>
      {children}
    </View>
  </KeyboardAvoidingView>
)

export default ResizingView

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  main: {
    maxHeight: '100%',
    flexGrow: 1,
  },
})
