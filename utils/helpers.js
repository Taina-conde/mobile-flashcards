import AsyncStorage from '@react-native-async-storage/async-storage';
 import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcards : notifications'

const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(NOTIFICATION_KEY, jsonValue)
  } catch(e) {
    console.log('There was an error setting notification key: ', e)
  }

  console.log('Done.')
}

 //notifications

 export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  function createNotification() {
    return {
      title: 'Study reminder 📚 ',
      body: "📝 Don't forget to complete at least one quiz today!",
    }
  }
  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowSound: true,
        allowBadge: true,
        provideAppNotificationSettings: true,
        allowAnnouncements: true,
      },
    });
  }
  
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        
        requestPermissionsAsync()
        .then((response) => {
          
          if (response.status === 'granted' && response.ios.status === 2 ) {

            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
              }),
            });

            Notifications.scheduleNotificationAsync({
              content: createNotification(),
              trigger: {
                hour: 20,
                minute: 0,
                repeats : true,
              }
            })
            setObjectValue(true)
          }
        })
      })
  }