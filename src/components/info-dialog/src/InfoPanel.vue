<template>
    <div class="component info-panel">
        <div class="table-row" v-for="item in data" :key="JSON.stringify(item)">
            <div class="table-col" v-for="i in item" :key="JSON.stringify(i)">
                <div class="table-item label">{{i.label}}</div>
                <div class="table-item value">
                    <text-wrapper v-if="i.html" v-html="i.html"></text-wrapper>
                    <text-wrapper v-else>
                        <a v-if="typeof i.value === 'string'" :class="[{ 'has-click': i.clickF }]" @click="i.clickF && i.clickF(i)">{{i.value}}</a>
                        <template v-else>
                            <a v-for="k in i.value" :key="JSON.stringify(k)" :class="[{ 'has-click': k.clickF || i.clickF }]" @click="k.clickF && k.clickF(k) || i.clickF && i.clickF(k)">{{k.txt}}</a>
                        </template>
                    </text-wrapper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextWrapper from '@/components/TextWrapper.vue'

export default {
    name: 'InfoPanel',
    props: {
        data: {
            types: Object | Array,
            required: true
        }
    },
    methods: {
        returnArray (val) {
            console.log(val)
            return val
        }
    },
    components: {
        TextWrapper
    }
}
</script>

<style lang="scss">
.component.info-panel {
    .table-row {
        display: flex;
        .table-col {
            display: flex;
            flex: 1;
            width: 0;
            .table-item {
                display: flex;
                min-height: 38px;
                box-sizing: border-box;
                padding: 0 10px;
                word-break: break-all;
                align-items: center;
                border-right: 1px solid #CCCCCC;
                border-bottom: 1px solid #CCCCCC;
                &.label {
                    width: 180px;
                    background-color: #F3F7FD;
                    justify-content: flex-end;
                }
                &.value {
                    width: calc(100% - 180px);
                    .has-click {
                        cursor: pointer;
                        color: #1890FF;
                        margin-right: 10px;
                        &::after {
                            content: "、";
                        }
                        &:nth-last-of-type(1)::after {
                            display: none;
                        }
                    }
                }
            }
            &:nth-of-type(1) .table-item.label {
                border-left: 1px solid #CCCCCC;
            }
        }
        &:nth-of-type(1) .table-col .table-item {
            border-top: 1px solid #CCCCCC;
        }
    }
}
</style>
