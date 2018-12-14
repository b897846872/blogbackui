<template>
    <div class="layout">
        <Layout>
            <Header :style="{padding: '0 20px'}"> 
                <Menu mode="horizontal" :theme="theme1" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <!-- <MenuItem name="1">
                            <Icon type="ios-paper" />
                            用户管理
                        </MenuItem> -->
                        <!-- <Submenu v-for="item in mainlist" :name="item.id" :key="item.id">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                {{ item.name }}
                            </template>
                                <MenuItem v-if="item.id === itemson.parentId" v-for="itemson in menulist" :name="itemson.url" :key="itemson.url" 
                                  :to="itemson.url">{{ itemson.name }}</MenuItem>
                        </Submenu> -->
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
                                <MenuItem name="Login" to="Login">测试登录页</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 20px'}" style="min-height: 600px;">
                <router-view/>
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
                userId: '1',
                menulist: [],
                mainlist: [],
                functionlist: [],
            }
        },
        created(){
            this.initmenu();
        },        
        methods: {
          initmenu() {
            this.$http.get('/blog/permission/findSysPermissionByUserId?userId='+this.userId).then(function(res){
                if (res.data.code === 0) {
                  for(var i=0; i<res.data.data.length; i++){
                    if (res.data.data[i].type === 'main') {
                      this.mainlist.push(res.data.data[i]);
                    } else if (res.data.data[i].type === 'menu') {
                      this.menulist.push(res.data.data[i]);
                    } else if (res.data.data[i].type === 'function') {
                      this.functionlist.push(res.data.data[i]);
                    }
                  }
                  sessionStorage.setItem("buttenpremissions",JSON.stringify(this.functionlist));
                }
            });
          }
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
.layout-nav{
    width: auto;
    margin: 0 auto;
}
.layout-footer-center{
    text-align: center;
}
</style>