<template>
    <div class="math-wrapper">
        <div class="math-header">
            <div class="search-container">
                <a href="javascript:;" class="search" @click="searchMath">搜索</a>
                <input type="text" class="search-text" placeholder="请输入关键词" v-model="search">
            </div>
            <span class="message" v-show="!searchShow">试题列表</span>
            <transition name="move">
                <div class="message-container" v-show="searchShow">
                    <span class="message">查询结果</span>
                    <a href="javascript:;" class="message" @click="back">返回列表</a>
                </div>
            </transition>

        </div>

        <div class="math-list">
            <transition-group name="math">
                <div class="math-item" v-for="(item, index) in mathList" :key="index">
                    <div class="header">
                        <span class="type">单项选择题</span>
                        <div class="doSomething">
                            <a href="javascript:;" class="del" @click="confirm(item._id)">删除</a>
                            <a href="javascript:;" class="modify" @click="modify(item._id)">修改</a>
                        </div>
                    </div>
                    <div class="question-container">
                        <div class="question">
                            <span class="ques">问题: </span>
                            <p class="title">{{item.question}}</p>
                        </div>
                        <div class="answer">
                            <ul>
                                <li class="answer-item" v-for="(option, index) in item.option">
                                    {{optionComputed(option,index)}}
                                </li>
                            </ul>
                        </div>
                        <div class="right-answer">
                            <span class="right">正确答案</span>
                            <span class="answer">{{item.rightAnswer}}</span>
                        </div>
                    </div>
                </div>
            </transition-group>


            <div class="page-container" v-if="pages>0">
                <a href="javascript:;" class="prev" :class="{'no': page === 1}" @click="prevPage">上一页</a>
                <p class="page"><strong class="current">{{page}}</strong> / {{pages}}</p>
                <a href="javascript:;" class="next" :class="{'no': page === pages}" @click="nextPage">下一页</a>
            </div>
            <modal :mdShow="modalShow" @closeModal="closeModal">
                <div class="confirm-tips" slot="message">确定要删除该问题吗</div>
                <div slot="btnGroup" class="btn-wrap">
                    <button class="btn btn--m" @click="del">确定</button>
                    <button class="btn btn--m" @click="closeModal">取消</button>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
  import Modal from '../base/Modal'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        page: 1,
        pages: 1,
        mathList: [],
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        modalShow: false,
        modifyShow: false,
        search: '',
        searchShow: false
      }
    },
    components: {
      Modal
    },
    created() {
      this._initMath();
    },
    mounted() {
      this.deleteId = '';
    },
    methods: {
      optionComputed(option, index) {
        let ret = this.options[index] + '. ' + option;
        return ret;
      },
      prevPage() {
        if (this.page <= 1) {
          this.page = 1;
        } else {
          this.page--;
        }
        if (!this.searchShow) {
          this._initMath();
        } else {
          this.searchMath();
        }
      },
      nextPage() {
        if (this.page >= this.pages) {
          this.page = this.pages;
        } else {
          this.page++;
        }
        if (!this.searchShow) {
          this._initMath();
        } else {
          this.searchMath();
        }
      },
      confirm(id) {
        this.modalShow = true;
        this.deleteId = id;
      },
      closeModal() {
        this.modalShow = false;
      },
      del() {
        if (!this.deleteId) {
          return;
        } else {
          this.$axios.post('/wechat/delete', {
            id: this.deleteId
          })
        }
        this.modalShow = false;
        this._initMath();
      },
      modify(id) {
        this.setMathId({id});
        this.$router.push({
          path: '/modify'
        })
      },
      searchMath() {
        if (!this.searchShow) { //如果是第一次查询，先设置页面也1
          this.searchShow = true;
          this.page = 1;
        }
        this.$axios.post('/wechat/getMathList', {
          page: this.page,
          search: this.search
        }).then((res) => {
          if (res.data.code === 0) {
            this.mathList = res.data.data;
            this.pages = res.data.pages
          }
        })
      },
      back() {
        this.search = '';
        this._initMath();
      },
      _initMath() {
        if (this.searchShow) {
          this.searchShow = false;
          this.page = 1;
        }
        this.$axios.post('/wechat/getMathList', {
          page: this.page
        }).then((res) => {
          if (res.data.code === 0) {
            this.mathList = res.data.data;
            this.pages = res.data.pages
          }
        })
      },
      ...mapMutations({
        setMathId: 'SET_MATH'
      })
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">

    .move-enter-active, .move-leave-active
        transition all 0.3s

    .move-enter, .move-leave-to
        transform translate3d(100%, -100%, 0)

    .math-wrapper
        width 1000px
        position relative
        .math-header
            display flex
            margin 50px 0 0 30px
            justify-content space-between
            align-items center
            .search-container
                width 300px
                height 40px;
                border: 1px solid #97d197
                border-radius 30px
                display flex
                align-items center
                .search
                    width: 60px;
                    height 40px
                    line-height 40px
                    margin-right 10px
                    color #fff
                    background #97d197
                    text-align center
                    border-bottom-left-radius 20px
                    border-top-left-radius 20px
                .search-text
                    outline none
                    height 40px
                    line-height 40px
                    color #ccc
            .message
                display inline-block
                width 100px
                height: 40px
                line-height 40px
                text-align center
                border 1px solid #97d197
                border-radius 30px
                background #97d197
                color #fff
        .math-item
            margin 50px 0 0 30px
            border 2px solid #cdcdcd
            .header
                display flex
                justify-content space-between
                align-items center
                padding 30px 10px
                border-bottom 2px solid #cdcdcd
                .type
                    padding 10px
                    background #91d791
                    border-radius 4px
                    color #fff
                    text-align center
                .del, .modify
                    padding 8px 20px
                    color #fff
                    background #85b5dd
                    border-radius 4px
                    margin-right 10px
            .question-container
                padding 30px 20px
                .question
                    display flex
                    align-items flex-start
                    .ques
                        flex 0 0 60px
                        color red
                        font-size 20px
                        font-weight 700
                    .title
                        line-height 25px
                .answer
                    margin-left 20px
                    .answer-item
                        margin 30px 0
                .right-answer
                    margin-left 20px
                    color red
                    .answer
                        font-size 20px
                        font-weight 700

        .page-container
            width 300px
            height 40px
            margin 50px auto 30px auto
            display flex
            justify-content space-around
            align-items center
            border: 1px solid #CCCCCC
            border-radius 10px
            color #3375b6
            .prev, .next
                padding 10px
                color #3375b6
                &.no
                    color #797979
</style>