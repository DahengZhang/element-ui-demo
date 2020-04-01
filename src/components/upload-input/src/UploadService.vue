<template>
    <upload-input :value="value" @input="e => $emit('input', e)" :disabled="disabled" :action="''"></upload-input>
</template>

<script>
import UploadInput from './UploadInput.vue'

export default {
    name: 'UploadService',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    components: {
        UploadInput
    }
}
</script>

<style lang="scss">
.component.upload-service {
}
</style>
