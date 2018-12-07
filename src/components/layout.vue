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
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-stats" />
                                内容管理
                            </template>
                                <MenuItem name="2-1" > 文章管理</MenuItem>
                                <MenuItem name="2-2">随笔管理</MenuItem>
                                <MenuItem name="2-3">相册管理</MenuItem>
                                <MenuItem name="2-4">资源贴管理</MenuItem>
                                <MenuItem name="2-5">评论管理</MenuItem>
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
                                <MenuItem name="3-1">个人信息</MenuItem>
                                <MenuItem name="3-3">角色管理</MenuItem>
                                <MenuItem name="3-4">菜单管理</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 20px'}" style="min-height: 600px;">
                <router-view/>
            </Content>
            <Footer class="layout-footer-center">&copy; blogBack</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
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