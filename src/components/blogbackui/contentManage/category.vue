<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>内容管理</BreadcrumbItem>
        <BreadcrumbItem>分类管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="分类名称、分类编码" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" v-has="'category_add'" @click="resetModel" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="categoryCol" :data="categoryData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <Modal v-model="categoryModel" :mask-closable="false" :title="formValidate.id?'修改分类':'添加分类'"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="分类名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入分类名称"></Input>
            </FormItem>
            <FormItem label="分类编码" prop="value">
                <Input v-model="formValidate.value" placeholder="请输入分类编码"></Input>
            </FormItem>
            <FormItem label="类型名称" prop="typeId">
                <Select v-model="formValidate.typeId">
                    <Option v-for="item in typelist" :value="item.id" :key="item.id">{{ item.dicName }}</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="categoryModel = false;">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
       return{
            current: 1,
            total: 0,
            pageSize: 10,
            searchValue: '',
            categoryCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '分类名称',
                    key: 'name'
                },
                {
                    title: '分类编码',
                    key: 'value'
                },
                {
                    title: '类型名称',
                    key: 'dicName'
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                            return h('div', params.row.createTime?new Date(params.row.createTime).toLocaleString():'');
                    }
                },
                {
                    title: '修改时间',
                    key: 'updateTime',
                    render: (h, params) => {
                            return h('div', params.row.updateTime?new Date(params.row.updateTime).toLocaleString():'');
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 150,
                    render: (h, params) => {
                        return h('ButtonGroup', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteCategory(params.row.id);
                                    }
                                },
                                directives: [
                                    {
                                      name: 'has',
                                      value: 'category_delete',
                                    }
                                ]
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.updateCategoryModel(params.row);
                                    }
                                },
                                directives: [
                                    {
                                      name: 'has',
                                      value: 'category_update',
                                    }
                                ]
                            }, '修改')
                        ]);
                    }
                }
            ],
            categoryData: [],
            categoryModel: false,
            formValidate: {
              id: '',
              name: '',
              value: '',
              typeId: '',
            },
            ruleValidate: {
              name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
              value: [{ required: true, message: '分类编码不能为空', trigger: 'blur' }],
              typeId: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
            },
            typelist: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/tabCategory/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.categoryData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteCategory(id) {
            this.$http.delete('/blog/tabCategory/delete?id='+id).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('删除成功');
                    this.initTable();
                } else {
                    this.$Message.error(res.data.message);
                }
            });
        },
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                if (this.formValidate.id === '') {
                  this.$http.put('/blog/tabCategory/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.categoryModel = false;
                        this.$refs[name].resetFields();
                        this.initTable();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateCategory(name);
                }
              }
          })
        },
        resetModel() {
          this.initTypeSelect();
          this.categoryModel = true;
          this.formValidate = {
              id: '',
              name: '',
              value: '',
              typeId: '',
          };
          this.$refs['formValidate'].resetFields();
        },
        updateCategoryModel(obj) {
          console.log(obj);
          this.initTypeSelect();
          this.categoryModel = true;
          this.formValidate = {
              id: obj.id,
              name: obj.name,
              value: obj.value,
              typeId: obj.typeId,
          };
        },
        updateCategory() {
            this.$http.put('/blog/tabCategory/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.categoryModel = false;
                    this.initTable();
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        initTypeSelect() {
            this.$http.get('/blog/sysDic/getDicType?dicType=BLOGTYPE').then(function(res){
              this.typelist = res.data.data;
            });
        },
    }
}
</script>

<style>
</style>
