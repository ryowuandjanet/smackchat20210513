import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state={
  userDetails: {}
}
const mutations={
  setUserDetails(state,payload){
    state.userDetails =payload
  }
}

const actions={
	registerUser({}, payload) {
		firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
     .then(response => {
				console.log(response)
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/'+userId).set({
          name:payload.name,
          email:payload.email,
          online:true
        })
     })
     .catch(error => {
				console.log(error.message)
     })
	},
  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      console.log('handleAuthStateChanged')
      if(user){
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/'+userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails',{
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
          dispatch('firebaseUpdateUser',{
            userId: userId,
            updates: {
              online: true
            }
          })
          this.$router.push('/',() => {})
        })
      } else {
        // User is logged out
        console.log('setUserDetails:',{})
        dispatch('firebaseUpdateUser',{
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails',{})
        this.$router.replace('/auth',() => {})
      }
    }) 
  },
  firebaseUpdateUser({},payload){
    console.log('payload:',payload)
    if(payload.userId){
      firebaseDb.ref("users/"+payload.userId).update(payload.updates)
    }
  },
  logoutUser() {
    firebaseAuth.signOut()
  }
}

const getters={

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}