import { Dialog } from 'quasar'

export default {
  requestPermissions() {
    return new Promise((resolve, reject) => {
      if (!window.cordova || !cordova.plugins.permissions) {
        reject("Cordova not available")
        return
      }

      const permissions = cordova.plugins.permissions
      permissions.requestPermissions(
        [
          permissions.ACCESS_FINE_LOCATION,
          permissions.ACCESS_COARSE_LOCATION
        ],
        (status) => {
          if (status.hasPermission) {
          Dialog.create({
            title: "Permission Granted",
            message: "Location granted is required for live tracking.",
            persistent: true
          })
            resolve()
          } else {
            Dialog.create({
              title: "Permission Denied",
              message: "Location permission is required for live tracking.",
              persistent: true
            })
            reject("Location permission denied")
          }
        },
        (error) => reject(error)
      )
    })
  },

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported")
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
        Dialog.create({
                    title: "Location Received",
                    message: "Location granted is required for live tracking.",
                    persistent: true
                  })
          resolve(position.coords)
        },
        (error) => {
        Dialog.create({
                    title: "Location Denied",
                    message: "Location granted is required for live tracking.",
                    persistent: true
                  })
          reject(error.message)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    })
  }
}
