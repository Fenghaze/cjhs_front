<template>
  <div>
    <div class="search">
      查询标题：
      <el-input v-model="form.title" style="width: 197px"></el-input>&nbsp;&nbsp;
      查询内容：
      <el-input v-model="form.content" style="width: 197px"></el-input>&nbsp;&nbsp;
      <el-button icon="el-icon-search" circle @click="search"></el-button>&nbsp;&nbsp;
      <el-button type="primary" @click="flag=!flag">高级检索</el-button>
    </div>
    <br />
    <!-- 高级搜索 -->
    <div class="search1" v-show="flag" style="float:right">
      <div class="form-inline">
        业务类型：
        <el-select v-model="form.service_type">
          <el-option v-for="item in select1" :key="item" :value="item">{{item}}</el-option>
        </el-select>&nbsp;&nbsp;
        文件类型：
        <el-select v-model="form.file_type">
          <el-option v-for="item in select2" :key="item" :value="item">{{item}}</el-option>
        </el-select>&nbsp;&nbsp;
        效力层级：
        <el-select v-model="form.scope">
          <el-option v-for="item in select3" :key="item" :value="item">{{item}}</el-option>
        </el-select>&nbsp;&nbsp;
        颁布单位：
        <el-select v-model="form.dept">
          <el-option v-for="item in select4" :key="item" :value="item">{{item}}</el-option>
        </el-select>&nbsp;&nbsp;
      </div>
      <br />
      <div class="form-inline">
        有效日期：
        <el-date-picker
          v-model="form.effect_time_start"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span style="margin-left:30px; margin-right:30px">&nbsp;至&nbsp;</span>
        <el-date-picker
          v-model="form.effect_time_end"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>&nbsp;&nbsp;
        发布时间：
        <el-date-picker
          v-model="form.pub_time_start"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span style="margin-left:30px; margin-right:30px">&nbsp;至&nbsp;</span>
        <el-date-picker
          v-model="form.pub_time_end"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      flag: false,
      form: {
        effect_time_start: "",
        effect_time_end: "",
        pub_time_start: "",
        pub_time_end: "",
        title: "", //查询标题
        content: "", //查询内容
        service_type: "全部", // 业务类型
        file_type: "全部", //文件类型
        scope: "全部", // 效力层级
        dept: "全部", //颁布单位
      },

      select1: [
        "全部",
        "综合管理",
        "船舶管理",
        "公司管理",
        "船检管理",
        "船员管理",
        "规费征稽",
        "航海保障",
        "事故调查",
        "通航管理",
        "危防管理",
        "应急搜救",
        "党内法规",
      ], // 业务类型
      select2: ["全部", "内部文件", "外部文件"], // 文件类型
      select3: [
        "全部",
        "国际公约",
        "法律",
        "行政法规",
        "地方性法规",
        "部门规章",
        "地方政府规章",
        "规范性文件",
        "其他",
      ], //效力层级
      select4: [
        "全部",
        "全国人大",
        "国务院",
        "交通运输部",
        "地方人大、政府",
        "交通运输部海事局",
        "长江航务管理局",
        "长江海事局",
        "江苏海事局",
      ], //颁布单位
    };
  },
  methods: {
    search() {
      this.$store.commit("getformdata", {
        title: this.form.title,
        content: this.form.content, //查询内容
        service_type: this.form.service_type, // 业务类型
        file_type: this.form.file_type, //文件类型
        scope: this.form.scope, // 效力层级
        dept: this.form.dept, //颁布单位
        effect_time_start: this.form.effect_time_start,
        effect_time_end: this.form.effect_time_end,
        pub_time_start: this.form.pub_time_start,
        pub_time_end: this.form.pub_time_end,
      });
      this.$store.commit("search", this.page);

      (this.form.title = ""), //查询标题
        (this.form.content = ""), //查询内容
        (this.form.service_type = "全部"), // 业务类型
        (this.form.file_type = "全部"), //文件类型
        (this.form.scope = "全部"), // 效力层级
        (this.form.dept = "全部"), //颁布单位
        (this.form.effect_time_start = ""),
        (this.form.effect_time_end = ""),
        (this.form.pub_time_start = ""),
        (this.form.pub_time_end = "");
    },
  },
};
</script>

<style scoped lang="scss">
</style>
