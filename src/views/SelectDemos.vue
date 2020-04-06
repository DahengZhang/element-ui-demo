<template>
    <div class="select-demos">
        <p>{{selected}}</p>
        <p>{{wholeSelected}}</p>
        <tree-select
            :options="treeData"
            v-model="selected"
            :whole.sync="wholeSelected"
            :disabled="false"
            :onlyLeaf="true"
            :multiple="true"
            :props="{
                key: 'key',
                children: 'children',
                label: 'name'
            }">
        </tree-select>
    </div>
</template>

<script>
import treeData from '@/assets/config.js'
import TreeSelect from '@/components/TreeSelect.vue'

export default {
    name: 'SelectDemos',
    data: () => ({
        treeData: [],
        selected: [
            9
        ],
        wholeSelected: [
            // {
            //     key: 1,
            //     name: "一级 1"
            // }
        ]
    }),
    mounted () {
        setTimeout(() => {
            this.treeData = treeData
        }, 2000)
    },
    components: {
        TreeSelect
    }
}
</script>
