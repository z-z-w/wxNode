<template>
    <div class="math-item-container">
        <div class="header">
            <span class="type">单项选择题</span>
            <div>
                <a v-show="cancelShow" href="javascript:;" class="submit" @click="cancel">取消</a>
                <a href="javascript:;" class="submit" @click="submit">提交</a>
            </div>
        </div>
        <div class="question-container">
            <div class="input-container">
                <span class="label">问题:</span>
                <input type="text" class="input" placeholder="请输入问题的题目" v-model="item.question">
            </div>
            <div class="input-container">
                <span class="label">答案:</span>
                <input type="text" class="input" placeholder="请输入答案，每选项以、分割" v-model="item.option">
            </div>
            <div class="input-container">
                <span class="label">正确答案:</span>
                <input type="text" class="input" placeholder="请输入正确答案" v-model="item.rightAnswer">
            </div>
            <div class="input-container">
                <span class="label">图片地址:</span>
                <input type="text" class="input" placeholder="请输入图片地址, 每张以、分割" v-model="item.images">
            </div>
            <p class="warning" v-html="warn"></p>
        </div>
    </div>
</template>

<script>

  export default {
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      warn: {
        type: String,
        default: ''
      },
      cancelShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      cancel() {
        this.$router.back();
      },
      submit() {
        this.$emit('submit', this.item);
      }
    },
  }
</script>

<style scoped type="text/stylus" lang="stylus">
    .math-item-container
        width 1000px
        margin 50px 0 261px 30px
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
            .submit
                padding 8px 20px
                color #fff
                background #85b5dd
                border-radius 4px
                margin-right 10px
        .question-container
            margin 30px 15px
            .input-container
                display flex
                flex-direction column
                margin-bottom 10px
                .label
                    margin-bottom 15px
                    font-size 18px
                    font-weight 700
                    color red
                .input
                    width 800px
                    line-height 30px
                    border: 1px solid #ccc
                    border-radius 5px
                    outline none
            .warning
                margin-top 30px
                color red
                font-size 18px
                font-weight 700
</style>