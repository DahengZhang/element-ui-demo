<template>
    <div class="panel-demos">
        <el-button type="primary" @click="$refs.InfoDialogEl.show()">弹窗</el-button>
        <info-dialog ref="InfoDialogEl"></info-dialog>
    </div>
</template>

<script>
import { InfoDialog } from '@/components/info-dialog'

export default {
    name: 'PanelDemos',
    components: {
        InfoDialog
    }
}
</script>
