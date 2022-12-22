import { collection, getDocs } from 'firebase/firestore'

export default function () {
    const { $firestore } = useNuxtApp()

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

    return {
        verifyAlreadyRegisteredEmail
    }
}