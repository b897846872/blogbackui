<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>数据字典</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="字典名称、字典编码、字典类型" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="resetModel" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="dicCol" :data="dicData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <Modal v-model="dicModel" :mask-closable="false" :title="formValidate.id?'修改数据字典':'添加数据字典'"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="字典名称" prop="dicName">
                <Input v-model="formValidate.dicName" placeholder="请输入字典名称"></Input>
            </FormItem>
            <FormItem label="字典编码" prop="dicCode">
                <Input v-model="formValidate.dicCode" placeholder="请输入字典编码"></Input>
            </FormItem>
            <FormItem label="字典类型" prop="dicType">
                <Select v-model="formValidate.dicType" placeholder="请输入字典类型">
                    <Option v-for="item in dicTypelist" :value="item.dicTypeName" :key="item.id">{{ item.dicTypeName }}</Option>
                </Select>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="dicModel = false;">取消</Button>
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
            dicCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '字典名称',
                    key: 'dicName'
                },
                {
                    title: '字典编码',
                    key: 'dicCode'
                },
                {
                    title: '字典类型',
                    key: 'dicType'
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
                                        this.deleteDic(params.row.id);
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
                                        this.updateDicModel(params.row);
                                    }
                                }
                            }, '修改')
                        ]);
                    }
                }
            ],
            dicData: [],
            dicModel: false,
            formValidate: {
              id: '',
              dicName: '',
              dicCode: '',
              dicType: '',
            },
            ruleValidate: {
              dicName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
              dicCode: [{ required: true, message: '字典编码不能为空', trigger: 'blur' }],
              dicType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
            },
            dicTypelist: [],
       }
    },
    created(){
        this.initTable();
        this.initDicType();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/sysDic/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.dicData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        initDicType() {
            this.$http.get('/blog/sysDicType/listDicType').then(function(res){
                this.dicTypelist = res.data.data;
            });
        },
        deleteDic(id) {
            this.$http.delete('/blog/sysDic/delete?id='+id).then(function(res){
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
                  this.$http.put('/blog/sysDic/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.dicModel = false;
                        this.$refs[name].resetFields();
                        this.initTable();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateDic(name);
                }
              }
          })
        },
        resetModel() {
          this.dicModel = true;
          this.formValidate = {
              id: '',
              dicName: '',
              dicCode: '',
              dicType: '',
          };
          this.$refs['formValidate'].resetFields();
        },
        updateDicModel(obj) {
          this.dicModel = true;
          this.formValidate = {
              id: obj.id,
              dicName: obj.dicName,
              dicCode: obj.dicCode,
              dicType: obj.dicType,
          };
        },
        updateDic() {
            this.$http.put('/blog/sysDic/updateSysDic', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.dicModel = false;
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
