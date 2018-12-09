<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>系统配置</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="参数名称、参数值" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="resetModel" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="configCol" :data="configData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <Modal v-model="configModel" :mask-closable="false" :title="formValidate.id?'修改系统配置':'添加数据字典'"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="参数名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入参数名称"></Input>
            </FormItem>
            <FormItem label="参数值" prop="value">
                <Input v-model="formValidate.value" placeholder="请输入参数值"></Input>
            </FormItem>
            <FormItem label="描述" prop="remark">
                <Input v-model="formValidate.remark" placeholder="请输入描述"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="configModel = false;">取消</Button>
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
            configCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '参数名称',
                    key: 'name'
                },
                {
                    title: '参数值',
                    key: 'value'
                },
                {
                    title: '描述',
                    key: 'remark'
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
                                        this.deleteconfig(params.row.id);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.updateconfigModel(params.row);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            configData: [],
            configModel: false,
            formValidate: {
              id: '',
              name: '',
              value: '',
              remark: '',
            },
            ruleValidate: {
              name: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }],
              value: [{ required: true, message: '参数值不能为空', trigger: 'blur' }],
            },
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/sysConfig/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.configData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteconfig(id) {
            this.$http.delete('/blog/sysConfig/delete?id='+id).then(function(res){
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
                  this.$http.put('/blog/sysConfig/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.configModel = false;
                        this.$refs[name].resetFields();
                        this.initTable();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateconfig(name);
                }
              }
          })
        },
        resetModel() {
          this.configModel = true;
          this.formValidate = {
              id: '',
              name: '',
              value: '',
              remark: '',
          };
          this.$refs['formValidate'].resetFields();
        },
        updateconfigModel(obj) {
          this.configModel = true;
          this.formValidate = {
              id: obj.id,
              name: obj.name,
              value: obj.name,
              remark: obj.remark,
          };
        },
        updateconfig() {
            this.$http.put('/blog/sysConfig/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.configModel = false;
                    this.initTable();
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style>
</style>
