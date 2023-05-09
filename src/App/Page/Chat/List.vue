<template>
    <view class="row">
        <q-toolbar>
            <q-btn flat round icon="menu"/>
            <q-input class="q-ml-sm" filled round dense icon="search" placeholder="搜索"/>
        </q-toolbar>
        <q-list class="q-pt-lg fit">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="bluetooth"/>
                </q-item-section>

                <q-item-section>ChatGPT-3.5</q-item-section>
            </q-item>
        </q-list>
<!--        <q-separator vertical class="q-mb-lg" />-->
        <view class="flex-auto column">
            <q-toolbar>
                <q-btn flat round icon="chat"/>
                <q-toolbar-title>
                    夸夸机
                </q-toolbar-title>
            </q-toolbar>
<!--            <view class="q-pa-md">-->
<!--                <q-icon name="chat" size="2rem" color="grey" />-->
<!--                <span color="text-grey" class="q-pl-sm">夸夸机</span>-->
<!--            </view>-->
            <q-separator class="q-mx-md" />
            <view class="flex-auto relative-position">
                <q-scroll-area class="absolute-full q-pa-md">
                    <q-chat-message
                        :text="['hey, how are you?']"
                        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                        sent
                        stamp="7 minutes ago"
                        bg-color="green-7"
                        text-color="white"
                    />
                    <q-chat-message
                        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
                        :text="['doing fine, how r you?']"
                        bg-color="grey-3"
                    />
                </q-scroll-area>
            </view>
            <view class="q-pa-md">
                <q-input placeholder="输入" filled >
                    <template v-slot:append>
                        <q-icon name="send" />
                    </template>
                </q-input>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-facing-decorator';
	@Component
	export default class ChatListPage extends Vue {
        protected detail:boolean = true;
	}
</script>
