<template>
    <div class="layout">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="light" active-name="WelcomeFront">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="WelcomeFront" to="WelcomeFront">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            文章
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            随笔
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            相册
                        </MenuItem>
                        <MenuItem name="5">
                            <Icon type="ios-paper"></Icon>
                            资源
                        </MenuItem>
                    </div>
                    <div class="layout-search">
                      <Button icon="ios-search" @click="searchArticle">全局搜索</Button>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '70px 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view/>                
            </Content>
            <Footer class="layout-footer-center">2019 &copy; blog qi</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
      data () {
       return{
         searchValue: '',
         articlelist: [],
       }
      },
      created(){
      },
      methods: {
        searchArticle() {
          this.$router.push({ 
            name:'ResultPage'
          });
          
        },
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
      padding: 0 20px;
      z-index: 10;
    }
    .layout-logo{
        background: url(../../assets/logo.png) no-repeat left;
        background-size: 100%;
        width: 120px;
        height: 40px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        min-width: 500px;
        margin: 0 auto;
        float: center;
    }
    .layout-search{
        float: right;
        margin-right: 80px;
    }
    .layout-footer-center{
        text-align: center;
        
    }
    .content-left{
        border-right: 1px dashed #eee;
        min-height: 500px;
        margin-left: 30px;
    }



    .article-list {
        margin-top: 35px;
    }
    .list-unstyled {
        padding-left: 0;
        list-style: none;
    }
    .article-list .article-item {
        display: list-item;
        float: left;
        width: 100%;
        padding-right: 2px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        word-wrap: break-word;
        line-height: 1.5em;
        border-color: #d9d9d9;
    }
    .article-list .list-top {
        margin: 8px 0;
        font-size: 12px;
    }
    .article-list .title {
        margin-right: 10px;
        font-size: 18px;
        font-weight: bold;
        line-height: 2.5;
    }
    .link-title {
        color: #555;
    }
    .link-title:hover{
        color: #bdc3c9;
    }
    .article-list .list-footer {
        font-size: 12px;
        line-height: 2.5;
    }
    .article-list .title {
        font-size: 18px;
        font-weight: bold;
        line-height: 1.5;
    }
</style>