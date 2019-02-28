<template>
  <div >
    <div class="but-top">
      <Input v-model="searchValue" @on-search="initlist" search enter-button 
                            placeholder="请输入关键字" style="width: 200px"  />
    </div>
    <Row>
        <Col span="19" class="content-left">
          <ul class="article-list list-unstyled clearfix">
            <li class="article-item" v-for="item in contentData" :key="item.id"> 
              <div>
                <p class="list-top">
                  <Time :time="item.createTime" />
                </p>
                <h4 class="title"><a @click="viewSingle(item.id)" class="link-title">
                  [{{item.dicName}}]{{item.title}}</a>
                </h4>
                <div class="list-footer">
                  <span>阅读 {{ item.clicks ? item.clicks : 0 }}</span>
                  <span> · 评论 {{item.commentNum?item.commentNum:0}}</span>
                </div>
              </div>
            </li>
          </ul>
          <!-- <div class="load-more" v-show="showMoreButtonFlag">
            <button class="ladda-button" @click="showmorelist"><span class="ladda-label">点击查看更多</span></button>
          </div> -->
        </Col>
        <Col span="5">
        
        </Col>
        <BackTop height=100></BackTop>
    </Row>    
  </div>
</template>

<script>
export default {
    data () {
       return{
        pageSize: 12,
        contentData: [],
        searchValue: '',
       }
    },
    created(){
      this.contentData = [];
      this.initlist();
    },
    methods: {
      initlist() {
        this.$http.get('/blog/tabArticle/listArticleByLable?pageNum=1&pageSize=100&searchValue='+this.searchValue).then(function(res){
              this.contentData = res.data.data.list;
          });
      },
      viewSingle(id) {
        this.$router.push({ 
            name:'ViewPageFront',
            params: {
              id: id
            }
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
    .but-top{
      margin: 20px 0 0 30px;
    }
</style>
