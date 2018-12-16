<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>角色管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="角色名称" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="resetModel" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="roleCol" :data="roleData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <Modal v-model="roleModel" :mask-closable="false" :title="formValidate.id?'修改角色':'添加角色'"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="角色名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="roleModel = false;">取消</Button>
        </div>
    </Modal>
    <Modal v-model="permissionModel" :mask-closable="false" title="权限授权"
       >
         <Tree ref="tree" :data="treeData" show-checkbox></Tree>
        <div slot="footer">
            <Button type="primary" @click="addRolePermission">确认</Button>
            <Button @click="permissionModel = false;">取消</Button>
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
            roleCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '角色名称',
                    key: 'name'
                },
                {
                    title: '创建人',
                    key: 'loginName'
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
                    width: 200,
                    render: (h, params) => {
                        return h('ButtonGroup', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.permissionAdd(params.row.id);
                                    }
                                }
                            }, '权限授权'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.updateRoleModel(params.row);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteRole(params.row.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            roleData: [],
            roleModel: false,
            formValidate: {
              id: '',
              name: '',
            },
            ruleValidate: {
              name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
            },
            treeData: [],
            permissionModel: false,
            roleId: '',
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/role/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.roleData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteRole(id) {
            this.$http.delete('/blog/role/delete?id='+id).then(function(res){
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
                  this.$http.put('/blog/role/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.roleModel = false;
                        this.$refs[name].resetFields();
                        this.initTable();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updateRole(name);
                }
              }
          })
        },
        resetModel() {
          this.roleModel = true;
          this.formValidate = {
              id: '',
              name: '',
          };
          this.$refs['formValidate'].resetFields();
        },
        updateRoleModel(obj) {
          this.roleModel = true;
          this.formValidate = {
              id: obj.id,
              name: obj.name,
          };
        },
        updateRole() {
            this.$http.put('/blog/role/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.roleModel = false;
                    this.initTable();
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        permissionAdd(id) {
            this.roleId = id;
            this.$http.get('/blog/permission/findSysPermissionByRoleId?roleId='+id).then(function(res){
                this.treeData = res.data.data;
            });
            this.permissionModel = true;
        },
        addRolePermission() {
            var treeCheck = this.$refs['tree'].getCheckedNodes();
            this.$http.put('/blog/role/saveRolePermission?roleId='+this.roleId, treeCheck).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('添加成功');
                    this.permissionModel = false;
                } else {
                    this.$Message.error(res.data.message);
                }
            });
        }
    }
}
</script>

<style>
</style>