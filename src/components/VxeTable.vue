
<template>
  <div class="vxe-container containter">
    <div class="tree-header">
      <div class="tree-btn">
        <el-button
          type="primary"
          size="small"
          plain
          :disabled="(isMultipleDownload && isDownloadFile) || isDownloadFileBtn"
          @click="handleDownload(null, 1)"
        >
          批量下载</el-button
        >
        <el-button
          type="primary"
          size="small"
          plain
          :disabled="isMultipleShare"
          @click="handleShare(null, 1)"
          >批量分享</el-button
        >
      </div>
      <div class="total-num">共 {{ totalNum }} 个文件</div>
    </div>
    <div class="tree-box">
      <vxe-table
        ref="tree"
        highlight-hover-row
        :tree-config="{ children: 'children', expandAll: true }"
        :data="tableData"
        :checkbox-config="{ labelField: 'name' }"
        @checkbox-all="selectAll"
        @checkbox-change="selectTr"
      >
        <vxe-column type="checkbox" title="名称" min-width="280" tree-node>
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
      loading: false, // 页面预加载
      isCheckedAll: false, // 是否全选状态
      isMultipleDownload: true, // 批量下载按钮是否禁用
      isDownloadFile: true, // 选中的所有文件是否可下载
      isDownloadFileBtn: true, // 文件是否可下载
      isMultipleShare: true, // 批量分享按钮是否禁用
      newTreeArray: [], // 过滤新数组
      totalNum: 0, // 统计文件数
      selectTotalNum: 0, // 选中文件数
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
              pid: 4,
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
              pid: 4,
              directoryId: 42,
              directoryType: 1,
              downloadType: 1,
              secretType: 0,
              name: "电商网站项目",
              gmtUpdate: 1630825270483,
              gmtUpload: 1630825248029,
              children: [
                {
                  pid: 42,
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
              pid: 5,
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
              pid: 5,
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
  async mounted() {
    await this.getTotalNum(this.tableData);
  },
  methods: {
    async selectAll({ records, indeterminates, checked }) {
      // console.log("全选===", records, indeterminates, checked);
      let tree = this.tableData;
      console.log("全选==", tree, records, indeterminates);
      this.isMultipleShare = !checked;
      if (checked) {
        // 全选
        this.isMultipleDownload = tree[0].downloadType === 0;
        this.isDownloadFileBtn = this.isMultipleDownload;
      } else {
        // 取消全选
        this.isMultipleDownload = true;
        this.isDownloadFile = true;
      }
      await this.selectCheckedAll(tree, checked)
      this.selectTotalNum = 0;
      await this.getRecursion(tree);
      this.newTreeArray = await this.getFilterFile(tree);
      setTimeout(() => {
        console.log("旧数组===", tree);
        console.log("新数组===", this.newTreeArray, this.selectTotalNum);
      });
    },
    // 递归是否全选反选
    async selectCheckedAll(tree, checked) {
      for (let item of tree) {
        item.isChecked = checked;
        if (item.children) {
          await this.selectCheckedAll(item.children, checked);
        }
      }
    },
    // 单个勾选并且值发生变化时触发的事件
    async selectTr({ records, indeterminates, checked, row }) {
      let tree = this.tableData;
      let arr = records.concat(indeterminates);
      console.log(arr, checked, row)
      if (arr && arr.length) {
        this.isMultipleShare = false;
        // this.isMultipleDownload = records[0].downloadType === 0;
      } else {
        this.isMultipleDownload = true;
        this.isMultipleShare = true;
        this.isDownloadFile = true;
        this.newTreeArray = [];
      }
      let isChecked = checked;
      let arr2 = [];
      arr2.push(row);
      await this.getCheckedChild(arr2, isChecked);
      console.log('tree===', row.downloadType, row.isChecked)
      await this.findParent(row, tree, checked)
      this.isDownloadFileBtn = row.downloadType === 0 && row.isChecked;
      this.newTreeArray = await this.getFilterFile(tree);
      this.selectTotalNum = 0;
      await this.getRecursion(tree);
      
      setTimeout(() => {
        console.log("treeData===", tree);
        console.log(
          "新数组newTreeArray===",
          this.newTreeArray,
          this.selectTotalNum
        );
      }, 500);
    },
    // 递归所有子集设置选中状态isChecked
    async getCheckedChild(data, flag) {
      return data.map(async (item) => {
        // item = Object.assign({}, item);
        if (flag) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
        if (item.children) {
          await this.getCheckedChild(item.children, flag);
        }
        return item;
      });
    },
    async findParent(childNode, treeData) {
      for (let i = 0; i < treeData.length; i++) {
        // 父节点查询条件
        if (treeData[i].directoryId === childNode.pid) {
          console.log(treeData[i].children)
          if (treeData[i].children.length) {
            treeData[i].children.map(v => {
              if (!v.isChecked) {
                treeData[i].isChecked = childNode.isChecked
              }
            })
          } else {
            treeData[i].isChecked = childNode.isChecked
          }
          // 如果找到结果,保存当前节点
          // 用当前节点再去原数据查找当前节点的父节点
          await this.findParent(treeData[i], this.tableData);
          // break;
        } else {
          if (treeData[i].children) {
            // 没找到，遍历该节点的子节点
            await this.findParent(childNode, treeData[i].children);
          }
        }
      }
    },
    // 递归过滤保留被选中的目录树数组
    getFilterFile(tree) {
      return tree
        .filter((item) => item.isChecked === true)
        .map((item) => {
          item = Object.assign({}, item);
          if (item.children) {
            item.children = this.getFilterFile(item.children);
          }
          return item;
        });
    },
    // 统计选中所有文件数
    async getRecursion(tree) {
      this.$nextTick(async () => {
        return tree.map(async (item) => {
          if (item.directoryType === 2 && item.isChecked) {
            this.selectTotalNum += 1;
          }
          if (item.children) {
            await this.getRecursion(item.children);
          }
        });
      });
    },
    async getDownloadFile(tree, arrList = []) {
      for (let item of tree) {
        if (item.isChecked) {
          arrList.push(item.downloadType);
        }
        if (item.children) {
          await this.getDownloadFile(item.children, arrList);
        }
      }
      return arrList;
    },
    // 批量下载
    async handleDownload(row, type) {
      console.log("下载===", this.newTreeArray);
      if (type === 1) {
        let downloadTypeArr = await this.getDownloadFile(this.newTreeArray);
        console.log(this.selectTotalNum, downloadTypeArr, this.newTreeArray);
        if (downloadTypeArr.includes(0)) {
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
    // 统计列表总文件数（也可以直接后端返回总文件个数）
    async getTotalNum(tree) {
      for (let item of tree) {
        if (item.directoryType === 2) {
          this.totalNum += 1;
        }
        if (item.children) {
          await this.getTotalNum(item.children);
        }
      }
    },
  },
};
</script>
 
<style lang="less">
.vxe-container {
  .vxe-header--row {
    .vxe-header--column {
      &:nth-child(1) {
        padding-left: 21px !important;
      }
    }
  }
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