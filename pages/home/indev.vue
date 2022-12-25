<script setup lang="ts">
const { user, signOutUser } = useFirebaseAuth()
const router = useRouter()

onMounted(() => {
    if (!user || !user.value) {
        router.push("/login")
    }
})

async function signOut() {
    const res = await signOutUser()
    if (res) {
        router.push('/login')
    }
}
</script>

<template>
    {{ user }}
    <br><br>
    <button @click="signOut">Log out</button>
</template>