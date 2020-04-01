<template>
    <el-dialog
        :visible.sync="isShow"
        :title="'信息展示'">
        <info-panel :data="[[{
            label: '姓名',
            value: 'HenryDZhang'
        }, {
            label: '民族',
            value: '汉'
        }], [{
            label: '简介',
            html: `前端开发工程师，<span style='color: #ff0000'>前端${groupNumber}组</span>`
        }], [{
            label: '附件',
            clickF: clickExtr,
            value: extrFiles
        }]]"></info-panel>
    </el-dialog>
</template>

<script>
import InfoPanel from './InfoPanel.vue'

export default {
    name: 'InfoDialog',
    data: () => ({
        isShow: false,
        groupNumber: 1,
        extrFiles: []
    }),
    mounted () {
        this.timer = setInterval(() => {
            this.groupNumber++
        }, 1000)
        setTimeout(() => {
            this.extrFiles = [{
                fileid: '1',
                txt: '公告附件1.pdf'
            }, {
                txt: '公告附件2.pdf'
            }]
        }, 2000)
    },
    methods: {
        show () {
            this.isShow = true
        },
        clickExtr (e) {
            console.log('附件被点击', e)
        }
    },
    components: {
        InfoPanel
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>
