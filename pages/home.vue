<script setup lang="ts">
const { user, signOutUser } = useFirebase()

onMounted(() => {
    if (!user || !user.value) {
        const router = useRouter()
        router.push("/login")
    }
})
</script>

<template>
{{ user }}
<br><br>
<button @click="signOutUser">Log out</button>
</template>