<script setup lang="ts">
const codeChars = ref<string[]>([])

onBeforeMount(() => {
    for (let i = 0; i < 6; i++) {
        const codeNum = Math.random() * 36 >> 0
        codeChars.value.push(numberToCodeCharacter(codeNum))
    }

    function numberToCodeCharacter(num: number): string {
        if (num >= 0 && num <= 9)
            return num.toString()

        return String.fromCharCode(num + 55)
    }
})

onMounted(async () => {

    // @ts-ignore
    await QRCode.toCanvas(document.getElementById("qr-code"), representCodeChars.value, {
        width: 130,
        height: 130,
        errorCorrectionLevel: "L",
        type: "image/png",
        rendererOpts: {
            quality: 1,
        },
    });
})

useHead({
    script: [{ src: "https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/resources/script/qrcode.min.js" }]
})

const representCodeChars = computed(() => {
    const allChars = codeChars.value.join("")
    return allChars.slice(0, 3) + "-" + allChars.slice(3)
})
</script>

<template>
    <div id="home-qr">
        <div class="content">
            <span>Scan your ticket</span>
            <div class="ticket">
                <div class="qr-code-container">
                    <!-- <div class="qr-code"></div> -->
                    <canvas id="qr-code"></canvas>
                </div>
                <div class="typed-code">{{ representCodeChars }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#home-qr {
    background-color: hotpink;
    width: 100%;
    height: 100vh;
    display: grid;
    place-items: center;
}

.content {
    display: flex;
    flex-direction: column;
}

.content>span {
    background-color: blue;
    font-style: italic;
    color: cyan;
    font-weight: 700;
    padding: 10px;
    border-radius: 2em;
}

.ticket {
    background-color: blue;
    border-radius: 2em;
    margin-top: 1em;
    padding: 1em;
}

.qr-code-container {
    background: white;
    border-radius: 2em;
    padding: 1rem;
}

#qr-code {
    width: 200px;
    height: 200px;
}

div.typed-code {
    margin-top: 1em;
    font-size: 1.5rem;
    text-align: center;
    color: cyan;
    font-family: monospace;
}
</style>