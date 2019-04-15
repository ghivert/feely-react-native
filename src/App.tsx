import Navigation from 'react-navigation'
import AllChats from './views/AllChats'
import NewMessage from './views/NewMessage'

export default Navigation.createAppContainer(
  Navigation.createStackNavigator(
    {
      AllChats,
      NewMessage,
    },
    {
      initialRouteName: 'NewMessage',
      headerMode: 'none',
    }
  )
)
