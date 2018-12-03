<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>数据字典</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div style="min-height: 600px;">
            <Table :columns="dicCol" :data="dicData"></Table>
        </div>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
            dicCol: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            dicData: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/sysDic/list?pageNum=1&pageSize=10').then(function(res){
            });
        },
    }

}
</script>

<style>
</style>
