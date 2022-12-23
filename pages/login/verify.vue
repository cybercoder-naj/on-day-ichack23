<script setup lang="ts">
const { verifyEmailLinkSignIn } = useFirebaseAuth()
const loginMessage = ref("Blah blah")
const loginStatus = ref(true)
const buttonMessage = computed(() => loginStatus.value ? "sign in" : "go back")

onMounted(() => {
    const res = await verifyEmailLinkSignIn()
    console.log(res);
})

function handleClick() {
    const router = useRouter()
    router.push(loginStatus.value ? "/home" : "/login")
}
</script>

<template>
<div>
    <div>
        {{ loginMessage }}
    </div>
    <button @click="handleClick">Click here to {{ buttonMessage }}.</button>
</div>
</template>