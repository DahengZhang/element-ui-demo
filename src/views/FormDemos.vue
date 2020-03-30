<template>
    <div class="form-demos">
        <el-form
            :model="{ formData }"
            ref="formEl">
            <el-form-item
                label="名称"
                prop="formData.name"
                :rules="[{
                    required: true,
                    validator: (_, value, callback) => {
                        checkName(value).then(res => {
                            callback()
                        }).catch(err => {
                            callback(err)
                        })
                    },
                    trigger: ['blur']
                }]">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item
                label="路径"
                prop="formData.path"
                :rules="[{
                    validator: (_, value, callback) => {
                        checkPath(value).then(res => {
                            callback()
                        }).catch(err => {
                            callback(err)
                        })
                    },
                    trigger: ['blur']
                }]">
                <el-input v-model="formData.path"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'FormDemos',
    data: () => ({
        formData: {
            name: '',
            path: ''
        }
    }),
    methods: {
        checkName (value) {
            if (!value) {
                return Promise.reject(new Error('name 值不能为空'))
            }
            return this.checkInput(value).then(() => {
                this.$refs.formEl.clearValidate('formData.path')
                return Promise.resolve()
            }).catch(err => {
                return Promise.reject(err)
            })
        },
        checkPath (value) {
            if (!value) {
                return Promise.resolve()
            }
            return this.checkInput(undefined, value).then(() => {
                this.$refs.formEl.clearValidate('formData.name')
                return Promise.resolve()
            }).catch(err => {
                return Promise.reject(err)
            })
        },
        checkInput (name = this.formData.name, path = this.formData.path) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (name === path) {
                        reject(new Error('name 与 path 相同'))
                    }
                    resolve()
                }, 1000)
            })
        }
    }
}
</script>
