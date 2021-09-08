
<template>
  <div class="vxe-container containter">
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
      <vxe-table
        resizable
        highlight-hover-row
        :tree-config="{ children: 'children', expandAll: true }"
        :data="tableData"
        :checkbox-config="{ labelField: 'name', highlight: true }"
        @checkbox-all="selectAll"
        @checkbox-change="selectChangeEvent"
      >
        <vxe-column
          type="checkbox"
          title="名称"
          min-width="280"
          tree-node
        >
          <template v-slot="{ row }">
            <el-tooltip effect="dark" placement="left">
              <div slot="content">
                {{ row.name }}
              </div>
              <i
                v-if="row.directoryType === 1"
                class="file-icon icon-folder"
              ></i>
              <i v-else :class="row.name | getIcon"></i>
            </el-tooltip>
            {{ row.name }}
          </template>
        </vxe-column>
        <vxe-column field="size" title="大小" align="center">
          <template v-slot="{ row }">
            <template v-if="row.directoryType === 2">
              {{ row.size | renderSize }}
            </template>
          </template>
        </vxe-column>
        <vxe-column field="gmtUpdate" title="修改时间" align="center">
          <template v-slot="{ row }">
            <template v-if="row.directoryType === 2">
              {{
                row.gmtUpdate
                  ? $DayTime(row.gmtUpdate).format("YYYY-MM-DD HH:mm")
                  : null
              }}
            </template>
          </template>
        </vxe-column>
        <vxe-column field="gmtUpload" title="上传时间" align="center">
          <template v-slot="{ row }">
            <template v-if="row.directoryType === 2">
              {{
                row.gmtUpload
                  ? $DayTime(row.gmtUpload).format("YYYY-MM-DD HH:mm")
                  : null
              }}
            </template>
          </template>
        </vxe-column>
        <vxe-column field="secretType" title="加密级别" align="center">
          <template v-slot="{ row }">
            <template v-if="row.directoryType === 2">
              {{ row.secretType | secretType }}
            </template>
          </template>
        </vxe-column>
        <vxe-column field="downloadType" title="下载级别" align="center">
          <template v-slot="{ row }">
            <template v-if="row.directoryType === 2">
              {{ row.downloadType | downloadStatus }}
            </template>
          </template>
        </vxe-column>
        <vxe-column title="操作" align="center">
          <template v-slot="{ row }">
            <el-button
              v-if="row.downloadType === 1 && row.directoryType === 2"
              type="text"
              size="small"
              @click="() => handleDownload(row, 2)"
              >下载</el-button
            >
            <el-button
              v-if="row.directoryType === 2"
              type="text"
              size="small"
              @click="() => handleShare(row, 2)"
              >分享</el-button
            >
          </template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      multiple: true,
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
  methods: {
    selectAll({ records }) {
      console.log('全选===', records)
    },
    selectChangeEvent({ records }) {
      console.info(`勾选${records.length}个树形节点`, records);
    },
    // 批量下载
    async handleDownload(row, type) {
      console.log("下载===", row);
      if (type === 1) {
        console.log(this.selectTotalNum);
        if (this.downloadTypeArr.includes(0)) {
          return this.$message.error("请选择所有可下载的文件");
        }
        this.$message.success(`已选中${this.selectTotalNum}个文件，下载成功`);
      } else {
        this.$message.success("单个目录或文件下载成功");
      }
    },
    // 批量分享
    handleShare(row, type) {
      console.log("分享===", row);
      if (type === 1) {
        this.$message.success(`已选中${this.selectTotalNum}个文件，分享成功`);
      } else {
        this.$message.success("单个目录或文件分享成功");
      }
    },
  },
};
</script>
 
<style lang="less">
.vxe-container {
  .vxe-table--render-default .vxe-table--border-line {
    border: none;
  }
  .vxe-table--render-default.border--default .vxe-table--header-wrapper,
  .vxe-table--render-default.border--full .vxe-table--header-wrapper,
  .vxe-table--render-default.border--outer .vxe-table--header-wrapper {
    background-color: transparent;
  }
  .vxe-table--render-default.border--default .vxe-body--column,
  .vxe-table--render-default.border--default .vxe-footer--column,
  .vxe-table--render-default.border--default .vxe-header--column,
  .vxe-table--render-default.border--inner .vxe-body--column,
  .vxe-table--render-default.border--inner .vxe-footer--column,
  .vxe-table--render-default.border--inner .vxe-header--column {
    background-image: none;
  }
  .vxe-table--render-default .vxe-body--x-space {
    height: 0;
  }
  .vxe-table--render-default .vxe-header--column:not(.col--ellipsis) {
    padding: 10px 0;
  }
  .vxe-table--render-default .vxe-body--column:not(.col--ellipsis), 
  .vxe-table--render-default .vxe-footer--column:not(.col--ellipsis) {
    padding: 4px 0;
  }
}
</style>