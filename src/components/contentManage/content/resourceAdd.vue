<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem to="Resourcelist">资源帖管理</BreadcrumbItem>
        <BreadcrumbItem>添加资源帖</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题" style="width: 400px"></Input>
            </FormItem>
            <FormItem label="文章类型" prop="categoryId">
                <Select v-model="formValidate.categoryId" style="width: 400px;z-index:11;">
                    <Option v-for="item in categorylist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="内容" prop="content">
                <mavon-editor v-model="formValidate.content" style="z-index:10;"/>
            </FormItem>
        </Form>
        <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
        <Button @click="back">返回</Button>
    </Card>
  </div>
</template>

<script>
export default {
    data () {
       return{
            formValidate: {
              id: '',
              title: '',
              categoryId: '',
              content: '',
              typeId: '4',
            },
            ruleValidate: {
              title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
              categoryId: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
              content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
            },
            categorylist: [],
       }
    },
    created(){
      if (this.$route.params.resourceObj) {
        this.formValidate = this.$route.params.resourceObj;
      }
      this.initTypeSelect();
    },
    methods: {
        initTypeSelect() {
            this.$http.get('/blog/tabCategory/categoryList?typeCode=resource').then(function(res){
              this.categorylist = res.data.data;
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
                        this.$router.push({ path:'Resourcelist'});
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateResource(name);
                }
              }
          })
        },
        updateResource() {
            this.$http.put('/blog/tabArticle/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.$router.push({ path:'Resourcelist'});
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        back() {
          this.$router.push({ path:'Resourcelist'});
        },
    }
}
</script>

<style>
</style>
