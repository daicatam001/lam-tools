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
                <div class="flex gap-2 flex-wrap">
                    <a-tag v-for="(word, index) of wordList" :color="dupMarked[word] ? dupMarked[word] : ''" closable
                        @close.prevent="onRemoveKeyword(index)" class="mr-0">
                        {{ word }}
                    </a-tag>
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="font-bold leading-8">
                    Result:
                </h3>
                <div class="italic leading-5">
                    <p> {{ keywordString }}</p>
                </div>
                <div v-if="keywordString" class="flex items-center justify-between">
                    <a class="text-blue-500 inline-block cursor-pointer" @click="onCopy">{{ copyText }}</a>
                    <div>Total: <b>{{ keywordsCount }}</b></div>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import Utils from '@/core/utils';
import { computed, onMounted, ref } from 'vue';

const wordStr = ref('')
const keywordString = ref('')
const copyText = ref('Copy')
const inputRef = ref()
const wordList = computed(() => wordStr.value.trim().toLowerCase()
    .split(',').filter(word => !!word).map(word => word.trim())
)

const keywordsCount = computed(() => keywordString.value.split(',').length)

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
    const _wordList = wordStr.value.split(',').filter(word => !!word)
    _wordList.splice(index, 1)
    wordStr.value = _wordList.join(',')
}

const onRemoveDuplicate = () => {
    keywordString.value = ''
    setTimeout(() => {
        keywordString.value = [...new Set(wordList.value)].join(', ')
    }, 500)
}

const onCopy = async () => {
    await navigator.clipboard.writeText(keywordString.value)
    copyText.value = 'Copied!'
    await new Promise((resolve) => setTimeout(resolve, 2000));
    copyText.value = 'Copy'
}

const onClear = () => {
    wordStr.value = ''
    keywordString.value = ''
    inputRef.value.focus()
}

</script>