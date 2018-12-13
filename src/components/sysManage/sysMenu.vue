<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>菜单管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}"> 
        <Input v-model="searchValue" placeholder="操作模块、IP" @on-change="initTable" clearable style="width: 200px" />
        </div>
        <div style="min-height: 600px;">
            <Tree :data="data2" show-checkbox></Tree>
        </div>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
            data2: [],
       }
    },
    created(){
        this.initTree();
    },
    methods: {
        initTree() {
            this.$http.get('/blog/sysDic/list').then(function(res){
                this.data2 = res.data.data;
            });
        },
    }

}
</script>

<style>
</style>
