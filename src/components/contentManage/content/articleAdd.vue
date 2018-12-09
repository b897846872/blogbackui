<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem to="Articlelist">文章管理</BreadcrumbItem>
        <BreadcrumbItem>添加文章</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题" style="width: 400px"></Input>
            </FormItem>
            <FormItem label="是否原创" prop="hasOriginal">
                <RadioGroup v-model="formValidate.hasOriginal">
                  <Radio label="0">是</Radio>
                  <Radio label="1">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="文章类型" prop="categoryId">
                <Select v-model="formValidate.categoryId" style="width: 400px;z-index:11;">
                    <Option v-for="item in categorylist" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="内容" prop="content">
                <mavon-editor v-model="formValidate.content" @imgAdd="imgAdd" @imgDel="imgDel" style="z-index:10;"/>
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
              hasOriginal: '0',
              categoryId: '',
              content: '',
              typeId: '1',
            },
            ruleValidate: {
              title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
              hasOriginal: [{ required: true, message: '是否原创不能为空', trigger: 'blur' }],
              categoryId: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
              content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
            },
            categorylist: [],
       }
    },
    created(){
      if (this.$route.params.articleObj) {
        this.formValidate = this.$route.params.articleObj;
      }
      this.initTypeSelect();
    },
    methods: {
        initTypeSelect() {
            this.$http.get('/blog/tabCategory/categoryList?typeCode=article').then(function(res){
              this.categorylist = res.data.data;
            });          
        },
        imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
            console.log(pos, $file);
           var formdata = new FormData();
           formdata.append('image', $file);
           this.$http.post('server url', formdata).then(function(res){
             console.log(res);
             $vm.$img2Url(pos, url);
           });
          //  axios({
          //      url: 'server url',
          //      method: 'post',
          //      data: formdata,
          //      headers: { 'Content-Type': 'multipart/form-data' },
          //  }).then((url) => {
          //      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          //      /**
          //      * $vm 指为mavonEditor实例，可以通过如下两种方式获取
          //      * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
          //      * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
          //      */
          //      $vm.$img2Url(pos, url);
          //  })
        },
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                if (this.formValidate.id === '') {
                  this.$http.put('/blog/tabArticle/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.$refs[name].resetFields();
                        this.$router.push({ path:'Articlelist'});
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateArticle(name);
                }
              }
          })
        },
        updateArticle() {
            this.$http.put('/blog/tabArticle/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.$router.push({ path:'Articlelist'});
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        back() {
          this.$router.push({ path:'Articlelist'});
        },
    }
}
</script>

<style>
</style>
