<template>
    <div class="form-demos">
        <p>{{disabledItems}}</p>
        <el-table
            ref="tableEl"
            :current-row-key="'value'"
            :data="tableData"
            @select="handleSelect"
            @select-all="handleSelectAll">
            <el-table-column
                :selectable="(e, i) => {
                    return !disabledItems.includes(e.value)
                }"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="数据">
                <template slot-scope="scope">{{ scope.row.label }}</template>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="50">
        </el-pagination>
        <span style="padding: 10px" v-for="item in selected" :key="item" @click="deleteSelected(item)">{{item}}</span>
        <p>{{selectedObj}}</p>
    </div>
</template>

<script>
export default {
    name: 'FormDemos',
    data: () => ({
        disabledItems: [ 10, 11, 12, 13 ],
        tableData: [  ],
        selected: [  ], // 10, 11, 12, 13
        selectedObj: [  ], // { "value": 10, "label": "第10行数据" }, { "value": 11, "label": "第11行数据" }, { "value": 12, "label": "第12行数据" }, { "value": 13, "label": "第13行数据" }
        page: 1
    }),
    mounted () {
        this.tableData = this.getTableData(1)
        this.$nextTick(() => {
            for (let i = 0; i < this.tableData.length; i++) {
                this.selected.includes(this.tableData[i].value) && this.$refs.tableEl.toggleRowSelection(this.tableData[i], true)
            }
        })
    },
    methods: {
        deleteSelected (item) {
            if (this.disabledItems.includes(item)) {
                return
            }
            const index = this.selected.findIndex(i => i === item)
            index !== -1 && (this.selected.splice(index, 1), this.deleteSelectedObj(item))
            const i = this.tableData.findIndex(i => i.value === item)
            index !== -1 && this.$refs.tableEl.toggleRowSelection(this.tableData[i], false)
        },
        handleCurrentChange (e) {
            this.tableData = this.getTableData(e)
            this.page = e
            let isSelected = []
            for (let i = 0; i < this.tableData.length; i++) {
                this.selected.includes(this.tableData[i].value) && isSelected.push(i)
            }
            this.$nextTick(() => {
                isSelected.forEach(i => {
                    this.$refs.tableEl.toggleRowSelection(this.tableData[i], true)
                })
            })
        },
        handleSelect (e, row) {
            const ids = e.map(item => item.value)
            const index = this.selected.findIndex(item => row.value === item)
            if (index === -1) {
                this.selected.push(row.value)
                this.selectedObj.push(row)
            } else {
                !ids.includes(row.value) && (this.selected.splice(index, 1), this.deleteSelectedObj(row.value))
            }
        },
        handleSelectAll (e) {
            try {
                e.forEach(i => {
                    if (!this.disabledItems.includes(i.value)) {
                        throw ''
                    }
                }) // 有不包含的项，说明是新增
                for (let i = 0; i < this.tableData.length; i++) {
                    const index = this.selected.findIndex(item => item === this.tableData[i].value)
                    index !== -1 && !this.disabledItems.includes(this.tableData[i].value) && (this.selected.splice(index, 1), this.deleteSelectedObj(this.tableData[i].value))
                }
            } catch (error) {
                for (let i = 0; i < this.tableData.length; i++) {
                    !this.selected.includes(this.tableData[i].value)
                    && !this.disabledItems.includes(this.tableData[i].value)
                    && (this.selected.push(this.tableData[i].value), this.selectedObj.push(this.tableData[i]))
                }
            }
        },
        getTableData (page) {
            let tmp = []
            for (let i = 0; i < 10; i++) {
                tmp.push({
                    value: page * 10 + i,
                    label: `第${page * 10 + i}行数据`
                })
            }
            return tmp
        },
        deleteSelectedObj (k) {
            const index = this.selectedObj.findIndex(item => item.value === k)
            this.selectedObj.splice(index, 1)
        }
    }
}
</script>
