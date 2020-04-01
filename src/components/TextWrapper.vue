<template>
    <div class="component text-wrapper" :class="[{'more-than-one': moreThanOne && !showMoreOne}]">
        <span v-if="loadOne">占</span>
        <slot v-else></slot><span class="show-more" v-if="moreThanOne && !showMoreOne" @click="showMoreOne = true">展开</span>
    </div>
</template>

<script>
export default {
    name: 'TextWrapper',
    props: {
        activation: { // 是否启用
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        loadOne: true, // 加载一行
        moreThanOne: false, // 全部文本渲染是否需要多行
        showMoreOne: false, // 显示所有文本
    }),
    mounted () {
        if (!this.activation) {
            this.loadOne = false
            return
        }
        this.onelineHeight = this.$el.getBoundingClientRect().height // 获取一行文本的高度
        this.loadOne = false
        this.$nextTick(() => {
            this.showMoreOneF()
        })
        window.addEventListener('resize', () => this.showMoreOneF())
    },
    methods: {
        showMoreOneF () {
            this.moreThanOne = false
            this.$nextTick(() => {
                if (this.$el.getBoundingClientRect().height > this.onelineHeight) {
                    this.moreThanOne = true
                } else {
                    this.moreThanOne = false
                }
            })
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', () => this.showMoreOneF())
    }
}
</script>

<style lang="scss">
.component.text-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    &.more-than-one {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        padding-right: 30px;
    }
    .show-more {
        color: #409EFF;
        font-size: 12px;
        position: absolute;
        right: 0;
        bottom: 1px;
        cursor: pointer;
    }
}
</style>
