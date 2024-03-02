<template>
    <div>
        <button @click="goMain">进入主页</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goMain = () => {
    router.push('/layout');
}
</script>
