<template>
    <div id="layout" :class="[metaStatus ? 'colse' :'open']">
        <LayoutNavs />
        <LayoutHeaders />
        <LayoutMains />
    </div>
</template>

<script>
import {root , computed} from '@vue/composition-api'
import LayoutNavs from './Components/Navs'
import LayoutHeaders from './Components/Headers'
import LayoutMains from './Components/Mains'
export default {
    name :'layout',
    components:{
        LayoutNavs,
        LayoutHeaders,
        LayoutMains
    },
    setup(props,{root}){
        const metaStatus = computed(()=>{
        //    return root.$store.state.isCollapse;
            return root.$store.state.app.isCollapse;
        })

        return {
            metaStatus
        }
    }
}
</script>

<style lang="scss" scoped>
#layout{
    background-color: #f7f7f7;
}
</style>