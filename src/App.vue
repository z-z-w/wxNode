<template>
    <div class="container">
        <div class="nav-container">
            <p class="nav-title">后台管理系统</p>
            <ul>
                <router-link tag="li" to="/mathList" class="nav-link">试题</router-link>
                <router-link tag="li" to="/add" class="nav-link">添加</router-link>
                <li class="nav-link">登出</li>
            </ul>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="text/stylus" lang="stylus">
    @import "common/css/reset.styl";
    .container
        display flex
        .nav-container
            width 200px
            min-height 760px
            background #0f0f0f
            .nav-title
                padding 30px 0
                text-align center
                color #fff
                font-size 25px
            .nav-link
                padding 15px 0 15px 30px
                border-left 3px solid #4c366b
                color #fff
                font-size 16px
                &.active
                    background #222

</style>
