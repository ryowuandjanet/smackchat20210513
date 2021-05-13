<template>
  <q-form>
    <q-input 
      v-if="tab == 'register'"
      v-model="formData.name" 
      class="q-mb-md"
      outlined 
      label="Name" />
    <q-input 
      v-model="formData.email" 
      class="q-mb-md"
      outlined 
      type="email"
      label="Email" />
    <q-input 
      v-model="formData.password" 
      class="q-mb-md"
      outlined 
      type="password"
      label="Password" />
    <div class="row">
      <q-space />
      <q-btn 
        color="primary" 
        @click="submitForm"
        :label="tab" />
    </div>
  </q-form>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: ['tab'],
    data() {
      return{
        formData: {
          name: '',
          email: '',
          password: '',
        }
      }
    },
    methods: {
      ...mapActions('store', ['registerUser']),
      submitForm() {
        if(this.tab == 'login') {
          console.log('login the user')
        } else {
          this.registerUser(this.formData)
        }
      }
    }
  }
</script>
