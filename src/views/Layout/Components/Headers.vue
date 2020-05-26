<template>
    <div id="headers-wrap">
        <div class="pull-left header-icon" @click="navMenuStat()">
            <svg-icon iconClass="menus" class="menus" />
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                <img src="../../../assets/images/users.jpg" alt />
                {{username}}
            </div>
            <div class="header-info pull-left" @click="exit()">
                <svg-icon iconClass="exit" class="exit" />
            </div>
        </div>
    </div>
</template>

<script>
import { root, computed } from "@vue/composition-api";
export default {
    name: "headers",
    setup(props, { root }) {
        // 监听
        const username = computed(() => {
            return root.$store.state.app.username;
        });
        const navMenuStat = () => {
            root.$store.commit("app/SET_Collapse");
            // root.$store.dispatch('setMenuStatus');
        };

        // 退出
        const exit = () => {
            console.log("ss");
            root.$confirm(
                "此操作将退出系统，是否继续？",
                "确认信息",
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "放弃"
                }
            )
            .then(() => {
                root.$message({
                    type: "success",
                    message: "已跳转到登陆页"
                });
                root.$store.dispatch("app/exit")
                .then(()=>{
                    root.$router.push({
                        name:'Login'
                    });
                })
                .catch(error=>{
                    console.log(error);
                })

            })
            .catch(action => {
                root.$message({
                    type: "info",
                    message:"取消退出操作"
                });
            });
        };
        return {
            navMenuStat,
            username,
            exit
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#headers-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: $layoutWidth;
    height: 75px;
    line-height: 75px;
    -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease 0s;
}
.header-icon {
    padding: 0 32px;
}

svg {
    font-size: 25px;
    cursor: pointer;
    margin-bottom: -8px;
}
.user-info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    cursor: pointer;
    + .header-info {
        padding: 0 28px;
    }
    img {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 50%;
        margin-bottom: -12px;
        margin-right: 18px;
    }
}

.open {
    #headers-wrap {
        left: $layoutWidth;
    }
}
.colse {
    #headers-wrap {
        left: $layoutWidth - 135;
    }
}
</style>