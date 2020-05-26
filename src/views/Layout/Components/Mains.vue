<template>
    <div id="mains-wrap">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'mains'
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#mains-wrap{
    position: fixed;
    left: $layoutWidth;
    top: 85px;
    right: 0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    @include webkit(box-sizing,border);
    padding: 30px 30px;
    @include webkit(transition,all 0.3s ease 0s);
}
.open{
    #mains-wrap {
        left: $layoutWidth;
    }
}
.colse{
    #mains-wrap{
        left: $layoutWidth - 135;
    }
}
</style>