<template>
    <!-- <button @click="increment">Count is: {{ state.count }}, double is: {{ state.double }}</button> -->
    <div>123</div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";

export default {
    setup() {
        const model = ref("login");
        console.log(model.value);
        const menuTab = reactive([
            { txt: "登陆", current: true, type: "login" },
            { txt: "注册", current: false, type: "register" }
        ]);
        console.log(menuTab);
        // const state = reactive({
        //     count: 0,
        //     double: computed(() => state.count * 2)
        // });

        // function increment() {
        //     state.count++;
        // }

        // return {
        //     state,
        //     increment
        // };
    }
};
</script>