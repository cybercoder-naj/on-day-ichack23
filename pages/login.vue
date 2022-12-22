<script setup lang="ts">
const { verifyAlreadyRegisteredEmail } = useFirestore()
const {
    signInUserWithEmailLink,
    verifyEmailLinkSignIn,
    user
} = useFirebaseAuth()

const email = ref("")
const errorMessage = ref("")

onMounted(async () => {
    const router = useRouter()
    if (user && user.value) {
        router.push("/home")
        return
    }

    const res = await verifyEmailLinkSignIn()
    if (res.success) {
        router.push('/home')
    }
})

async function trySignIn() {
    const isRegisteredEmail = await verifyAlreadyRegisteredEmail(email.value)
    if (!isRegisteredEmail) {
        errorMessage.value = "You are not allowed to sign in"
        return
    }

    const res = await signInUserWithEmailLink(email.value)
    alert(res.success ? "Email has been sent" : res.error?.message)
}
</script>

<template>
    <div id="login">
        <div class="container">
            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                alt="place image here">

            <form @submit.prevent="trySignIn">
                <label for="email"></label>
                <input type="email" id="email" placeholder="Enter your email" name="email" v-model="email">

                <input type="submit" value="Send me a login link">
            </form>
        </div>
    </div>
</template>

<style scoped>
#login {
    background-color: rgb(135, 184, 247);
    display: grid;
    place-items: center;
    width: 100%;
    height: 100vh;
}

.container {
    background-color: rgb(206, 2, 104);
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form input[type="email"] {
    margin-top: 5rem;
    padding: 10px 12px;
    border: none;
    outline: none;
    border-radius: 0.5em;
}

form input[type="submit"] {
    background-color: black;
    color: white;
    border: none;
    outline: none;
    padding: 12px;
    border-radius: 0.5em;
    margin-top: 2rem;
    cursor: pointer;
}
</style>