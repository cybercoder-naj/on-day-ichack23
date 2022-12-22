import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    ActionCodeSettings,
    isSignInWithEmailLink,
    signOut,
    onAuthStateChanged,
    User
} from '@firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { KEY_LOCAL_EMAIL_SIGNIN } from "~~/constants"

const actionCodeSettings: ActionCodeSettings = {
    url: 'http://localhost:3000/login',
    handleCodeInApp: true
}

export const useFirebase = () => {
    const { $auth, $firestore } = useNuxtApp()
    const user = useState<User | null>("firebase_user", () => null)

    const initAuth = () => {
        onAuthStateChanged($auth, fbuser => {
            if (fbuser)
                user.value = fbuser
            else {
                user.value = null
            }
        })
    }

    const verifyAlreadyRegisteredEmail = async (email: string): Promise<boolean> => {
        const querySnapshot = await getDocs(collection($firestore, "RegisteredUsers"))
        let emailPresent = false
        querySnapshot.forEach(doc => {
            if (email === doc.data().email) {
                emailPresent = true
                return
            }
        })
        return emailPresent
    }

    const signInUserWithEmailLink = async (email: string) => {
        try {
            sendSignInLinkToEmail($auth, email, actionCodeSettings)
            window.localStorage.setItem(KEY_LOCAL_EMAIL_SIGNIN, email)
        } catch (err) {
            console.log(err)
        }
    }

    const verifyEmailLinkSignIn = async () => {
        if (isSignInWithEmailLink($auth, window.location.href)) {
            let email = window.localStorage.getItem(KEY_LOCAL_EMAIL_SIGNIN)
            if (!email)
                email = window.prompt('Please provide your email for confirmation')

            if (email === null) {
                verifyEmailLinkSignIn()
                return
            }

            try {
                const result = await signInWithEmailLink($auth, email, window.location.href)
                if (result) {
                    useRouter().push('/home')
                }
                window.localStorage.removeItem(KEY_LOCAL_EMAIL_SIGNIN)
            } catch (err) {
                console.log(err)
            }
        }
    }

    const signOutUser = async () => {
        signOut($auth)
        useRouter().push('/login')
    }

    return {
        verifyAlreadyRegisteredEmail,
        signInUserWithEmailLink,
        verifyEmailLinkSignIn,
        signOutUser,
        initAuth,
        user
    }
}
