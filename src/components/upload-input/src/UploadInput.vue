<template>
    <div class="component upload-input" :class="[{ 'disabled': disabled }]">
        <el-select
            popper-class="component upload-input"
            :value="selectedFiles"
            @change="deleteFile"
            multiple
            collapse-tags
            :class="[{ 'disabled': disabled }]">
            <el-option
                v-for="item in value"
                :key="`${item.id}option`"
                :disabled="disabled"
                :value="item.id"
                :label="`${item.fileName}.${item.fileSuffix}`">
            </el-option>
        </el-select>
        <el-upload
            class="el-upload-wrapper"
            :disabled="disabled"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            action="">
            <el-button :disabled="disabled">上传</el-button>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'UploadInput',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array
        }
    },
    computed: {
        selectedFiles () {
            return this.value.map(item => item.id)
        }
    },
    methods: {
        uploadSuccess () {
            this.uploadFinish()
        },
        uploadError () {
            this.uploadFinish()
        },
        uploadFinish () {
            this.$emit('input', [ ...this.value, {
                id: new Date().getTime(),
                fileName: `本地文件${new Date().getTime()}`,
                fileSuffix: `pdf`
            }])
        },
        deleteFile (e) {
            this.$emit('input', this.value.filter(item => {
                return e.includes(item.id)
            }))
        }
    }
}
</script>

<style lang="scss">
.component.upload-input {
    .el-select {
        width: calc(100% - 80px);
        .el-input .el-input__inner {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        &:hover, &:active, &:focus {
            z-index: 2;
        }
    }
    .el-upload-wrapper {
        display: inline-block;
        width: 80px;
        margin-left: -1px;
        .el-upload {
            width: 100%;
            .el-button {
                width: 100%;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                &:hover, &:active, &:focus {
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }
}
</style>
