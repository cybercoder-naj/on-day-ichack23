import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: "ichack23-test.firebaseapp.com",
        projectId: "ichack23-test",
        storageBucket: "ichack23-test.appspot.com",
        messagingSenderId: "1085525833816",
        appId: "1:1085525833816:web:3c0ef514746f71e1d3322d",
        measurementId: "G-2TGTERCR4T"
    };

    const app = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app)

    const auth = getAuth(app)
    const firestore = getFirestore(app)

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
})