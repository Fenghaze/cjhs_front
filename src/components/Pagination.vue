<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="results_len"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
    };
  },
  computed: {
    total: function () {
      //计算总页码需要使用 计算属性 ，放在data运算不出来
      return (this.results_len / 10) * 10; // 一页显示 10 条数据
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$store.commit('search', val)
    },
  },
  props: ["results_len", "path_name"],
};
</script>

<style scoped lang="less">
</style>
