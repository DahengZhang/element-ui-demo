<template>
    <div class="component upload-input">
        <el-select
            v-model="selected"
            multiple
            collapse-tags
            :class="[{ 'disabled': disabled }]">
            <el-option :disabled="disabled" :value="1" :label="'附件1.pdf'">附件1.pdf</el-option>
            <el-option :disabled="disabled" :value="2" :label="'附件2.pdf'">附件2.pdf</el-option>
        </el-select>
        <el-upload
            :disabled="disabled"
            action="https://api.zhangdaheng.show">
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
        }
    },
    data: () => ({
        selected: [1, 2]
    })
}
</script>

<style lang="scss">
.component.upload-input {
    display: flex;
    .el-select {
        width: 100%;
        .el-input__inner {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        &.disabled .el-tag__close {
            display: none;
        }
        &:hover {
            z-index: 2;
        }
    }
    &>div:nth-of-type(2) {
        &:hover, &:active {
            z-index: 1;
        }
    }
    .el-button {
        width: 80px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -1px;
    }
}
</style>
