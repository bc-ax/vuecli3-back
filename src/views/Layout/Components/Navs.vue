<template>
    <div id="navs-wrap">
        <h1 class="navs-logo">
            <img src="../../../assets/logo.png" alt />
        </h1>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#fff"
            router
        >
            <template v-for="(item,index) in routers">
                <el-submenu :index="index + ''" :key="item.id" v-if="!item.hidden">
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item
                        v-for="subItem in item.children"
                        :key="subItem.id"
                        :index="subItem.path"
                    >{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
            <svg-icon />
        </el-menu>
    </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
    name: "navs",
    setup(props, { root }) {
        // 当前路由有哪些
        const routers = reactive(root.$router.options.routes);
        // console.log(routers)
        // methods

        const isCollapse = computed(() => {
            return root.$store.state.app.isCollapse;
        });

        return {
            isCollapse,
            routers
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#navs-wrap {
    position: fixed;
    width: $layoutWidth;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #344a5f;
    @include webkit(transition,all 0.3s ease 0s);

    .navs-logo {
        text-align: center;
        margin-top: 20px;
        img {
            width: 80px;
        }
    }

    svg {
        margin-right: 10px;
        font-size: 20px;
    }
}

.open {
    #navs-wrap {
        width: $layoutWidth;
    }
}

.colse {
    #navs-wrap {
        width: 65px;
        .navs-logo {
            text-align: center;
            margin-top: 20px;
            img {
                width: 40px;
                @include webkit(transition,all 0.3s ease 0s);
            }
        }
    }
}
</style>