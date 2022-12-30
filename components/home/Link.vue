<script setup lang="ts">
interface HomeLink {
    title: string
}

const props = defineProps<HomeLink>()
</script>

<template>
    <div class="home-link">
        <h1>{{ title }}</h1>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt qui sint, vero magni possimus illum. Dolores
        soluta aperiam numquam iste delectus consequuntur eveniet fugit id asperiores magnam? Distinctio, itaque odio?</p>
    </div>
</template>

<style scoped>
.home-link {
    background-color: blue;
    width: 30%;
    border-radius: 2em;
    padding: 16px 20px;
}

.home-link h1 {
    color: cyan;
    font-family: monospace;
    margin-bottom: 0.5em;
}

.home-link p {
    color: white;
}
</style>