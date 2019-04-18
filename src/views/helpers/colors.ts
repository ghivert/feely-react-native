import {
  LIGHT_GREEN,
  BROWN,
  MAGENTA,
  LIGHT_RED,
  SUNNY_YELLOW,
  LIGHT_YELLOW,
  LIGHT_PURPLE,
} from '../styles/colors'

let counter = 0
const getRandom = (): string => {
  const color = selectColor()
  counter = (counter + 1) % 7
  return color
}

const selectColor = (): string => {
  switch(counter) {
    case 0: return LIGHT_GREEN
    case 1: return BROWN
    case 2: return MAGENTA
    case 3: return LIGHT_RED
    case 4: return SUNNY_YELLOW
    case 5: return LIGHT_YELLOW
    case 6: return LIGHT_PURPLE
    default: throw new Error('Random color undefined.')
  }
}

export { getRandom }
