import Navigation from 'react-navigation'
import AllChats from './views/page/AllChats'
import NewMessage from './views/page/NewMessage'

export default Navigation.createAppContainer(
  Navigation.createStackNavigator(
    {
      AllChats,
      NewMessage,
    },
    {
      initialRouteName: 'AllChats',
      headerMode: 'none',
    }
  )
)
