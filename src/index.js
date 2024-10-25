import { initializeApp } from "firebase/app"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo
} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFZ64X3cXr2K-TefHqdfDFZAW6zy6QZbg",
    authDomain: "promptineerings.firebaseapp.com",
    projectId: "promptineerings",
    storageBucket: "promptineerings.appspot.com",
    messagingSenderId: "357887254568",
    appId: "1:357887254568:web:044af9c1c184b96c8ad51d",
    measurementId: "G-RHBZ0VVT6G"
  }

initializeApp(firebaseConfig)

const auth = getAuth()






const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    try{
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        // console.log('user created: ', credentials.user)
        signupForm.reset()
    }catch(err){
        console.log(err.message)
    }
    

})


const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', async () => {
    try{
        signOut(auth)
        // console.log('user logged out')
    }catch(err){
        console.log(err.message)
    }
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    try{
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        // console.log('user logged in: ', credentials.user)
    }catch(err){
        console.log(err.message)
    }

})

const loginGoogleButton = document.querySelector('.loginGoogle')
loginGoogleButton.addEventListener('click', () => {

    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            const moreData = getAdditionalUserInfo(result)

            console.log('user: ' + JSON.stringify(user) + ' with more data: ' + JSON.stringify(moreData))
        })
        .catch((err) => {
            const errorCode = err.errorCode
            const errorMessage = err.errorMessage
            const email = err.customData.email
            const credential = GoogleAuthProvider.credentialFromError(err)

            console.log(errorMessage)
        })
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user)
})

const unsubButton = document.querySelector('.unsubscribe')
unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubAuth()
})