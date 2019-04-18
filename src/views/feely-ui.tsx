import React from 'react'
import Native, { View, StyleSheet } from 'react-native'

interface RowProps {
  style?: Native.StyleProp<Native.ViewStyle>,
}
const Row: React.SFC<RowProps> = ({ style, children }) => (
  <View style={[style, styles.row]}>
    {children}
  </View>
)

const generatePaddingStyle = ({ horizontal, vertical, all }: PaddingProps) => ({
  paddingHorizontal: horizontal,
  paddingVertical: vertical,
  padding: all,
})

interface PaddingProps {
  horizontal?: number,
  vertical?: number,
  all?: number,
}
const Padding: React.SFC<PaddingProps> = (props) => (
  <View style={generatePaddingStyle(props)}>
    {props.children}
  </View>
)

const generateRoundStyle = (size: number, backgroundColor: string) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor,
})

interface RoundProps {
  size: number,
  backgroundColor: string,
}
const Round: React.SFC<RoundProps> = ({ size, backgroundColor, children }) => (
  <View style={generateRoundStyle(size, backgroundColor)}>
    <Center>
      {children}
    </Center>
  </View>
)

const Center: React.SFC = ({ children }) => (
  <View style={styles.main}>
    {children}
  </View>
)

interface SpacerProps { size: number }
const Spacer: React.SFC<SpacerProps> = ({ size }) => (
  <View style={{ padding: size / 2 }}/>
)

export {
  Row,
  Padding,
  Center,
  Round,
  Spacer,
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
