<template>
    <upload-input :value="value" @input="e => $emit('input', e)"></upload-input>
</template>

<script>
import UploadInput from './UploadInput.vue'

export default {
    name: 'UploadService',
    props: {
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
