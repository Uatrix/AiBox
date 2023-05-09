<template>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-facing-decorator';
import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
import { Component, Vue } from 'vue-facing-decorator';
	@Component
	export default class Empty extends Vue {

	}
</script>
