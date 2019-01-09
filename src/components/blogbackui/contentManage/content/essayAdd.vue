<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem to="Essaylist">随笔管理</BreadcrumbItem>
        <BreadcrumbItem>添加随笔</BreadcrumbItem>
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
                <editor id="tinymce" v-model="formValidate.content" :init="this.GLOBAL.editorInit"></editor>
            </FormItem>
        </Form>
    </Card>
    <div class="bottom-fixed">
        <Button @click="handleSubmit('formValidate')" style="width:80px" type="primary">保存</Button>
        <Button @click="back" style="margin-left: 8px; width:80px">返回</Button>
    </div>
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
              typeId: '2',
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
      if (this.$route.params.essayObj) {
        this.formValidate = this.$route.params.essayObj;
      }
      this.initTypeSelect();
    },
    methods: {
        initTypeSelect() {
            this.$http.get('/blog/tabCategory/categoryList?typeCode=essay').then(function(res){
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
                        this.$router.push({ path:'Essaylist'});
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
        updateEssay() {
            this.$http.put('/blog/tabArticle/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.$router.push({ path:'Essaylist'});
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        back() {
          this.$router.push({ path:'Essaylist'});
        },
    }
}
</script>

<style>
</style>
