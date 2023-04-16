<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                        flat
                        dense
                        round
                        icon="menu"
                        aria-label="Menu"
                        @click="toggleLeftDrawer"
                />

                <q-toolbar-title>
                    AiBox
                </q-toolbar-title>

                <div>Version {{ $q.version }}</div>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-facing-decorator';
	@Component
	export default class Layout extends Vue {

	};
</script>
