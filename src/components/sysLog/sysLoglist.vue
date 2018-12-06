<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>系统日志</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}"> 
        <Input v-model="searchValue" placeholder="操作模块、IP" @on-change="initTable" clearable style="width: 200px" />
        </div>
        <div style="min-height: 600px;">
            <Table :columns="logCol" :data="logData" border stripe></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
            current: 1,
            total: 0,
            pageSize: 10,
            searchValue: '',
            logCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '操作模块',
                    key: 'operateModule'
                },
                {
                    title: '日志内容',
                    key: 'logContent'
                },
                {
                    title: '操作人',
                    key: 'operateUser'
                },
                {
                    title: 'IP',
                    key: 'ip'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                            return h('div', new Date(params.row.createTime).toLocaleString());
                    }
                },
                {
                    title: '修改时间',
                    key: 'updateTime',
                    render: (h, params) => {
                            return h('div', new Date(params.row.updateTime).toLocaleString());
                    }
                }
            ],
            logData: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/log/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.logData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
    }

}
</script>

<style>
</style>
