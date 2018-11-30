<template>
  <div >
    <Table :columns="dicCol" :data="dicData"></Table>
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
        console.log(666666666);
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/sysDic/list?pageNum=1&pageSize=10').then(function(res){
                console.log(res)
            });
        },
    }

}
</script>

<style>
</style>
