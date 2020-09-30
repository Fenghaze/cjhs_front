<template>
  <div>
    <!-- 搜索框 -->
    <div class="row" style="margin-bottom: 15px">
      <div class="col-md-11">
        <search-box></search-box>
      </div>
    </div>
    <!-- 信息展示框 -->
    <el-table
      height="610"
      :data="$store.state.posts_lst"
      stripe
      style="width: 100%; margin-bottom: 5px"
    >
      <el-table-column label="文件名称">
        <template slot-scope="scope">
          <a
            :href="$store.state.base_url + '/file/show/' + scope.row.id"
            v-html="scope.row.name"
            target="_blank"
          ></a>
        </template>
      </el-table-column>
      <el-table-column label="相关内容" width="130">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column prop="service_type" label="业务类型"></el-table-column>
      <el-table-column prop="file_type" label="文件类型"></el-table-column>
      <el-table-column prop="scope" label="效力层级"></el-table-column>
      <el-table-column prop="dept" label="颁布单位"></el-table-column>
      <el-table-column prop="pub_time_s" label="发布时间"></el-table-column>
      <el-table-column prop="effect_time_s" label="生效时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a :href="$store.state.base_url + '/file/download/' + scope.row.id"
            >下载</a
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination-box :results_len="$store.state.total"></pagination-box>
  </div>
</template>

<script>
import search from "./Search.vue";
import pagination from "./Pagination.vue";
export default {
  data() {
    return {
      page: 1,
    };
  },
  created() {
    this.getposts();
  },

  methods: {
    getposts() {
      this.$store.commit("getformdata", {
        title: "",
        content: "", //查询内容
        service_type: "", // 业务类型
        file_type: "", //文件类型
        scope: "", // 效力层级
        dept: "", //颁布单位
        effect_time_start: "",
        effect_time_end: "",
        pub_time_start: "",
        pub_time_end: "",
      });
      this.$store.commit("search", this.page);
    },
  },
  watch: {},
  components: {
    "pagination-box": pagination,
    "search-box": search,
  },
};
</script>

<style scoped lang="scss">
</style>
