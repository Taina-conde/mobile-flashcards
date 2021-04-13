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
        console.log('data', data)
        requestPermissionsAsync()
        .then((response) => {
          console.log('response', response)
          console.log('ios status', response.ios.status)
          if (response.status === 'granted' && response.ios.status === 2 ) {
            

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

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
                hour: 18,
                minute: 44,
                repeats : true,
              }
            })
            setObjectValue(true)
          }
        })
      })
  }