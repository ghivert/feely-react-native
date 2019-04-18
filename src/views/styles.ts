import { StyleSheet } from 'react-native'

import { HARD_SHADOW, WHITE } from './styles/colors'

const styles = StyleSheet.create({
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
  right: {
    textAlign: 'right',
  },
  shadow: {
    shadowColor: HARD_SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.62
  },
  white: {
    backgroundColor: WHITE,
  }
})

export default styles
