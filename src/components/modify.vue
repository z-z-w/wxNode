<template>
    <div>
        <math-item :item="item" :cancelShow="true" @submit="modifyItem" :warn="warn">
        </math-item>
    </div>
</template>

<script>
  import MathItem from '../base/math-item'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        item: {},
        warn: ''
      }
    },
    components: {
      MathItem
    },
    computed: {
      ...mapGetters([
        'math'
      ])
    },
    created() {
      if (!this.math.id) {
        this.$router.push('/')
      } else {
        this._getMathItem()
      }
    },
    methods: {
      modifyItem(item) {
        this.$axios.post('/wechat/modifyMathItem', {
          item
        }).then((res) => {
          if (res.data.code === 0) {
            this.warn = res.data.message;
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        })
      },
      _getMathItem() {
        this.$axios.post('/wechat/getMathItem', {
          id: this.math.id
        }).then((res) => {
          this.item = this._initData(res.data.data);
        })
      },
      _initData(data) {
        let ret = {...data};
        if (ret.images && ret.images.length > 0) {
          ret.images = data.images.join('、');
        }
        ret.option = data.option.join('、');
        return ret;
      }
    },
    watch: {
      math(newMath, oldMath) {
        if (newMath.id === oldMath.id) {
          return;
        }
        this._getMathItem(newMath.id);
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">
</style>