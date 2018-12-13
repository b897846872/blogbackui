<template>
	<div class="login-bg">
		<div class="login-logo">
      <!-- <img src="../assets/login-logo.png" /> -->
    </div>
		<div class="login-card">
			<h1>博客后台管理系统 </h1>
			<h3>version 1.0.0</h3>
			<Form :label-width="0">
		<FormItem prop="user">
            <Input type="text" v-on:on-enter="login" v-model="un" placeholder="用户名"  style="width:100%;">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-on:on-enter="login" v-model="pw" placeholder="密码" style="width:100%;">
                <Icon type="locked" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="login" shape="circle" long style="font-size:20px;">登录</Button>
        </FormItem>
    </Form>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				un: '',
				pw: '',
				message: ''
			}
		},
		methods: {
			login: function() {
				var _this = this;
				// this.$http.post('/icms-aoms/index', {
				// 		un: this.un,
				// 		pw: this.pw
				// 	}, {
				// 		emulateJSON: true
				// 	})
				// 	.then(function(res) {
				// 		_this.message = res.data.message;
				// 		if(res.data.code == 0){
				// 			this.$router.push("/index");
				// 		}
				// 		else{
				// 			this.$Modal.error(res.data.message);
				// 			}
				// 	});
			}
		}
	}
</script>
<style scoped>.login-bg {
	background: #fff url(../assets/login-bg.jpg) no-repeat top fixed;
	background-size: 100% 100%;
	background-size: cover;
	height: 100%;
	width: 100%;
}

.login-logo {}

.login-bg {
	padding: 10% 10% 0px 10%;
}

.login-card {
	width: 40%;
	/*height: 350px;*/
	background: #FFF;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 4% 5% 4%;
}

.login-card h1 {
	font-size: 26px;
	text-align: center;
	padding-bottom: 10px;
	font-weight: 400;
}
.login-card h3 {
	font-size: 14px;
	text-align: center;
	padding-bottom: 20px;
	font-weight: 300;
}
.login-logo img {
	/*background: url(../assets/login-logo.png) no-repeat;*/
	position: absolute;
	left: 2.5%;
	width: 10%;
	/*height: 8%;*/
	top: 20px;
	background-size: 100% 100%;
}
</style>