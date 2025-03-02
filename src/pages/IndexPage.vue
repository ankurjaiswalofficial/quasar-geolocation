<template>
  <q-page class="flex flex-center">
    <q-btn label="Get Live Location" color="primary" @click="fetchLocation" />
    <q-card v-if="location" class="q-mt-md">
      <q-card-section>
        <div><strong>Latitude:</strong> {{ location.latitude }}</div>
        <div><strong>Longitude:</strong> {{ location.longitude }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      location: null,
    }
  },
  methods: {
    async fetchLocation() {
      console.log('Fetch Location Called')
      try {
        // if (window.cordova && window.cordova.platformId !== 'browser') {
        //   console.log(
        //     'Permissions Plugin available:',
        //     Object.keys(window.cordova?.plugins).includes('permissions')
        //   )
        //   console.log('Not a browser Platform')
        //   await this.requestPermissions()
        //   return
        // }
        console.log('After Permission Call ')
        this.location = await this.getCurrentLocation()
      } catch (error) {
        console.log(error)
      }
    },
    requestPermissions() {
      return new Promise((resolve, reject) => {
        // if (!window.cordova || !window.cordova.plugins.permissions) {
        //   reject('Cordova not available')
        //   return
        // }

        const permissions = cordova.plugins.permissions
        permissions.request(
          [permissions.ACCESS_FINE_LOCATION, permissions.ACCESS_COARSE_LOCATION],
          (status) => {
            if (status.hasPermission) {
              console.log('Permission Granted', {
                title: 'Permission Granted',
                message: 'Location granted is required for live tracking.',
                persistent: true,
              })
              resolve()
            } else {
              console.log('Permission Denied', {
                title: 'Permission Denied',
                message: 'Location permission is required for live tracking.',
                persistent: true,
              })
              reject('Location permission denied')
            }
          },
          (error) => reject(error)
        )
      })
    },

    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject('Geolocation is not supported')
          return
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location Received', {
              title: 'Location Received',
              message: 'Location granted is required for live tracking.',
              persistent: true,
            })
            resolve(position.coords)
          },
          (error) => {
            console.log('Location Denied', {
              title: 'Location Denied',
              message: 'Location granted is required for live tracking.',
              persistent: true,
            })
            reject(error.message)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
      })
    },
  },
}
</script>
