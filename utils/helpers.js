 import { AsyncStorage } from 'react-native'
 import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcards : notifications'

 export function getDecks() {

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
      ios : {
        sound: true,
      },
      android : {
        sound: true, 
        priority: 'high',
        sticky: false,
        vibrate: true,
      },
    }
  }
  export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then(data => {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleNotificationAsync(createNotification(),{
              time: tomorrow,
              repeat : 'day',
            })
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      })
  }