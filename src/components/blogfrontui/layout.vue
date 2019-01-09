<template>
    <div class="layout">
        <Layout>
            <Header :style="{padding: '0 20px'}"> 
                <Menu mode="horizontal" :theme="theme1" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                内容管理
                            </template>
                                <MenuItem name="Articlelist" to="Articlelist">文章管理</MenuItem>
                                <MenuItem name="Essaylist" to="Essaylist">随笔管理</MenuItem>
                                <MenuItem name="Albumlist" to="Albumlist">相册管理</MenuItem>
                                <MenuItem name="Resourcelist" to="Resourcelist">资源贴管理</MenuItem>
                                <MenuItem name="Comment" to="Comment">评论管理</MenuItem>
                                <MenuItem name="Category" to="Category">分类管理</MenuItem>
                        </Submenu>                       
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                系统管理
                            </template>
                                <MenuItem name="Log" to="Log">系统日志</MenuItem>
                                <MenuItem name="Dic" to="Dic">数据字典</MenuItem>
                                <MenuItem name="Config" to="Config">系统配置</MenuItem>
                                <MenuItem name="User" to="User">用户管理</MenuItem>
                                <MenuItem name="UserInfo" to="UserInfo">个人信息</MenuItem>
                                <MenuItem name="Role" to="Role">角色管理</MenuItem>
                                <MenuItem name="SysMenu" to="SysMenu">菜单管理</MenuItem>
                        </Submenu>
                    </div>
                    <ul class="header-menu">
                      <li class="header-menu-item">
                      <Icon type="power"></Icon> <span v-on:click="logout">退出</span></li>
                      <li class="header-menu-item">
                      <Icon type="ios-person"></Icon> <span v-on:click="userInfo">{{ username }}</span></li>
                    </ul>
                </Menu>
            </Header>
            <Content :style="{padding: '0 20px'}" style="min-height: 600px;">
              <transition name="slide-fade">
                <router-view/>
              </transition>
            </Content>
            <Footer class="layout-footer-center">&copy; blogBack 2018.12</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                userId: '',
                menulist: [],
                mainlist: [],
                functionlist: [],
                username: '',
            }
        },
        created(){
          
        },        
        methods: {
          
        }
    }
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.ivu-layout-header{
    background: #f5f7f9;
}
.layout-logo{
    width: 100px;
    height: 30px;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.header-menu .header-menu-item {
	list-style: none;
    outline: 0;
	float: right;
	padding: 0 10px;
	position: relative;
	cursor: pointer;
	z-index: 9;
	-webkit-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out;
	height: 60px;
	font-size: 14px;
}
.header-menu-item:hover{color: #5cadff;}
.layout-nav{
    width: auto;
    margin: 0 auto;
}
.layout-footer-center{
    text-align: center;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>