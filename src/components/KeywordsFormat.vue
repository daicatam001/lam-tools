<template>
    <section class="my-8">

        <div class="grid grid-cols-2 gap-8">
            <div class="space-y-4">
                <h2 class="app-section-title">Keywords Format</h2>
                <a-textarea v-model:value="keywordStr" placeholder="Enter keywords..." :rows="4" />
                <div class="flex gap-2 flex-wrap">
                    <a-tag v-for="(word, index) of keywords" :color="dupMarked[word] ? dupMarked[word] : ''" closable
                        @close.prevent="onRemoveKeyword(index)" class="mr-0">
                        {{ word }}
                    </a-tag>
                </div>
            </div>
            <div class="space-y-4">
                <div class="text-right">
                    <a-button type="primary" @click="onRemoveDuplicate()">Remove duplicate</a-button>
                </div>
                <div class="italic leading-5">
                    <p> {{ result }}</p>
                </div>
                <div v-if="result" class="flex items-center justify-between">
                    <a class="text-blue-500 inline-block cursor-pointer" @click="onCopy">{{ copyText }}</a>
                    <div>Total: <b>{{ resultWordCount }}</b></div>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Utils from '@/core/utils';
import { computed, ref } from 'vue';

const keywordStr = ref('')
const result = ref('')
const copyText = ref('Copy')
const keywords = computed(() => keywordStr.value.trim().toLowerCase()
    .split(',').filter(word => !!word).map(word => word.trim())
)

const resultWordCount = computed(() => result.value.split(',').length)

const dupMarked = computed(() => {
    const duplicates = Utils.findDuplicate(keywords.value)
    return duplicates.reduce((entry, item) => ({
        ...entry,
        [item]: Utils.stringToColor(item)
    }), {} as { [key: string]: string })
})

const onRemoveKeyword = (index: number) => {
    const _keywords = keywordStr.value.split(',').filter(word => !!word)
    _keywords.splice(index, 1)
    keywordStr.value = _keywords.join(',')
}

const onRemoveDuplicate = () => {
    result.value = ''
    setTimeout(() => {
        result.value = [...new Set(keywords.value)].join(', ')
    }, 500)
}

const onCopy = async () => {
    await navigator.clipboard.writeText(result.value)
    copyText.value = 'Copied!'
    await new Promise((resolve) => setTimeout(resolve, 2000));
    copyText.value = 'Copy'
}

</script>