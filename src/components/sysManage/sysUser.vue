<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>用户管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div :style="{margin: '0 0 10px'}">
            <Input v-model="searchValue" placeholder="登录名、名字" @on-change="initTable" clearable style="width: 200px" />
            <div style="float: right;"><Button type="primary" @click="resetModel" ghost>添加</Button></div>
        </div>
        <div style="min-height: 600px;">
            <Table border :columns="userCol" :data="userData"></Table>
            <div style="float: right; margin: 10px">
                <Page :current="current" :total="total" @on-change="tableChange" :page-size="pageSize" show-total/>
            </div>
        </div>
    </Card>
    <Modal v-model="userModel" :mask-closable="false" :title="formValidate.id?'修改用户':'添加用户'"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="名字" prop="realName">
                <Input v-model="formValidate.realName" placeholder="请输入名字"></Input>
            </FormItem>
            <FormItem label="登录名" prop="loginName">
                <Input v-model="formValidate.loginName" placeholder="请输入登录名"></Input>
            </FormItem>
            <FormItem label="密码" prop="password" v-if="!formValidate.id">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="oncePassword" v-if="!formValidate.id">
                <Input type="password" v-model="formValidate.oncePassword" placeholder="请再次输入密码"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
            </FormItem>
            <FormItem label="电话" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入电话"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="userModel = false;">取消</Button>
        </div>
    </Modal>
    <Modal v-model="roleModel" :mask-closable="false" title="分配角色"
       >
        <Table border :columns="roleCol" :data="roleData" @on-select-all-cancel="selectAllCancelRole" @on-select-all="selectAllRole"
            @on-select="selectRole" @on-select-cancel="cancelRole"></Table>
        <div slot="footer">
            <Button type="primary" @click="addUserRole()">确认</Button>
            <Button @click="roleModel = false;">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formValidate.oncePassword !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate.validateField('oncePassword');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidate.password) {
                callback(new Error('两次输入密码不一致！'));
            } else {
                callback();
            }
        };
       return{
            current: 1,
            total: 0,
            pageSize: 10,
            searchValue: '',
            userCol: [
                {
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '登录名',
                    key: 'loginName'
                },
                {
                    title: '名字',
                    key: 'realName'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '电话',
                    key: 'phone'
                },               
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '最后一次登录时间',
                    key: 'lastLoginTime',
                    render: (h, params) => {
                            return h('div', params.row.lastLoginTime?new Date(params.row.lastLoginTime).toLocaleString():'');
                    }
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
                                        this.roleTabModel(params.row);
                                    }
                                }
                            }, '分配角色'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.updateUserModel(params.row);
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
                                        this.deleteUser(params.row.id);
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            userData: [],
            userModel: false,
            formValidate: {
              id: '',
              realName: '',
              loginName: '',
              password: '',
              oncePassword: '',
              email: '',
              phone: '',
            },
            ruleValidate: {
              realName: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
              loginName: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
              password: [{ required: true, message: '密码不能为空', trigger: 'blur'},{ validator: validatePass, trigger: 'blur' }],
              oncePassword: [ { required: true, message: '请再次输入密码', trigger: 'blur'},{ validator: validatePassCheck, trigger: 'blur' }],
              email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
              phone: [{ required: true, message: '电话不能为空', trigger: 'blur' }],
            },
            roleCol: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
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
                }
            ],
            roleData: [],
            roleModel: false,
            rolecurrent: 1,
            roletotal: 0,
            rolepageSize: 10,
            userId: '',
            selectRoleData: [],
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/user/list?pageNum='+this.current+'&pageSize='+this.pageSize+'&searchValue='+this.searchValue).then(function(res){
                this.userData = res.data.data.list;
                this.current = res.data.data.pageNum;
                this.total = res.data.data.total;
            });
        },
        tableChange(curr) {
            this.current = curr;
            this.initTable();
        },
        deleteUser(id) {
            this.$http.delete('/blog/user/delete?id='+id).then(function(res){
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
                  this.$http.put('/blog/user/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.userModel = false;
                        this.$refs[name].resetFields();
                        this.initTable();
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });
                } else {
                  this.updateUser(name);
                }
              }
          })
        },
        resetModel() {
          this.userModel = true;
          this.formValidate = {
              id: '',
              userName: '',
              userCode: '',
              userType: '',
          };
          this.$refs['formValidate'].resetFields();
        },
        updateUserModel(obj) {
            this.userModel = true;
            this.formValidate = {
                id: obj.id,
                realName: obj.realName,
                loginName: obj.loginName,
                password: '',
                oncePassword: '',
                email: obj.email,
                phone: obj.phone
            };
        },
        updateUser() {
            this.$http.put('/blog/user/update', this.formValidate).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('修改成功');
                    this.userModel = false;
                    this.initTable();
                } else {
                  this.$Message.error(res.data.message);
                }
            });
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        roleTabModel(obj) {
            this.$http.get('/blog/role/findUserRoleTab?pageNum='+this.rolecurrent+'&pageSize='+this.rolepageSize+'&userId='+obj.id).then(function(res){
                this.roleData = res.data.data.list;
                this.rolecurrent = res.data.data.pageNum;
                this.roletotal = res.data.data.total;
            });
            this.userId = obj.id;
            this.roleModel = true;
        },
        selectRole(selection, row) {
            this.selectRoleData = selection;
        },
        cancelRole(selection, row) {
            this.selectRoleData = selection;
        },
        selectAllRole(selection) {
            this.selectRoleData = selection;
        },
        selectAllCancelRole(selection) {
            this.selectRoleData = selection;
        },
        addUserRole() {
            this.$http.put('/blog/user/saveUserRole?userId='+this.userId, this.selectRoleData).then(function(res){
                if (res.data.code === 0) {
                    this.$Message.success('分配成功');
                    this.roleModel = false;
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
