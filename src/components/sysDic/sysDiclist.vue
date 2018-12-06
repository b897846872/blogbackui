<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>数据字典</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="字典名称、字典编码、字典类型" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="dicModel = true;" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="dicCol" :data="dicData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <!-- <Modal v-model="dicModel" :mask-closable="false" title="添加数据字典"
        @on-ok="ok" >
        <Form :model="formItem" :label-width="80">
            <FormItem label="">
                <Input v-model="formItem.input" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="Select">
                <Select v-model="formItem.select">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
        </Form>
    </Modal> -->
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
            dicCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '字典名称',
                    key: 'dicName'
                },
                {
                    title: '字典编码',
                    key: 'dicCode'
                },
                {
                    title: '字典类型',
                    key: 'dicType'
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
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 150,
                    render: (h, params) => {
                        return h('ButtonGroup', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteDic(params.row.id);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.updateDic(params.row.id);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            dicData: [],
            dicModel: false,
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/sysDic/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.dicData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteDic(id) {
            this.$http.delete('/blog/sysDic/delete?id='+id).then(function(res){
                if (res.data.code === 0) {
                    this.initTable();
                }
            });
        },
        updateDic() {
            this.$http.put('/blog/sysDic/updateDicCode').then(function(res){
                if (res.data.code === 0) {
                }
            });
        },
    }

}
</script>

<style>
</style>
