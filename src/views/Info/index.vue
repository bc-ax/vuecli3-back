<template>
    <div>
        <!-- 搜索 -->
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for>类型：</label>
                    <div class="warp-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width:100%;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label for>日期：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-date-picker
                            style="width:100%"
                            v-model="date_value"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']"
                        ></el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-wrap">
                    <label for>关键字：</label>
                    <div class="warp-content">
                        <el-select v-model="search_key" style="width:100%">
                            <el-option
                                v-for="item in search_option"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="请输入搜索内容" style="width:100%"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width:100%">搜索</el-button>
            </el-col>
            <!-- <el-col :span="3">&nbsp;</el-col> -->
            <el-col :span="2" class="pull-right">
                <el-button type="danger" style="width:100%" @click="dialog_info=true">新增</el-button>
            </el-col>
        </el-row>

        <div class="height-30"></div>
        <!-- 表格 -->
        <el-table :data="table_data" border style="width: 100%">
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column prop="title" label="标题" width="830" align="center"></el-table-column>
            <el-table-column prop="category" label="类别" width="130" align="center"></el-table-column>
            <el-table-column prop="date" label="日期" align="center" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员" align="center" width="150"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="danger"
                        size="small"
                        icon="el-icon-delete"
                        circle
                        @click="deleteItem"
                    ></el-button>
                    <el-button type="success" size="small" icon="el-icon-edit" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="height-30"></div>

        <!-- 分页 -->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll">批量选择</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                ></el-pagination>
            </el-col>
        </el-row>

        <!-- 新增弹框 -->
        <DialogInfo :flag.sync="dialog_info" />
    </div>
</template>
 
<script>
import "../../styles/config.scss";
import { ref, reactive, root } from "@vue/composition-api";
import DialogInfo from "./dialog/info";
export default {
    name: "InfoIndex",
    components: {
        DialogInfo
    },
    setup(props, { root }) {
        // 新增弹框
        const dialog_info = ref(false);
        const search_key = ref("id");
        const category_value = ref("");
        const date_value = ref("");

        // 类型
        const options = reactive([
            {
                value: 1,
                label: "国际新闻"
            },
            {
                value: 2,
                label: "国内新闻"
            },
            {
                value: 3,
                label: "行内新闻"
            }
        ]);

        // 搜索
        const search_option = reactive([
            { value: "id", label: "ID" },
            { value: "title", label: "标题" }
        ]);
        // 表格
        const table_data = reactive([
            {
                title: "上海市普陀区金沙江路 1518 弄",
                category: "国际新闻",
                date: "2016-05-02",
                user: "管理员"
            },
            {
                title: "上海市普陀区金沙江路 1518 弄",
                category: "国际新闻",
                date: "2016-05-02",
                user: "管理员"
            },
            {
                title: "上海市普陀区金沙江路 1518 弄",
                category: "国际新闻",
                date: "2016-05-02",
                user: "管理员"
            },
            {
                title: "上海市普陀区金沙江路 1518 弄",
                category: "国际新闻",
                date: "2016-05-02",
                user: "管理员"
            }
        ]);

        const deleteItem = () => {
            root.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    root.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    root.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        };

        // 分页
        const handleSizeChange = reactive(value => {
            console.log(value);
        });

        const handleCurrentChange = reactive(value => {
            console.log(value);
        });
        return {
            // ref
            date_value,
            category_value,
            search_key,
            dialog_info,
            // reactive
            options,
            search_option,
            table_data,
            // methods
            handleSizeChange,
            handleCurrentChange,
            deleteItem
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    font-size: 15px;
    &.category {
        @include labelDom(left, 60, 40);
    }
    &.date {
        @include labelDom(right, 93, 40);
    }
    &.key-wrap {
        @include labelDom(right, 100, 40);
    }
}
</style>
