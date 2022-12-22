<script setup lang="ts">
onMounted(() => {
    const { initAuth } = useFirebase()
    initAuth()
})
</script>

<template>
    <div>
        <NuxtLink to="/login">Login Page</NuxtLink>
    </div>
</template>