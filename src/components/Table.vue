<!--
  描述: el-table目录树二次开发
  作者: Jack Chen @懒人码农
  日期: 2021-09-05
-->

<template>
  <div class="table-container containter">
    <div class="tree-header">
      <div class="tree-btn">
        <el-button
          type="primary"
          size="small"
          plain
          :disabled="multiple"
          @click="handleDownload(null, 1)"
        >
          批量下载</el-button
        >
        <el-button
          type="primary"
          size="small"
          plain
          :disabled="multiple"
          @click="handleShare(null, 1)"
          >批量分享</el-button
        >
      </div>
      <div class="total-num">共 {{ totalNum }} 个文件</div>
    </div>
    <div class="tree-box">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        class="w100"
        row-key="directoryId"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @select="selectRow"
        @select-all="selectAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="selectable"
          width="45"
          align="center"
          label="全选"
        ></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip effect="dark" placement="left">
              <div slot="content">
                {{ scope.row.name }}
              </div>
              <i
                v-if="scope.row.directoryType === 1"
                class="file-icon icon-folder"
              ></i>
              <i v-else :class="scope.row.name | getIcon"></i>
            </el-tooltip>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="大小"
          align="center"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope" v-if="scope.row.directoryType === 2">
            <span> {{ scope.row.size | renderSize }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtUpdate"
          label="修改时间"
          align="center"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope" v-if="scope.row.directoryType === 2">
            <span>{{
              scope.row.gmtUpdate
                ? $DayTime(scope.row.gmtUpdate).format("YYYY-MM-DD HH:mm")
                : null
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmtUpload"
          label="上传时间"
          align="center"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope" v-if="scope.row.directoryType === 2">
            <span>{{
              $DayTime(scope.row.gmtUpload).format("YYYY-MM-DD HH:mm")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="secretType"
          label="加密级别"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.secretType | secretType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="downloadType"
          label="下载级别"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.downloadType | downloadStatus }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="
                scope.row.downloadType === 1 && scope.row.directoryType === 2
              "
              type="text"
              size="small"
              @click="() => handleDownload(scope.row, 2)"
              >下载</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="() => handleShare(scope.row, 2)"
              >分享</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      loading: false, // 页面预加载
      totalNum: 0, // 统计文件总数
      selectTotalNum: 0, // 选中文件数
      ids: [], // 选中数组
      single: true, // 非单个禁用
      multiple: true, // 非多个禁用
      isAllSelect: false, // 是否全选
      downloadTypeArr: [],
      tableData: [
        // 初始化目录树数据
        {
          directoryId: 1,
          directoryType: 2, // 1:目录 2:文件
          downloadType: 1,
          secretType: 0,
          size: 12367,
          name: "前端大厂面试宝典.pdf",
          gmtUpdate: 1630825270483,
          gmtUpload: 1630825248029,
          children: [],
        },
        {
          directoryId: 2,
          directoryType: 2,
          downloadType: 1,
          secretType: 1,
          size: 5236700,
          name: "前端高级工程师内功秘籍.docx",
          gmtUpdate: 1630825270483,
          gmtUpload: 1630825248029,
          children: [],
        },
        {
          directoryId: 3,
          directoryType: 2,
          downloadType: 0,
          secretType: 1,
          size: 2267,
          name: "前端学习路线图.png",
          gmtUpdate: 1630834889072,
          gmtUpload: 1630825248029,
          children: [],
        },
        {
          directoryId: 4,
          directoryType: 1,
          downloadType: 1,
          secretType: 0,
          name: "前端开源项目汇总",
          gmtUpdate: 1630825270483,
          gmtUpload: 1630825248029,
          children: [
            {
              directoryId: 41,
              directoryType: 2,
              downloadType: 1,
              secretType: 0,
              size: 13200,
              name: "小程序个性简历源码.zip",
              gmtUpdate: 1630825270483,
              gmtUpload: 1630825248029,
              children: [],
            },
            {
              directoryId: 42,
              directoryType: 1,
              downloadType: 1,
              secretType: 0,
              name: "电商网站项目",
              gmtUpdate: 1630825270483,
              gmtUpload: 1630825248029,
              children: [
                {
                  directoryId: 421,
                  directoryType: 2,
                  downloadType: 1,
                  secretType: 0,
                  size: 132008,
                  name: "饿了么H5移动端源码.zip",
                  gmtUpdate: 1630825270483,
                  gmtUpload: 1630825248029,
                  children: [],
                },
              ],
            },
          ],
        },
        {
          directoryId: 5,
          directoryType: 1,
          downloadType: 0,
          secretType: 1,
          name: "前端工程化知识体系",
          gmtUpdate: 1630834889072,
          gmtUpload: 1630834889072,
          children: [
            {
              directoryId: 51,
              directoryType: 2,
              downloadType: 0,
              secretType: 1,
              size: 13200,
              name: "CI/CD项目部署.doc",
              gmtUpdate: 1630834889072,
              gmtUpload: 1630834889072,
              children: [],
            },
            {
              directoryId: 52,
              directoryType: 2,
              downloadType: 0,
              secretType: 1,
              size: 335200,
              name: "前端开发规范秘籍.xlsx",
              gmtUpdate: 1630834889072,
              gmtUpload: 1630834889072,
              children: [],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getTotalNum(this.tableData);
  },
  methods: {
    // 全选/取消选操作
    async selectAll() {
      console.log("全选==", this.tableData);
      this.selectTotalNum = 0;
      await this.getRecursion(this.tableData);
      let data = this.tableData;
      this.isAllSelect = !this.isAllSelect;
      this.toggleSelect(data, this.isAllSelect, "all");
    },
    // 选择某行
    async selectRow(selection, row) {
      console.log("选择某行===", row);
      this.selectTotalNum = 0;
      await this.getRecursion(this.tableData);
      this.$set(row, "isChecked", !row.isChecked);
      this.$nextTick(() => {
        this.isAllSelect = row.isChecked;
        this.toggleSelect(selection, row.isChecked, "tr");
        this.toggleSelect(row, row.isChecked, "tr");
      });
    },
    // 改变选中
    toggleSelection(row, flag) {
      this.$set(row, "isChecked", flag);
      this.$nextTick(() => {
        if (flag) {
          this.$refs.table.toggleRowSelection(row, flag);
        } else {
          this.$refs.table.clearSelection();
        }
      });
    },
    // 递归子级
    toggleSelect(data, flag, type) {
      if (type === "all") {
        if (data.length > 0) {
          data.forEach((item) => {
            this.toggleSelection(item, flag);
            if (item.children && item.children.length > 0) {
              this.toggleSelect(item.children, flag, type);
            }
          });
        }
      } else {
        if (data.children && data.children.length > 0) {
          data.children.forEach((item) => {
            item.isChecked = !item.isChecked;
            this.$refs.table.toggleRowSelection(item, flag);
            this.toggleSelect(item, flag, type);
          });
        }
      }
    },
    // 统计列表总文件数（也可以直接后端返回总文件个数）
    getTotalNum(tree) {
      for (let item of tree) {
        if (item.directoryType === 2) {
          this.totalNum += 1;
        }
        if (item.children) {
          this.getTotalNum(item.children);
        }
      }
    },
    // 统计选中所有文件数
    async getRecursion(tree) {
      for (let item of tree) {
        if (item.directoryType === 2 && item.isChecked) {
          this.selectTotalNum += 1
        }
        if (item.children) {
          await this.getRecursion(item.children);
        }
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.directoryId);
      this.downloadTypeArr = selection.map((item) => item.downloadType);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 批量下载
    async handleDownload(row, type) {
      console.log('下载===', row)
      if (type === 1) {
        console.log(this.selectTotalNum);
        if (this.downloadTypeArr.includes(0)) {
          return this.$message.error('请选择所有可下载的文件')
        }
        this.$message.success(`已选中${this.selectTotalNum}个文件，下载成功`);
      } else {
        if (row.directoryType === 1) {
          this.$message.success("目录下载成功");
        } else {
          this.$message.success("文件下载成功");
        }
      }
    },
    // 批量分享
    handleShare(row, type) {
      console.log('分享===', row)
      if (type === 1) {
        this.$message.success(`已选中${this.selectTotalNum}个文件，分享成功`);
      } else {
        if (row.directoryType === 1) {
          this.$message.success("目录分享成功");
        } else {
          this.$message.success("文件分享成功");
        }
      }
    },
  },
};
</script>

<style lang="less">
.el-table thead {
  color: #666;
}
.el-table td {
  border-bottom: none;
  padding: 4px 0;
}
.el-table th {
  padding: 10px 0;
}
.el-icon-arrow-right:before {
  content: '\e791';
}
.el-table__expand-icon {
  color: #C0C4CC;
}
.el-table::before {
  height: 0;
}
.el-table--border::after,
.el-table--group::after {
  width: 0;
}
// .el-table td.el-table__cell {
//   border-bottom: none;
// }
// .el-table--border,
// .el-table--group {
//   border: none;
// }
// .el-table--border .el-table__cell,
// .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
//   border-right: none;
// }
</style>
