<template>
    <el-select
        class="component tree-select"
        :class="[{'disabled': disabled}]"
        popper-class="component tree-select dropdown-wrapper"
        :loading="loading"
        :value="localValue"
        multiple
        collapse-tags
        filterable
        :filter-method="searchFn"
        @remove-tag="removeItem">
            <el-option v-for="item in selectedOptions" :key="item[defaultProps.key]" :value="item[defaultProps.key]" :label="item[defaultProps.label]"></el-option>
            <el-option value=""></el-option>
            <el-tree
                class="selected-data-tree"
                v-show="selectedOptions.length > 0"
                :default-expand-all="disabled"
                ref="treeAllEl"
                @node-expand="_ => allIsOpen = true"
                @node-collapse="_ => allIsOpen = false"
                :props="defaultProps"
                check-on-click-node
                :node-key="defaultProps.key"
                :default-checked-keys="localValue"
                show-checkbox
                check-strictly
                :empty-text="''"
                :filter-node-method="filterNode"
                @node-click="delSelectValue"
                :data="[{[defaultProps.key]: 'root', [defaultProps.label]: '已选', [defaultProps.children]: selectedOptions}]">
            </el-tree>
            <el-tree
                ref="treeEl"
                v-show="!disabled"
                :props="defaultProps"
                check-on-click-node
                :data="localOption"
                :node-key="defaultProps.key"
                check-strictly
                :default-checked-keys="localValue"
                @node-click="getValue"
                :filter-node-method="filterNode"
                show-checkbox>
            </el-tree>
    </el-select>
</template>

<script>
export default {
    name: 'TreeSelect',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        whole: {
            type: Array,
            default: () => []
        },
        loading: { // 仅仅是用来提示正在加载备选项数据状态
            type: Boolean,
            default: false
        },
        value: {
            type: Array
        },
        options: {
            type: Array,
            default: () => []
        },
        props: {
            type: Object,
            default: () => ({
                key: 'id',
                children: 'children',
                label: 'label'
            })
        }
    },
    computed: {
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
                this.selectedOptions = value.filter(item => !item[this.defaultProps.children])
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
            if (e[this.defaultProps.children] || this.disabled) {
                return
            }
            const value = this.$refs.treeAllEl.getCheckedNodes()
            this.selectedOptions = value.filter(item => !item[this.defaultProps.children])
            this.$refs.treeEl.setCheckedNodes(this.selectedOptions)
            this.$emit('update:whole', this.selectedOptions)
            this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        removeItem (e) {
            this.selectedOptions = this.selectedOptions.filter(item => item[this.defaultProps.key] !== e)
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
            if (e[this.defaultProps.children]) {
                return
            }
            const value = this.$refs.treeEl.getCheckedNodes()
            this.selectedOptions = value.filter(item => !item[this.defaultProps.children])
            this.$emit('update:whole', this.selectedOptions)
            this.$emit('input', this.selectedOptions.map(item => item[this.defaultProps.key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        filterNode(value, data) {
            if (!value) return true
            return !data[this.defaultProps.children] && data[this.defaultProps.label].indexOf(value) !== -1
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
    .el-tree-node {
        .is-leaf + .el-checkbox .el-checkbox__inner {
            display: inline-block;
        }
        .el-checkbox__input>.el-checkbox__inner {
            display: none;
        }
    }
    .selected-data-tree {
        .el-tree__empty-block {
            display: none;
        }
    }
}
</style>
