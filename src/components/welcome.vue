<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>总览</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <p style="font-size: 25px;">欢迎使用管理后台!</p>
      <div class="divclass1">
        <p class="pclass"><b>开始使用</b></p>
        <ul class="urlul">
          <li><a to="ArticleAdd"><Icon type="ios-create" />添加文章</a></li>
          <li><a><Icon type="ios-create" />添加随笔</a></li>
          <li><a><Icon type="ios-create" />添加相册</a></li>
          <li><a><Icon type="ios-create" />添加资源帖</a></li>
        </ul>
      </div>
      <div class="divclass2">
        <p class="pclass"><b>概述</b></p>
        <ul class="urlul">
          <li><a><Icon type="ios-create" />添加文章</a></li>
          <li><a><Icon type="ios-create" />添加随笔</a></li>
          <li><a><Icon type="ios-create" />添加相册</a></li>
          <li><a><Icon type="ios-create" />添加资源帖</a></li>
        </ul>
      </div>
    </Card>
    <Card class="cardClass1">
      <p slot="title">最新发布</p>
      <div class="newdiv" v-for="item in newData" :key="item.id">
         <span style="width:100px;display:inline-block;"><Time :time="item.createTime"/></span>
        <span style="margin-left:40px;"><a @click="viewnew(item)">[{{item.dicName}}]{{ item.title }}</a></span>
      </div>
    </Card>
    <Card class="cardClass2">
      <p slot="title">快速草稿</p>
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题" style="width: 400px"></Input>
            </FormItem>
            <FormItem label="内容" prop="content">
                <Input v-model="formValidate.content" type="textarea" :rows="10" placeholder="请输入内容" />
            </FormItem>
            <FormItem >
               <Button @click="handleSubmit('formValidate')" type="primary">保存</Button>
            </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
         username: '',
         formValidate: {
            id: '',
            title: '',
            content: '',
            typeId: '2',
          },
          ruleValidate: {
            title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
            content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
          },
          newData: [],
       }
    },
    created(){
      this.username = sessionStorage.getItem("username");
      this.initNew();
    },
    methods: {
      initNew() {
        this.$http.get('/blog/tabArticle/list?pageNum=1&pageSize=6').then(function(res){
            this.newData = res.data.data.list;
        });
      },
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                if (this.formValidate.id === '') {
                  this.$http.put('/blog/tabArticle/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.$refs[name].resetFields();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateEssay(name);
                }
              }
          })
      },
      viewnew(obj) {
        this.$router.push({ 
              name:'ViewPage',
              params: {
                viewObj: obj,
                backPage: 'Welcome'
              }
        });          
      }
    }
}
</script>

<style>
.pclass{
  font-size: 16px;
  padding: 5px 10px;
}
.divclass1{
  display:inline-block;
}
.divclass2{
  display:inline-block;
  margin: 0 0 0 100px;
}
.newdiv{
  padding: 10px;
  margin: 10px;
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
  width: 49%;
  height: 420px;
}
.cardClass2{
  float: right;
  margin: 10px 0 10px 0;
  width: 50%;
  height: 420px;
}
</style>
