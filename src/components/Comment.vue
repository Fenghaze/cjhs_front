<template>
  <div>
    <div class="content">
      <div class="row" style="margin-top:20px">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <el-tabs type="border-card">
            <el-tab-pane label="意见反馈">
              <div class="panel panel-default">
                <div class="panel-body">
                  <!-- 标题 -->
                  <div class="search_title">
                    <h1 style="margin-top: 15px;">意见反馈</h1>
                  </div>
                  <!-- 表单 -->
                  <div class="search_menu">
                    <el-form
                      :label-position="labelPosition"
                      label-width="80px"
                      :model="form"
                      :rules="rules"
                      ref="form"
                    >
                      <el-form-item label="反馈类型" prop="type">
                        <el-select v-model="form.type" style="width:100%">
                          <el-option v-for="item in form.select" :key="item" :value="item">{{item}}</el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="反馈内容" prop="content">
                        <el-input
                          type="textarea"
                          v-model="form.content"
                          placeholder="请输入您的意见，我们将不断改进！"
                          maxlength="200"
                          show-word-limit
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="上传图片">
                        <el-button @click="onPickFile" style="width:100%">
                          {{form.img_name}}
                          <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                        <input
                          type="file"
                          ref="fileInput"
                          accept="image/*"
                          @change="getFile"
                          style="display: none"
                        />
                      </el-form-item>
                      <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <el-input v-model="form.tel"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submit('form')" style="width:100%">提交反馈</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="反馈列表">
              <!-- 标题 -->
              <div class="search_title">
                <h1 style="margin-top: 15px;">反馈列表</h1>
              </div>
              <div
                style="border-left:8px solid #86bbdb;box-sizing: border-box;height: auto;overflow:auto;"
              >
                <div id="ajaxcontent">
                  <table border="0" cellspacing="0" cellpadding="0" width="100%">
                    <tbody v-for="(item, index) in comments_lst" :key="index">
                      <tr>
                        <td
                          style="BORDER-BOTTOM: #86bbdb 1px solid"
                          bgcolor="#ecf7f9"
                          height="22"
                          valign="center"
                          width="20%"
                          align="middle"
                        >
                          <span
                            style="COLOR: #003399; FONT-SIZE: 12px; FONT-WEIGHT: bold"
                          >用户【{{item.name}}】：</span>
                        </td>
                        <td
                          style="BORDER-BOTTOM: #86bbdb 1px solid; WORD-WRAP: break-word; TABLE-LAYOUT: fixed; WORD-BREAK: break-all"
                          class="hui2"
                          bgcolor="#ecf7f9"
                          valign="center"
                          width="80%"
                          align="left"
                        >
                          {{item.feed}}
                          <span style="float: right">
                            <small>[{{item.pull_time_s}}]</small>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td height="8" colspan="2"></td>
                      </tr>
                      <tr>
                        <td valign="center" align="middle">
                          <span style="COLOR: #ff0000; FONT-SIZE: 12px">管理员回复：</span>
                        </td>
                        <td
                          style="WORD-WRAP: break-word; TABLE-LAYOUT: fixed; WORD-BREAK: break-all"
                          class="article"
                          valign="top"
                          align="left"
                        >
                          {{item.advice}}
                          <span style="float: right">
                            <small>[{{item.feed_time_s}}]</small>
                          </span>
                        </td>
                      </tr>
                      <td height="15">&nbsp;</td>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- 分页 -->
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                small
                layout="total,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 底端栏 -->
    <div class="footer">
      <div class="row">
        <div class="col-md-6 text-right">
          <img src="../assets/images/index/bluetitle.jpg" style="padding-top:  1%;" />
        </div>
        <div class="col-md-6">
          <div class="text-left text-white" style="margin-top:25px">
            <p style="margin-bottom:-4px">
              <small>中华人民共和国长江海事局</small>
            </p>
            <p style="margin-bottom:-4px">
              <small>技术提供：武汉理工大学</small>
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
      state: 1,
      comments_lst: [],
      currentPage: 1,
      total: 0,
      form: {
        img: "", // 上传的图片
        img_name: "选择图片", // 图片名
        type: "", // 反馈类型
        select: ["文件增加", "文件修改", "功能反馈"], // 反馈类型选项
        name: "", // 姓名
        tel: "", // 联系方式
        content: "", // 反馈内容
      },

      labelPosition: "top",
      rules: {
        content: [
          { required: true, message: "请填写反馈意见！", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择反馈类型！", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getcomments();
  },
  mounted() {},
  methods: {
    /* 上传图片 */
    onPickFile() {
      this.$refs.fileInput.click();
    },
    /* 获取图片 */
    getFile(event) {
      this.form.img = event.target.files[0]; // 获取图片对象，0表示只有一个文件
      this.form.img_name = event.target.files[0].name; // 获取图片名
    },
    /* 提交表单 */
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var that = this;
          let formdata = new FormData();
          if (this.form.img != "") {
            formdata.append("img", this.form.img);
          }
          formdata.append("name", this.form.name);
          formdata.append("phone", this.form.tel);
          formdata.append("type", this.form.type);
          formdata.append("advice", this.form.content);

          let config = {
            headers: {
              "Content-Type": "multipart/form-data", //以表单传数据的格式来传递 fromdata
            },
          };
          this.axios
            .post("/feedback/add", formdata, config)
            .then(function (response) {
              if (response.status == 200) {
                that.$message({
                  type: "success",
                  message: "已反馈！等待管理员审核",
                });
              }
            })
            .catch(function (error) {
              alert(error);
            });
        } else {
          return false;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getcomments();
    },
    /* 获取评论 */
    getcomments() {
      // 获取所有评论
      var that = this;
      let formdata = new FormData();
      formdata.append("state", this.state);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data", //之前说的以表单传数据的格式来传递fromdata
        },
      };
      this.axios
        .post("/feedback/query?page=" + this.currentPage, formdata, config)
        .then(function (response) {
          that.comments_lst = response.data.feedbacks;
          that.total = response.data.all_count;
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/index.css";

/deep/ .el-form--label-top .el-form-item__label {
  float: left;
}
</style>
