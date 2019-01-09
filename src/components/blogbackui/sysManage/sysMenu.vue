<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>菜单管理</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <!-- <div :style="{margin: '0 0 10px'}"> 
        <Input v-model="searchValue" placeholder="操作模块、IP" @on-change="initTable" clearable style="width: 200px" />
        </div> -->
        <div style="min-height: 600px;">
            <Tree :data="data2" :render="renderContent" ></Tree>
        </div>
    </Card>
    <Modal v-model="menuModel" :mask-closable="false" title="添加菜单节点"
       >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="父节点" prop="parentName">
                <Input v-model="formValidate.parentName" disabled></Input>
            </FormItem>
            <FormItem label="节点类型" prop="type">
                <Select v-model="formValidate.type">
                    <Option value="menu">菜单</Option>
                    <Option value="function">功能</Option>
                </Select>
            </FormItem>
            <FormItem label="节点名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入节点名称"></Input>
            </FormItem>
            <FormItem label="节点编码" prop="code">
                <Input v-model="formValidate.code" placeholder="请输入节点编码"></Input>
            </FormItem>
            <FormItem label="菜单地址" prop="url" v-if="formValidate.type === 'menu'">
                <Input v-model="formValidate.url" placeholder="请输入菜单地址"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="append('formValidate')">确认</Button>
            <Button @click="menuModel = false;">取消</Button>
        </div>
    </Modal>
    <Modal v-model="addAndUpdateModel" :mask-closable="false" title="操作"
       >
        <p>你是要进行<span style="color:red;">添加</span>还是<span style="color:red;">修改</span>?</p>
        <div slot="footer">
            <Button type="primary" @click="addPermissionModel(treeData)">添加</Button>
            <Button type="info" @click="updatePermissionModel(treeData)">修改</Button>
            <Button @click="addAndUpdateModel = false">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
    data () {
       return{
            data2: [],
            menuModel: false,
            addAndUpdateModel: false,
            formValidate: {
              parentId: '',
              parentName: '',
              type: '',
              name: '',
              code: '',
              url: '',
              orderl: 0,
              id: '',
            },
            ruleValidate: {
              type: [{ required: true, message: '节点类型不能为空', trigger: 'blur' }],
              name: [{ required: true, message: '节点名称不能为空', trigger: 'blur' }],
              code: [{ required: true, message: '节点编码不能为空', trigger: 'blur' }],
              url: [{ required: true, message: '菜单地址不能为空', trigger: 'blur' }],
            },
            treeData: '',
       }
    },
    created(){
        this.initTree();
    },
    methods: {
        initTree() {
            this.$http.get('/blog/permission/findSysPermissionAll').then(function(res){
                this.data2 = res.data.data;
            });
        },
        renderContent (h, { root, node, data }) {
            var disabledRemove = false;
            if (data.children.length > 0) {
              disabledRemove = true;
            }
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        // float: 'right',
                        marginLeft: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-create'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.appendModel(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove',
                            disabled: disabledRemove
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
          },
          appendModel(data) {
            this.treeData = data;
            this.addAndUpdateModel = true;
            // this.$Modal.confirm({
            //     title: '操作',
            //     content: '<p>你是要进行<span style="color:red;">添加</span>还是<span style="color:red;">修改</span>?</p>',
            //     okText: '添加',
            //     cancelText: '修改',
            //     onOk: () => {
            //       this.addPermissionModel(data);
            //     },
            //     onCancel: () => {
            //       this.updatePermissionModel(data);
            //     }
            // });
          },
          addPermissionModel(data) {
            this.addAndUpdateModel = false;
            this.$refs['formValidate'].resetFields();
            this.formValidate.parentId = data.id;
            this.formValidate.parentName = data.title;
            this.formValidate.name = '';
            this.formValidate.code = '';
            this.formValidate.id = '';
            this.formValidate.type = '';
            this.formValidate.url = '';
            this.formValidate.orderl = '';
            this.menuModel = true;
          },
          updatePermissionModel(data) {
            this.addAndUpdateModel = false;
            this.formValidate.parentId = data.parentId;
            this.formValidate.parentName = data.parentName;
            this.formValidate.name = data.title;
            this.formValidate.code = data.code;
            this.formValidate.id = data.id;
            this.formValidate.type = data.sysPermissionVo.type;
            this.formValidate.url = data.sysPermissionVo.url;
            this.formValidate.orderl = data.sysPermissionVo.orderl;
            this.menuModel = true;
          },
          append (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                if (this.formValidate.id === '') {
                  this.$http.put('/blog/permission/save', this.formValidate).then(function(res){
                      if (res.data.code === 0) {
                        this.$Message.success('保存成功');
                        this.$refs[name].resetFields();
                        this.initTree();
                        this.menuModel = false;
                      } else {
                        this.$Message.error(res.data.message);
                      }
                  });                  
                } else {
                  this.updatePermission(name);
                }
              }
            })
            // const children = data.children || [];
            // children.push({
            //     title: 'appended node',
            //     expand: true
            // });
            // this.$set(data, 'children', children);
          },
          updatePermission(name) {
            this.$http.put('/blog/permission/update', this.formValidate).then(function(res){
              if (res.data.code === 0) {
                this.$Message.success('保存成功');
                this.$refs[name].resetFields();
                this.initTree();
                this.menuModel = false;
              } else {
                this.$Message.error(res.data.message);
              }
            });
          },
          remove (root, node, data) {
            this.$Modal.confirm({
                title: '删除',
                content: '<p>确认要删除 ' + data.title + ' ?</p>',
                onOk: () => {
                  this.deletePermission(data.id);
                }
            });
            // const parentKey = root.find(el => el === node).parent;
            // const parent = root.find(el => el.nodeKey === parentKey).node;
            // const index = parent.children.indexOf(data);
            // parent.children.splice(index, 1);
          },
          deletePermission(id) {
            this.$http.delete('/blog/permission/delete?id='+id).then(function(res){
              if (res.data.code === 0) {
                this.$Message.success('删除成功');
                this.initTree();
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
