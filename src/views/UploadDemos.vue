<template>
    <div class="upload-demos">
        <upload-service v-model="files" :disabled="true"></upload-service>
    </div>
</template>

<script>
import { UploadService } from '@/components/upload-input'

export default {
    name: 'UploadDemos',
    data: () => ({
        files: [ { "id": 1585536532034, "fileName": "本地文件1585536532034", "fileSuffix": "pdf" } ]
    }),
    components: {
        UploadService
    }
}
</script>

<style lang="scss">
.upload-demos {}
</style>
