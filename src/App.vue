<template>
    <div class="app">
        This is App
        <upload-input :disabled="false" class="upload-input-el"></upload-input>
        <p>{{selected}}</p>
        <p>{{wholeSelected}}</p>
        <tree-select
            class="tree-select-el"
            v-model="selected"
            :loading="loading"
            :options="treeData"
            :disabled="true"
            :props="{
                key: 'key',
                children: 'children',
                label: 'name'
            }">
        </tree-select>
        <el-form
            :model="{ formData }"
            :rules="rules"
            ref="formEl">
            <el-form-item prop="formData.selectOne">
                <el-select v-model="formData.selectOne" @change="e => {
                        formData.selectTwo = ''
                        formData.selectThree = ''
                        $nextTick(() => { $refs.formEl.clearValidate(['formData.selectTwo', 'formData.selectThree']) })
                    }">
                    <el-option :value="1" :label="'one-选项一'"></el-option>
                    <el-option :value="2" :label="'one-选项二'"></el-option>
                    <el-option :value="3" :label="'one-选项三'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="formData.selectTwo">
                <el-select v-model="formData.selectTwo" @change="e => {
                        formData.selectThree = ''
                        $nextTick(() => { $refs.formEl.clearValidate(['formData.selectThree']) })
                    }">
                    <el-option :value="1" :label="'two-选项一'"></el-option>
                    <el-option :value="2" :label="'two-选项二'"></el-option>
                    <el-option :value="3" :label="'two-选项三'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="formData.selectThree">
                <el-select v-model="formData.selectThree">
                    <el-option :value="1" :label="'three-选项一'"></el-option>
                    <el-option :value="2" :label="'three-选项二'"></el-option>
                    <el-option :value="3" :label="'three-选项三'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit()">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import treeData from './assets/config'
import { UploadInput } from '@/components/upload-input/index'
import TreeSelect from '@/components/tree-select/index'

export default {
    name: 'App',
    data: () => ({
        formData: {
            selectOne: '',
            selectTwo: '',
            selectThree: ''
        },
        rules: {
            'formData.selectOne': [{
                required: true,
                message: '必填',
                trigger: ['change']
            }],
            'formData.selectTwo': [{
                required: true,
                message: '必填',
                trigger: ['change']
            }],
            'formData.selectThree': [{
                required: true,
                message: '必填',
                trigger: ['change']
            }]
        },
        loading: true,
        treeData: [],
        selected: [5, 6], // 优先使用
        wholeSelected: [{ "id": 6, "name": "二级 2-2" }]
    }),
    mounted () {
        setTimeout(() => {
            this.treeData = treeData
            this.loading = false
        }, 200)
    },
    methods: {
        submit () {
            this.$refs.formEl.validate(e => {
                // 触发校验
                if (!e) { // e 拿到的仅仅是 true or false
                    // 校验不通过时的操作
                    return
                }
            })
        }
    },
    components: {
        UploadInput,
        TreeSelect
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
}
.app {
    .upload-input-el {
        width: 50%;
        margin: 10px;
    }
    .tree-select-el {
        width: 50%;
        margin: 10px;
    }
}
</style>
