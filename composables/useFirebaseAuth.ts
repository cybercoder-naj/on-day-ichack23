import {
    sendSignInLinkToEmail,
    signInWithEmailLink,
    ActionCodeSettings,
    isSignInWithEmailLink,
    signOut,
    onAuthStateChanged,
    User
} from '@firebase/auth'
import { KEY_LOCAL_EMAIL_SIGNIN } from "~~/constants"

const actionCodeSettings: ActionCodeSettings = {
    url: 'http://localhost:3000/login',
    handleCodeInApp: true
}

export default function () {
    const { $auth } = useNuxtApp()
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

    const signInUserWithEmailLink = async (email: string): Promise<FirebaseResponse> => {
        try {
            await sendSignInLinkToEmail($auth, email, actionCodeSettings)
            window.localStorage.setItem(KEY_LOCAL_EMAIL_SIGNIN, email)
            return { success: true }
        } catch (error: unknown) {
            console.error(error)
            return error instanceof Error ?
                { success: false, error } :
                { success: false }
        }
    }

    const verifyEmailLinkSignIn = async (): Promise<FirebaseResponse> => {
        if (isSignInWithEmailLink($auth, window.location.href)) {
            let email = window.localStorage.getItem(KEY_LOCAL_EMAIL_SIGNIN)
            if (!email)
                email = window.prompt('Please provide your email for confirmation')

            if (email === null)
                return verifyEmailLinkSignIn()

            try {
                const result = await signInWithEmailLink($auth, email, window.location.href)
                if (result) {
                    user.value = result.user
                    window.localStorage.removeItem(KEY_LOCAL_EMAIL_SIGNIN)
                    return { success: true }
                }
            } catch (error: unknown) {
                console.error(error)
                return error instanceof Error ? { success: false, error } : { success: false }
            }
        }
        return { success: false }
    }

    const signOutUser = async (): Promise<boolean> => {
        try {
            await signOut($auth)
            user.value = null
            return true
        } catch (error: unknown) {
            return false
        }
    }

    return {
        signInUserWithEmailLink,
        verifyEmailLinkSignIn,
        signOutUser,
        initAuth,
        user
    }
}
