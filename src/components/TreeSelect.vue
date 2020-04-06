<template>
    <el-select
        class="component tree-select"
        :class="[{
            'disabled': disabled
        },{
            'only-leaf': onlyLeaf
        }]"
        :popper-class="popperClass(
            'component',
            'tree-select',
            'dropdown-wrapper',
            disabled && 'disabled',
            onlyLeaf && 'only-leaf'
        )"
        :value="localValue"

        multiple
        collapse-tags

        filterable
        :filter-method="searchFn"
        @visible-change="e => { !e && searchFn() }"

        @remove-tag="removeItem">
        <el-option
            v-for="item in selectedOptions"
            :key="item[defaultProps.key]"
            :value="item[defaultProps.key]"
            :label="item[defaultProps.label]">
        </el-option>
        <el-option value=""></el-option>
        <div class="disabled-nil" v-if="selectedOptions.length <= 0 && disabled">
            未选择
        </div>
        <el-tree
            class="selected-data-tree not-only-leaf"
            :class="[{
                'disabled': disabled
            }]"
            v-show="selectedOptions.length > 0"
            ref="treeAllEl"
            :default-checked-keys="localValue"
            :default-expand-all="disabled"

            show-checkbox
            check-strictly
            :node-key="defaultProps.key"

            @node-expand="_ => allIsOpen = true"
            @node-collapse="_ => allIsOpen = false"

            check-on-click-node
            @check="e => e.key !== 'root' && removeItem(e[defaultProps.key])"

            :filter-node-method="filterNode"
            :empty-text="disabled ? '无结果' : ''"

            :props="defaultProps"
            :data="[{
                [defaultProps.key]: 'root',
                [defaultProps.label]: '已选',
                [defaultProps.children]: selectedOptions.map(item => ({
                    [defaultProps.key]: item[defaultProps.key],
                    [defaultProps.label]:
                    item[defaultProps.label]
                }))
            }]">
        </el-tree>
        <el-tree
            v-show="!disabled"
            ref="treeEl"
            :default-checked-keys="localValue"

            show-checkbox
            check-strictly
            :node-key="defaultProps.key"

            :check-on-click-node="onlyLeaf"
            @check="e => getValue(e, !multiple ? !selectedOptions[0] || e[defaultProps.key] !== selectedOptions[0][defaultProps.key] : true)"

            :filter-node-method="filterNode"

            :props="defaultProps"
            :data="localOption">
        </el-tree>
    </el-select>
</template>

<script>
let key = ''
let children = ''
let label = ''

export default {
    name: 'TreeSelect',
    props: {
        value: { // 绑定值 优先使用 [6]
            type: Array
        },
        whole: { // 帮定值 [{ key: 6, name: '二级 2-2' }]
            type: Array,
            default: () => []
        },


        options: { // 备选项 { key: 2, name: '一级 2', children: [{ key: 5, name: '二级 2-1' }, { key: 6, name: '二级 2-2' }] }
            type: Array,
            required: true
        },
        props: { // 对应的 key
            type: Object,
            default: () => ({
                key: 'id',
                children: 'children',
                label: 'label'
            })
        },


        disabled: { // 禁用
            type: Boolean,
            default: false
        },
        onlyLeaf: { // 是否只操作叶子节点
            type: Boolean,
            default: true
        },
        multiple: { // 是否多选，默认多选
            type: Boolean,
            default: true
        }
    },
    computed: {
        defaultProps () {
            let result = Object.assign({
                key: 'id',
                children: 'children',
                label: 'label'
            }, this.props)
            result.disabled = e => {
                return this.disabled
                        || this.onlyLeaf
                            && e[children]
                            && e[children].length > 0
            }
            key = result.key
            children = result.children
            label = result.label
            return result
        },
        localValue () {
            return this.value || this.whole.map(item => item[this.props.key])
        },
        localOption () {
            this.$nextTick(() => {
                this.selectedOptions = this.$refs.treeEl.getCheckedNodes()
                this.$emit('update:whole', this.selectedOptions.map(item => delete item[children] && item))
            })
            return this.options
        }
    },
    data: () => ({
        allIsOpen: false,
        selectedOptions: []
    }),
    methods: {
        getValue (e, checked = true) {
            if (this.multiple) {
                this.selectedOptions = this.$refs.treeEl.getCheckedNodes()
            } else {
                checked ? this.selectedOptions = [e] : this.selectedOptions = []
                this.$refs.treeEl.setCheckedNodes(this.selectedOptions)
            }
            this.$emit('update:whole', this.selectedOptions.map(item => delete item[children] && item))
            this.$emit('input', this.selectedOptions.map(item => item[key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        removeItem (e) {
            this.selectedOptions = this.selectedOptions.filter(item => item[key] !== e)
            this.$refs.treeEl.setCheckedNodes(this.selectedOptions)
            this.$emit('update:whole', this.selectedOptions.map(item => delete item[children] && item))
            this.$emit('input', this.selectedOptions.map(item => item[key]))
            this.$nextTick(() => {
                this.$refs.treeAllEl.store.nodesMap.root.expanded = this.allIsOpen
            })
        },
        popperClass () {
            let classNames = []
            for (let i = 0; i < arguments.length; i++) {
                arguments[i] && classNames.push(arguments[i])
            }
            return classNames.join(' ')
        },
        searchFn (val) {
            this.allIsOpen = true
            this.$refs.treeEl.filter(val)
            this.$refs.treeAllEl.filter(val)
        },
        filterNode(value, data) {
            if (!value) return true
            return ((!data[children] || data[children].length <= 0) || !this.onlyLeaf) && data[label].indexOf(value) !== -1
        }
    }
}
</script>

<style lang="scss">
.component.tree-select {
    .el-select-dropdown__item { // 隐藏 select 组件原本的选项
        display: none;
    }

    // disabled 样式
    &.disabled {
        .el-tag__close {
            display: none;
        }
    }
    .disabled-nil {
        font-size: 14px;
        color: #DCDFE6;
        width: 100%;
        text-align: center;
    }
    // disabled 样式 结束
    .not-only-leaf :not(.is-leaf)+.el-checkbox {
        display: none;
    }
    &.only-leaf :not(.is-leaf)+.is-disabled {
        display: none;
    }
    .selected-data-tree:not(.disabled) {
        .el-tree__empty-block {
            display: none;
        }
    }
}
</style>
