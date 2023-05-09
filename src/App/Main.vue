<template>
    <router-view />
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-facing-decorator';
    @Component
    export default class App extends Vue {

    };
</script>

<style>
    .flex-auto {
        flex: auto;
    }
    .column-reverse {
        display: flex;
        flex-direction: column-reverse;
    }
    .overflow-x-hidden {
        overflow-x: hidden;
    }
    .scroll-y {
        overflow-y: overlay;
        scroll-behavior: smooth;
        transition: all 0.5s ease;
        &:hover::-webkit-scrollbar {
            display: inherit;
        }

        &::-webkit-scrollbar {
            display: none;
            border-radius: 10px;
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background: #999;
            border-radius: 10px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
        }
    }
</style>
