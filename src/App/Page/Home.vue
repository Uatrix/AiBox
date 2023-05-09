<template>
    <view class="fit row no-wrap">
        <view class="column relative-position" v-if="$q.screen.gt.xs ||  !detail" :style="{'width': detail ? '19rem' : '100%' }">
            <view class="row q-pa-sm flex-center no-wrap">
                <q-btn flat round icon="menu" />
                <q-input class="q-ml-sm flex-auto" dense  filled icon="search" placeholder="搜索"/>
            </view>
            <q-scroll-area class="flex-auto">
                <q-list>
                    <q-item clickable v-ripple @click="detail = true">
                        <q-item-section avatar>
                            <q-avatar color="teal" size="xl" text-color="white" icon="bluetooth"/>
                        </q-item-section>
                        <q-item-section>ChatGPT</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section avatar>
                            <q-avatar color="teal" size="xl" text-color="white" icon="bluetooth"/>
                        </q-item-section>
                        <q-item-section>BingChat</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>

            <q-fab color="green" icon="add" direction="up" class="absolute-bottom-right q-ma-md">
                <q-fab-action color="primary" icon="power_settings_new" />
                <q-fab-action color="primary" icon="settings" />
            </q-fab>
<!--            <q-btn fab icon="add" color="green" class="absolute-bottom-right q-ma-md" />-->
        </view>
        <q-separator vertical size="0.5px" class="gt-xs" />
<!--        <transition-->
<!--            appear-->
<!--            duration="1000"-->
<!--            enter-active-class="animated shakeX"-->
<!--            leave-active-class="animated backInLeft"-->
<!--        >-->
            <view class="column flex-auto" v-if="detail==true">
                <q-toolbar>
                    <q-btn flat class="q-mr-sm" round icon="arrow_back" v-if="!$q.screen.gt.xs" @click="detail=false" />
                    <span color="text-grey">BingChat</span>
                    <q-space />
                    <q-btn flat round icon="more_vert">
                        <q-menu>
                            <q-list>
                                <q-item clickable v-close-popup @click="clear">
                                    <q-item-section>清空记录</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                    <q-item-section>设置参数</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </q-toolbar>

                <q-separator size="0.5px" />

                <router-view />
                <view class="flex-auto relative-position">
                    <view class="absolute-full q-px-md q-my-md scroll-y overflow-x-hidden column-reverse no-wrap">
                        <view class="flex-auto" />
    <!--                    <view v-for="(m,i) in history.slice().reverse()">-->
    <!--                        <template v-if="m.state=='waiting'">-->
    <!--                            <q-spinner-dots size="2rem" />-->
    <!--                        </template>-->
    <!--                        <template v-else>-->
    <!--                            <view class="column full-width" v-html="m.html" style="line-height: 200%;font-family: 微软雅黑, 幼圆, Menlo, monospace, Tahoma !important;" />-->
    <!--                        </template>-->
    <!--                    </view>-->
                        <q-chat-message v-for="(m,i) in history.slice().reverse()"
                                        :stamp="m.state =='completed' ? m.time : ''"
                                        :sent="m.role=='user'"
                                        :bg-color="m.role=='user' ? 'green' : 'grey-2'"
                                        :text-color="m.role=='user' ? 'white' : 'black'"
                        >
                            <template v-if="m.state=='waiting'">
                                <q-spinner-dots size="2rem" />
                            </template>
                            <template v-else>
                                <view class="column full-width" v-html="m.html" style="line-height: 200%;font-family: 微软雅黑, 幼圆, Menlo, monospace, Tahoma !important;" />
                            </template>
                        </q-chat-message>
                    </view>
                </view>
                <q-form class="q-mx-md q-mb-md" @submit="submit">
                    <q-input placeholder="输入" outlined v-model="input">
                        <template v-slot:append>
                            <q-btn flat round icon="send" @click="submit"/>
                        </template>
                    </q-input>
                </q-form>
            </view>
<!--        </transition>-->
    </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-facing-decorator';
import {fetchEventSource} from "@microsoft/fetch-event-source";
import {Configuration, OpenAIApi} from 'openai';
import MarkdownIt from 'markdown-it';
import HighLight from 'highlight.js';
import { Notify } from 'quasar';

const md = new MarkdownIt({
    linkify: true,
    breaks: true,
    highlight(str: string, lang: string, attrs: string) {
        return '<view class="code"><pre class="hljs"><code>' + HighLight.highlightAuto(str).value + '</code></pre></view>'
    }
})

const key = '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'
const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

@Component
export default class Home extends Vue {

    protected detail:boolean = true;
    protected input: any = ''
    protected history: any = []

    protected async clear() {
        this.history = []
        Notify.create('已清空历史记录')
    }
    protected async submit() {
        let now = new Date();
        this.history.push({'role': 'user','state':'completed', 'content': this.input, 'html':this.input, 'time': `${now.getHours()}:${now.getMinutes()}`})
        this.input = ''
        let prompt = ''
        for (const message of this.history) {
            prompt = prompt + message['role'] + ':' + message['content'] + '\n';
        }
        prompt = prompt + "AI:"
        let reply = {'role': 'assistant', 'state':'waiting', 'content': '', 'html':'', 'time': `${now.getHours()}:${now.getMinutes()}`}
        this.history.push(reply)
        let update = this.$forceUpdate;
        const context = []
        for (const message of this.history) {
            context.push({ 'role':message.role, 'content': message.content })
        }
        let response = await fetchEventSource("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": context,
                    "stream": true,
                }
            ),
            onmessage({ data }) {
                if (data === '[DONE]') {
                    console.log('结束')
                    return
                }
                let { choices } = JSON.parse(data);
                const text = choices[0].delta.content;
                // console.log(text)
                if(!text) {
                    return;
                }
                reply.state = 'completed'
                reply.content = reply.content + text
                reply.html = md.render(reply.content)
                update()
            }
        })
    }

}

</script>

<style lang="scss">
    @import url('https://highlightjs.org/static/demo/styles/atom-one-dark.css');
    .hljs {
        padding: 1rem;

        border-radius: 0.2rem;
        line-height: 120%;
        max-width: 100%;
        flex: auto;
        overflow: hidden;
    }
    .q-message-container {
        overflow-x: hidden;
        div:first-child {
           max-width: 100%;
        }
    }
    .q-message-text-content {
        &:first-child {

        }
    }
    .code {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
    pre {
        max-width: 100%;
        margin: 0;
    }
</style>