<template>
    <q-page>
        <q-tree
            :nodes="simple"
            node-key="label"

        />
    </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
	@Component
	export default class Home extends Vue {

        simple =  [
            {
                label: 'Good food (with icon)',
                icon: 'restaurant_menu',
                children: [
                    { label: 'Quality ingredients' },
                    { label: 'Good recipe' }
                ]
            },
            {
                label: 'Good service (disabled node with icon)',
                icon: 'room_service',
                disabled: true,
                children: [
                    { label: 'Prompt attention' },
                    { label: 'Professional waiter' }
                ]
            },
            {
                label: 'Pleasant surroundings (with icon)',
                icon: 'photo',
                children: [
                    {
                        label: 'Happy atmosphere (with image)',
                        img: 'https://cdn.quasar.dev/img/logo_calendar_128px.png'
                    },
                    { label: 'Good table presentation' },
                    { label: 'Pleasing decor' }
                ]
            }
        ]

	}
</script>
