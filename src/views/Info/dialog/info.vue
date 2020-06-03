<template>
    <div>
        <el-dialog
            title="新增"
            :visible.sync="dialog_info_flag"
            width="580px"
            :modal-append-to-body="false"
            @close="close"
        >
            <el-form :model="form">
                <el-form-item label="类型：" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="概况：" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import "../../../styles/config.scss";
import { ref, reactive, watchEffect,watch } from "@vue/composition-api";
export default {
    name: "dialogInfo",
    props: {
        flag: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const dialog_info_flag = ref(false);
        const formLabelWidth = ref("70px");

        const form = reactive({
            name: "",
            region: "",
            date1: "",
            date2: "",
            delivery: false,
            type: [],
            resource: "",
            desc: ""
        });

        // 关闭后的回调函数
        const close = () => {
            dialog_info_flag.value = false;
            // 修饰器
            emit("update:flag", false);
        };
        
        watch(
            () => props.flag,
            (count, prevCount) => {
                dialog_info_flag.value = count;
            }
        );
        // watchEffect(() => {
        //     dialog_info_flag.value = props.flag
        // });
        return {
            dialog_info_flag,
            formLabelWidth,
            form,
            close
        };


    }
};
</script>

<style scoped>
</style>