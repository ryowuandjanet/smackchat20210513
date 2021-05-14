<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        
        <q-btn 
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          flat
          dense 
          icon="arrow_back" 
          label="BACK" />

        <q-toolbar-title class="absolute-center">
          {{ title }} 
        </q-toolbar-title>

        <q-btn 
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense 
          icon="account_circle" 
          label="Login" />

        <q-btn 
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense 
          icon="account_circle" 
        >
          Logout<br>
          {{ userDetails.name }}
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapState('store',['userDetails']),
      title() {
        console.log(this.$route)
        let currentPath = this.$route.fullPath
        if (currentPath == '/') return 'SmackChat'
        else if (currentPath == '/chat') return 'Chat'
        else if (currentPath == '/auth') return 'Login'
      }
    },
    methods: {
      ...mapActions('store',['logoutUser'])
    }
  }
</script>
<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.2
</style>
