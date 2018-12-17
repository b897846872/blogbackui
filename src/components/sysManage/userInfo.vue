<template>
  <div >
    <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>个人信息</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div class="infodiv">
        <ul>
          <li><span>名字</span>{{ userInfo.realName }}</li>
          <li><span>登录名</span>{{ userInfo.loginName }}</li>
          <li><span>密码</span>******<Button icon="md-lock" title="修改密码" shape="circle" @click="updateModel"></Button></li>
          <li><span>邮箱</span>{{ userInfo.email }}</li>
          <li><span>电话</span>{{ userInfo.phone }}</li>
          <li><span>最后一次登录时间</span>{{ new Date(userInfo.lastLoginTime).toLocaleString() }}</li>
        </ul>
      </div>
    </Card>
    <Modal v-model="userModel" :mask-closable="false" title="修改密码">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="新密码" prop="password" v-if="!formValidate.id">
                <Input type="password" v-model="formValidate.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem label="确认新密码" prop="oncePassword" v-if="!formValidate.id">
                <Input type="password" v-model="formValidate.oncePassword" placeholder="请再次输入密码"></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="userModel = false;">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import crypto from 'crypto'
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
          id: '1',
          userModel: false,
          userInfo: {
            id: '',
            loginName: '',
            realName: '',
            password: '',
            email: '',
            phone: '',
            lastLoginTime: '',
          },
          formValidate: {
            id: '',
            password: '',
            oncePassword: '',
          },
          ruleValidate: {
            password: [{ required: true, message: '密码不能为空', trigger: 'blur'},{ validator: validatePass, trigger: 'blur' }],
            oncePassword: [ { required: true, message: '请再次输入密码', trigger: 'blur'},{ validator: validatePassCheck, trigger: 'blur' }],
          },
       }
    },
    created(){
        this.initTable();
    },
    methods: {
        initTable() {
            this.$http.get('/blog/user/getUser?id='+this.id).then(function(res){
              this.userInfo = res.data.data;
            });
        },
        updateModel() {
          this.$refs['formValidate'].resetFields();
          this.userModel = true;
        },
        handleSubmit(name) {
          var md5 = crypto.createHash("md5");
          md5.update(this.formValidate.password);
          var passwordmd5 = md5.digest('hex');
          this.userInfo.password = passwordmd5;
          this.$refs[name].validate((valid) => {
              if (valid) {
                this.$http.put('/blog/user/updatePassword', this.userInfo).then(function(res){
                    if (res.data.code === 0) {
                        this.$Message.success('修改成功');
                        this.userModel = false;
                        this.initTable();
                    } else {
                      this.$Message.error(res.data.message);
                    }
                });
              }
          })
           
        },
    }

}
</script>

<style>
.infodiv ul{
  align-content: center;
  list-style: none;
  margin:0 auto;
}
.infodiv ul li{
  margin: 20px 0 20px 20px;
}
.infodiv ul li span {
  display: inline-block;
  width: 150px;
  margin: 0 50px;
}
</style>
