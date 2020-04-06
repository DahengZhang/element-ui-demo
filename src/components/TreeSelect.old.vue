<template>
    <el-select
        class="component tree-select"
        :class="[{'disabled': disabled}, {'only-leaf': onlyLeaf}]"
        :popper-class="popperClass"
        :loading="loading"
        :value="localValue"
        multiple
        collapse-tags
        filterable
        :filter-method="searchFn"
        @visible-change="e => { !e && searchFn() }"
        @remove-tag="removeItem">
            <el-option v-for="item in selectedOptions" :key="item[defaultProps.key]" :value="item[defaultProps.key]" :label="item[defaultProps.label]"></el-option>
            <el-option value=""></el-option>
            <div class="disabled-nil" v-if="selectedOptions.length <= 0 && disabled">
                未选择
            </div>
            <el-tree
                class="selected-data-tree not-only-leaf"
                v-show="selectedOptions.length > 0"
                :default-expand-all="disabled"
                ref="treeAllEl"
                check-on-click-node
                @node-expand="_ => allIsOpen = true"
                @node-collapse="_ => allIsOpen = false"
                :props="defaultProps"
                :node-key="defaultProps.key"
                :default-checked-keys="localValue"
                show-checkbox
                check-strictly
                :empty-text="disabled ? '无结果' : ''"
                :filter-node-method="filterNode"
                @node-click="delSelectValue"
                :data="[{[defaultProps.key]: 'root', [defaultProps.label]: '已选', [defaultProps.children]: selectedOptions.map(item => ({ [defaultProps.key]: item[defaultProps.key], [defaultProps.label]: item[defaultProps.label] }))}]">
            </el-tree>
            <el-tree
                ref="treeEl"
                v-show="!disabled"
                :props="defaultProps"
                :check-on-click-node="onlyLeaf"
                :data="localOption"
                :node-key="defaultProps.key"
                check-strictly
                :default-checked-keys="localValue"
                @node-click="getValue"
                @check-change="getValue"
                :filter-node-method="filterNode"
                show-checkbox>
            </el-tree>
    </el-select>
</template>

<script>
export default {
    name: 'TreeSelect',
    props: {
        disabled: { // 禁用
            type: Boolean,
            default: false
        },
        onlyLeaf: { // 是否只操作叶子节点
            type: Boolean,
            default: true
        },
        whole: { // 帮定值 [{ key: 6, name: '二级 2-2' }]
            type: Array,
            default: () => []
        },
        loading: { // 仅仅是用来提示正在加载备选项数据状态
            type: Boolean,
            default: false
        },
        value: { // 绑定值 优先使用 [6]
            type: Array
        },
        options: { // 备选项 { key: 2, name: '一级 2', children: [{ key: 5, name: '二级 2-1' }, { key: 6, name: '二级 2-2' }] }
            type: Array,
            default: () => []
        },
        props: { // 对应的 key
            type: Object,
            default: () => ({
                key: 'id',
                children: 'children',
                label: 'label'
            })
        },
        extr: { // 需要除 children 外所有的项
            type: Boolean,
            default: false
        },
        multiple: { // 是否多选，默认多选
            type: Boolean,
            default: true
        }
    },
    computed: {
        popperClass () {
            let classNames = ['component', 'tree-select', 'dropdown-wrapper']
            if (this.disabled) {
                classNames.push('disabled')
            }
            if (this.onlyLeaf) {
                classNames.push('only-leaf')
            }
            return classNames.join(' ')
        },
        defaultProps () {
            let result = Object.assign({
                key: 'id',
                children: 'children',
                label: 'label'
            }, this.props)
            result.disabled = () => {
                return this.disabled
            }
            return result
        },
        localValue () {
            return this.value || this.whole.map(item => item[this.defaultProps.key])
        },
        localOption () {
            this.$nextTick(() => {
                const value = this.$refs.treeEl.getCheckedNodes()
                this.selectedOptions = value.filter(item => !this.onlyLeaf || !item[this.defaultProps.children] || item[this.defaultProps.children].length <= 0)
                this.value ? this.$emit('update:whole', this.selectedOptions) : this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            })
            return this.options
        }
    },
    data: () => ({
        allIsOpen: false,
        selectedOptions: [] // 已经选中的项
    }),
    methods: {
        delSelectValue (e) {
            if (e[this.defaultProps.children] && e[this.defaultProps.children].length > 0 || this.disabled) {
                return
            }
            this.selectedOptions = this.$refs.treeAllEl.getCheckedNodes()
            this.selectedOptions = this.selectedOptions.filter(item => !item[this.defaultProps.children] || item[this.defaultProps.children].length <= 0)
            this.$refs.treeEl.setCheckedNodes(this.selectedOptions)
            this.$emit('update:whole', this.selectedOptions)
            this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        removeItem (e) {
            this.selectedOptions = this.multiple ? this.selectedOptions.filter(item => item[this.defaultProps.key] !== e) : []
            console.log('removeItem this.selectedOptions', this.selectedOptions)
            this.$refs.treeEl.setCheckedNodes(this.selectedOptions)
            this.$emit('update:whole', this.selectedOptions)
            this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        searchFn (val) {
            this.allIsOpen = true
            this.$refs.treeEl.filter(val)
            this.$refs.treeAllEl.filter(val)
        },
        getValue (e) {
            if (e[this.defaultProps.children] && e[this.defaultProps.children].length > 0 && this.onlyLeaf) {
                return
            }
            this.selectedOptions = this.$refs.treeEl.getCheckedNodes()
            // setTimeout(() => {
            //     console.log(this.$refs.treeEl.getCheckedNodes())
            // }, 300)
            if (this.onlyLeaf) {
                this.selectedOptions = this.selectedOptions.filter(item => !item[this.defaultProps.children] || item[this.defaultProps.children].length <= 0)
            }
            console.log('this.selectedOptions', this.selectedOptions)
            this.$emit(
                'update:whole',
                this.selectedOptions.map(item => {
                    delete item[this.defaultProps.children]
                    return this.extr ? item : {
                        [this.defaultProps.key]: item[this.defaultProps.key],
                        [this.defaultProps.label]: item[this.defaultProps.label]
                    }
                }))
            this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        filterNode(value, data) {
            if (!value) return true
            return ((!data[this.defaultProps.children] || data[this.defaultProps.children].length <= 0) || !this.onlyLeaf) && data[this.defaultProps.label].indexOf(value) !== -1
        }
    }
}
</script>

<style lang="scss">
.component.tree-select {
    &.dropdown-wrapper {
        padding: 10px;
    }
    &.disabled {
        .el-tag__close {
            display: none;
        }
    }
    .el-select-dropdown__item {
        display: none;
    }
    .disabled-nil {
        font-size: 14px;
        color: #DCDFE6;
        width: 100%;
        text-align: center;
    }
    &.only-leaf, .not-only-leaf {
        .el-tree-node {
            .is-leaf + .el-checkbox .el-checkbox__inner {
                display: inline-block;
            }
            .el-checkbox__input>.el-checkbox__inner {
                display: none;
            }
        }
    }
    .selected-data-tree {
        .el-tree__empty-block {
            display: none;
        }
    }
}
</style>
