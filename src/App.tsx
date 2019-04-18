import Navigation from 'react-navigation'
import NewMessage from './views/page/NewMessage'
import AllChats from './views/page/AllChats'

const screens: Navigation.NavigationRouteConfigMap = {
  AllChats,
  NewMessage,
}

const options: Navigation.StackNavigatorConfig = {
  initialRouteName: 'AllChats',
  headerMode: 'none',
}

export default Navigation.createAppContainer(
  Navigation.createStackNavigator(screens, options)
)
