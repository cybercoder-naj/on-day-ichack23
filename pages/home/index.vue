<script setup lang="ts">
const { user, signOutUser } = useFirebaseAuth()
const router = useRouter()

onMounted(() => {
    if (!user || !user.value) {
        // router.push("/login")
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
    <div id="home">
        <div class="header">
            <div>My Ticket</div>
        </div>
        <div class="message">
            <h1>Message From Organizers</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima hic, corrupti sapiente eos tempore nobis
                dolore voluptate ab sunt maiores ipsa, expedita sed quis voluptas reprehenderit rerum magni dignissimos?
                Amet? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error illum sequi quia eligendi.
                Reiciendis odit corporis facere illum, praesentium ducimus mollitia voluptates laborum! In cum quisquam
                ipsam libero asperiores vel!</p>
            <p class="time-updated">Last updated 3 minutes ago</p>
        </div>
        <div class="links">
            <div class="row">
                <HomeLink title="Get started" />
                <HomeLink title="Hack Hub" />
                <HomeLink title="HelpQ" />
            </div>
            <div class="row">
                <HomeLink title="Submission" />
                <HomeLink title="Code of Conduct" />
                <HomeLink title="Schedule" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#home {
    background-color: hotpink;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20vw;
}

.header {
    align-self: flex-end;
    margin-right: 2em;
    margin-bottom: 2em;
    padding: 12px 20px;
    background-color: blue;
    color: cyan;
    border-radius: 2em;
    font-size: 1.2em;
    font-weight: 700;
    font-style: italic;
}

.message {
    background-color: pink;
    padding: 1.5em;
    border-radius: 2em;
}

.message h1 {
    margin-bottom: 2em;
    color: blue;
    font-family: monospace;
}

.links {
    padding: 0 2em;
    margin-top: 1em;
}

.links .row {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
}
</style>