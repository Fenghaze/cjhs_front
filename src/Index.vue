<template>
  <div>
    <!--    导航    -->
    <div class="UpContent">
      <div class="banner">
          <img :src="src" alt="" style="
          width:53%;
          height:136px">
      </div>
      <div class="menu"></div>
    </div>
    <!-- main -->
    <div class="content container-fluid">
      <br />
      <div class="row">
        <!-- 侧边栏 -->
        <div class="col-md-1"></div>
        <div class="col-md-1">
          <el-dropdown>
            <el-button type="primary">
              快速索引
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in $store.state.categories_lst" :key="item.id">
                <router-link @click.native="search_type(item.service_type)" to>{{item.service_type}}</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 内容 -->
        <div class="col-md-9" style="padding:0 60px 0 0">
          <!-- 表格 -->
          <router-view></router-view>
        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
    <!-- 底端栏 -->
    <div class="footer">
      <div class="row">
        <div class="col-md-6 text-right">
          <img src="./assets/images/index/bluetitle.jpg" style="padding-top:  1%;" />
        </div>
        <div class="col-md-6">
          <div class="text-left text-white" style="margin-top:20px">
            <p style="margin-bottom:-4px">
              <small>中华人民共和国长江海事局</small>
            </p>
            <p style="margin-bottom:-4px">
              <small>技术提供：武汉理工大学</small>
            </p>
            <p style="margin-bottom:-4px">
              <router-link to="/comment" target='_blank' style="color:white"><small>反馈意见</small></router-link>
              &nbsp;&nbsp;
              <a :href="$store.state.admin_url" style="color:white" target='_blank'>
                <small>后台管理</small>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      src:require('./assets/video/top_banner.gif')
    };
  },
  created() {},
  mounted() {},
  methods: {
    search_type(service_type) {
      this.$store.commit("getformdata", {
        title: "",
        content: "", //查询内容
        service_type: service_type, // 业务类型
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
};
</script>

<style scoped lang="scss">
@import "./assets/css/index.css";
.list-group-item {
  background-color: #e4fdfa4f;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
