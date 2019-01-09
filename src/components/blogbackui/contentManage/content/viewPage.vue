<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容预览</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div>
        <h1 style="text-align:center;">{{ viewObj.title }}</h1>
        <div v-html="viewObj.content" :style="{margin: '0 auto', width: '1000px'}">
        </div>
      </div>
    </Card>
    <div class="bottom-fixed">
        <Button @click="back" style="margin-left: 8px; width:80px" type="primary">返回</Button>
    </div>
  </div>
</template>

<script>
export default {
    data () {
       return{
          viewObj: '',
          backPage: '',
       }
    },
    created(){
      if (this.$route.params.viewObj) {
        this.viewObj = this.$route.params.viewObj;
      }
      if (this.$route.params.backPage) {
        this.backPage = this.$route.params.backPage;
      }      
    },
    methods: {
      back() {
        this.$router.push({ path:this.backPage});
      },
    }
}
</script>

<style>
</style>
