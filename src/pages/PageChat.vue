<template>
  <q-page class="flex column">

    <q-banner class="bg-grey-4 text-center fixed-top">
      User is offline
    </q-banner>

    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
      
    </div>

    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input 
            v-model="newMessage" 
            bg-color="white"
            label="Message" 
            class="full-width"
            outlined
            rounded
            dense>
            
            <template v-slot:after>
              <q-btn
                @click="sendMessage" 
                round 
                dense 
                flat 
                color="white"
                icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return{
        newMessage: ''
      }
    },
    computed: {
      ...mapState('store', ['messages', 'userDetails'])
    },
    methods: {
      ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages']),
      sendMessage() {
        this.messages.push({
          text: this.newMessage,
          from: 'me'
        })
      }
    },
    mounted(){
      this.firebaseGetMessages(this.$route.params.otherUserId)
    },
    destroyed() {
      this.firebaseStopGettingMessages()
    }

  }

</script>
