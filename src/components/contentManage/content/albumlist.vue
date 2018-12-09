<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem>相册管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="标题、内容" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="addAlbum" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="albumCol" :data="albumData"></Table>
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
            albumCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '标题',
                    key: 'title'
                },
                {
                    title: '内容',
                    key: 'content',
                    render: (h, params) => {
                      var showContent = params.row.content;
                      if (params.row.content.length >= 20) {
                        showContent = params.row.content.substring(0, 20);
                      }
                      return h('div', showContent+'......');
                    }
                },
                {
                    title: '点击数',
                    key: 'clicks',
                    render: (h, params) => {
                            return h('div', params.row.clicks?params.row.clicks:'0');
                    }
                },
                {
                    title: '分类',
                    key: 'categoryName'
                },
                {
                    title: '创建人',
                    key: 'loginName'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                            return h('div', params.row.createTime?new Date(params.row.createTime).toLocaleString():'');
                    }
                },
                {
                    title: '修改时间',
                    key: 'updateTime',
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
                                        this.deleteAlbum(params.row.id);
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
                                        this.updateAlbum(params.row);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            albumData: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/tabArticle/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&typeId=3'+'&searchValue='+this.searchValue).then(function(res){
                this.albumData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteAlbum(id) {
            this.$http.delete('/blog/tabArticle/delete?id='+id).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('删除成功');
                    this.initTable();
                } else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        updateAlbum(obj) {
             this.$router.push({ 
                    name:'AlbumAdd',
                    params: {
                        albumObj: obj
                    }
                 });
        },
        addAlbum() {
            this.$router.push({ path:'AlbumAdd'});
        },
    }
}
</script>

<style>
</style>
