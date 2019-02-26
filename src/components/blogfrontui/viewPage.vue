<template>
  <div >
    <Card>
      <div>
        <h1 style="text-align:center;">{{ viewObj.title }}</h1>
        <div style="text-align:center;">
          <Tag color="primary" v-for="item in lablelist" :key="item.lid">
            {{item.lableName}}
          </Tag>
        </div>
        <div v-html="viewObj.content" :style="{margin: '0 auto', width: '1000px'}">
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
          id: '',
          viewObj: '',
          lablelist: '',
       }
    },
    created(){
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
      }
      this.initViewObj();
      this.initLableArticle();
    },
    methods: {
      initViewObj() {
        this.$http.get('/blog/tabArticle/list?pageNum=1&pageSize=1&articleId='+this.id).then(function(res){
            this.viewObj = res.data.data.list[0];
        });
      },
      initLableArticle() {
        this.$http.get('/blog/tabArticle/getLableArticle?id='+this.id).then(function(res){
            this.lablelist = res.data.data;
        });
      },
    }
}
</script>

<style>
</style>
