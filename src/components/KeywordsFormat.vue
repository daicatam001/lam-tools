<template>
    <section class="my-8">

        <div class="grid grid-cols-2 gap-10">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="app-section-title">Keywords Format</h2>
                    <a-button type="primary" @click="onRemoveDuplicate()">Remove duplicate</a-button>
                </div>
                <a-textarea v-model:value="wordStr" placeholder="Enter keywords..." :rows="4" ref="inputRef" />
                <div>
                    <a-button danger type="primary" @click="onClear">Clear</a-button>
                </div>

            </div>
            <div class="space-y-4">
                <h3 class="font-bold leading-8">
                    Result:
                </h3>
                <template v-if="keywords.length">
                    <div class="flex gap-2 flex-wrap">
                        <a-tag v-for="(word, index) of keywords" :color="dupMarked[word] ? dupMarked[word] : ''"
                            closable @close.prevent="onRemoveKeyword(index)" class="mr-0">
                            {{ word }}
                        </a-tag>
                    </div>
                    <div class="italic leading-5">
                        <p> {{ keywordStr }}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <a class="text-blue-500 inline-block cursor-pointer" @click="onCopy">{{ copyText }}</a>
                        <div>Total: <b>{{ keywordsCount }}</b></div>
                    </div>
                </template>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Utils from '@/core/utils';
import { computed, onMounted, ref } from 'vue';

const wordStr = ref('')
const keywords = ref<string[]>([])
const copyText = ref('Copy')
const inputRef = ref()
const wordList = computed(() => wordStr.value.trim().toLowerCase()
    .split(',').filter(word => !!word).map(word => word.trim())
)

const keywordsCount = computed(() => keywords.value.length)
const keywordStr = computed(() => keywords.value.join(', '))

const dupMarked = computed(() => {
    const duplicates = Utils.findDuplicate(wordList.value)
    return duplicates.reduce((entry, item) => ({
        ...entry,
        [item]: Utils.stringToColor(item)
    }), {} as { [key: string]: string })
})

onMounted(() => {
    inputRef.value.focus()
})

const onRemoveKeyword = (index: number) => {
    const _keywords = [...keywords.value]
    _keywords.splice(index, 1)
    keywords.value = _keywords
}

const onRemoveDuplicate = () => {
    keywords.value = []
    setTimeout(() => {
        keywords.value = [...new Set(wordList.value)]
    }, 500)
}

const onCopy = async () => {
    await navigator.clipboard.writeText(keywordStr.value)
    copyText.value = 'Copied!'
    await new Promise((resolve) => setTimeout(resolve, 2000));
    copyText.value = 'Copy'
}

const onClear = () => {
    wordStr.value = ''
    keywords.value = []
    inputRef.value.focus()
}

</script>