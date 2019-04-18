import Navigation from 'react-navigation'
import NewMessage from './views/page/NewMessage'
import AllChats from './views/page/AllChats'
import Conversation from './views/page/Conversation'

const screens: Navigation.NavigationRouteConfigMap = {
  AllChats,
  NewMessage,
  Conversation,
}

const options: Navigation.StackNavigatorConfig = {
  initialRouteName: 'AllChats',
  headerMode: 'none',
}

export default Navigation.createAppContainer(
  Navigation.createStackNavigator(screens, options)
)
