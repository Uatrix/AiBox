<template>
    <q-layout>
        <q-header>
            <q-bar dense class="bg-blue-grey-1 q-electron-drag text-black text-weight-bold electron-only">
                <q-btn flat disable dense label="AiBox" />
                <q-space />
                <q-btn dense flat icon="minimize" />
                <q-btn dense flat icon="crop_square" />
                <q-btn dense flat icon="close" />
            </q-bar>
<!--            <q-toolbar class="text-primary bg-white">-->
<!--                <q-btn flat round dense>-->
<!--                    <q-icon name="menu" />-->
<!--                </q-btn>-->
<!--&lt;!&ndash;                <q-toolbar-title>&ndash;&gt;-->
<!--&lt;!&ndash;                    AiBox&ndash;&gt;-->
<!--&lt;!&ndash;                </q-toolbar-title>&ndash;&gt;-->
<!--                <q-space />-->
<!--                <q-btn flat round dense>-->
<!--                    <q-icon name="more_vert" />-->
<!--                </q-btn>-->

<!--            </q-toolbar>-->
        </q-header>
        <q-drawer
            v-if="false"
            v-model="drawer"
            show-if-above
            :mini="true"
            :width="200"
            :breakpoint="400"
            class="bg-grey-2"
        >
                <q-list class="fit column">
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="menu" />
                        </q-item-section>

                        <q-item-section>
                            Inbox
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple to="/">
                        <q-item-section avatar>
                            <q-icon name="chat_bubble_outline" />
                        </q-item-section>

                        <q-item-section>
                            Chats
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="star" />
                        </q-item-section>

                        <q-item-section>
                            Star
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-icon name="drafts" />
                        </q-item-section>

                        <q-item-section>
                            Drafts
                        </q-item-section>
                    </q-item>

                    <q-space />

                    <q-item clickable v-ripple to="/settings">
                        <q-item-section avatar>
                            <q-icon name="settings" />
                        </q-item-section>

                        <q-item-section>
                            Send
                        </q-item-section>
                    </q-item>

                </q-list>
        </q-drawer>
        <q-page-container>
            <q-page class="relative-position">
               <view class="absolute-full">
                   <router-view />
               </view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-facing-decorator';
	@Component
	export default class Layout extends Vue {
        protected drawer:boolean = false
	};
</script>

<style>

</style>
