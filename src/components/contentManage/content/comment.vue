<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem>评论管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="内容" @on-change="initTable" clearable style="width: 200px" />
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="commentCol" :data="commentData"></Table>
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
            commentCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '内容',
                    key: 'content',
                    render: (h, params) => {
                      return h('div', params.row.content);
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: 200, 
                    render: (h, params) => {
                            return h('div', params.row.createTime?new Date(params.row.createTime).toLocaleString():'');
                    }
                },
                {
                    title: '修改时间',
                    key: 'updateTime',
                    width: 200,
                    render: (h, params) => {
                            return h('div', params.row.updateTime?new Date(params.row.updateTime).toLocaleString():'');
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
                                        this.deleteComment(params.row.id);
                                    }
                                },
                                directives: [
                                    {
                                      name: 'has',
                                      value: 'comment_delete',
                                    }
                                ]
                            }, '删除')
                        ]);
                    }
                }
            ],
            commentData: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/tabComment/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&content='+this.searchValue).then(function(res){
                this.commentData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteComment(id) {
            this.$http.delete('/blog/tabComment/delete?id='+id).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('删除成功');
                    this.initTable();
                } else {
                    this.$Message.error(res.data.message);
                }
            });
        }
    }
}
</script>

<style>
</style>
