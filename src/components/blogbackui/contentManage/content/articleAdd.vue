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
            <FormItem label="标签" prop="lableNamelist">
                <Tag v-for="item in formValidate.lableNamelist" :key="item" :name="item" closable @on-close="handleCloseLable">
                  {{ item }}
                </Tag>
                <Button icon="ios-add" type="dashed" size="small" @click="handleAddLablelist">添加标签</Button>
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
              <editor id="tinymce" v-model="formValidate.content" :init="this.GLOBAL.editorInit"></editor>
            </FormItem>
        </Form>
    </Card>
    <div class="bottom-fixed">
        <Button @click="handleSubmit('formValidate')" style="width:80px" type="primary">保存</Button>
        <Button @click="back" style="margin-left: 8px; width:80px">返回</Button>
    </div>
    <Modal v-model="lableModel" :mask-closable="false" title="添加标签">
        <Form :model="formLableValidate" :label-width="80">
            <FormItem label="标签" prop="dicTypeName">
                <Input v-model="formLableValidate.dicTypeName" placeholder="请输入标签"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleLableSubmit()">确认</Button>
            <Button @click="lableModel = false;">取消</Button>
        </div>
    </Modal>
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
              lableNamelist: [],
            },
            ruleValidate: {
              title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
              hasOriginal: [{ required: true, message: '是否原创不能为空', trigger: 'blur' }],
              categoryId: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
              content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
            },
            categorylist: [],
            formLableValidate: {
              dicTypeName: '',
            },
            lableModel: false,
       }
    },
    created(){
      if (this.$route.params.articleObj) {
        this.formValidate = this.$route.params.articleObj;
        this.initLablelist();
      }
      this.initTypeSelect();
    },
    methods: {
        initTypeSelect() {
            this.$http.get('/blog/tabCategory/categoryList?typeCode=article').then(function(res){
              this.categorylist = res.data.data;
            });          
        },
        initLablelist() {
          this.$http.get('/blog/tabArticle/listLable?id='+this.formValidate.id).then(function(res){
              this.formValidate.lableNamelist = res.data.data;
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
        handleLableSubmit() {
          this.formValidate.lableNamelist.push(this.formLableValidate.dicTypeName);
          this.lableModel = false;
          this.formLableValidate.dicTypeName = '';
        },
        handleAddLablelist() {
            this.lableModel = true;
        },
        handleCloseLable(event, name) {
            const index = this.formValidate.lableNamelist.indexOf(name);
            this.formValidate.lableNamelist.splice(index, 1);
        },
    }
}
</script>

<style>
</style>
