<template>
    <div>
        <math-item @submit="addItem" :warn="warn"></math-item>
    </div>
</template>

<script>
    import MathItem from '../base/math-item'
  export default {
    data() {
      return {
        warn: '',
      }
    },
    components: {
      MathItem
    },
    methods: {
      addItem(item) {
        this.$axios.post('/wechat/addMathItem', {
          item
        }).then((res) => {
          if (res.data.code === 0) {
            this.warn = res.data.message;
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.warn = res.data.message;
          }
        })
      }
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">

</style>