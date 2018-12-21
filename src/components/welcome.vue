<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>总览</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <p style="font-size: 25px;">欢迎使用管理后台!</p>
      <p class="pclass"><b>开始使用</b></p>
      <ul class="urlul">
        <li><a><Icon type="ios-create" />添加文章</a></li>
        <li><a><Icon type="ios-create" />添加随笔</a></li>
        <li><a><Icon type="ios-create" />添加相册</a></li>
        <li><a><Icon type="ios-create" />添加资源帖</a></li>
      </ul>
    </Card>
    <Card class="cardClass1">
      <p slot="title">概览</p>
    </Card>
    <Card class="cardClass1">
      <p slot="title">最新</p>
    </Card>
    <Card class="cardClass2">
      <p slot="title">快速草稿</p>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
         username: '',
       }
    },
    created(){
      this.username = sessionStorage.getItem("username");
      this.initTable();
    },
    methods: {
      initTable() {
        
      },
    }
}
</script>

<style>
.pclass{
  font-size: 16px;
  padding: 5px 10px;
}
.urlul{
  
  list-style: none;
  padding: 0 10px;
}
.urlul li{
  margin: 5px 0;
}
.cardClass1{
  float: left;
  margin: 10px 10px 10px 0;
  width: 50%;
}
.cardClass2{
  float: right;
  margin: 10px 0 10px 0;
  width: 47%;
}
</style>
