<template>
    <div class="select-demos">
        <p>{{wholeSelected}}</p>
        <tree-select
            class="tree-select-el"
            :options="treeData"
            v-model="selected"
            :whole.sync="wholeSelected"
            :onlyLeaf="true"
            :disabled="false"
            extr
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
// {
//             key: 1,
//             name: "一级 1"
//         }
export default {
    name: 'SelectDemos',
    data: () => ({
        treeData,
        selected: [9],
        wholeSelected: []
    }),
    components: {
        TreeSelect
    }
}
</script>
