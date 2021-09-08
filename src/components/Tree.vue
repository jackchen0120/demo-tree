<!--
  描述: el-tree目录树二次开发
  作者: Jack Chen @懒人码农
  日期: 2021-09-05
-->

<template>
  <div class="tree-container containter">
    <div class="tree-header">
      <div class="tree-btn">
        <el-button
          type="primary"
          size="small"
          plain
          :disabled="
            (isMultipleDownload && isDownloadFile) || isDownloadFileBtn
          "
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
      <div class="tree-nav">
        <div class="item">
          <el-checkbox
            v-model="isCheckedAll"
            :indeterminate="isIndeterminate"
            :disabled="treeData.length === 0"
            class="checkbox-style"
            @change="handleCheckAllChange"
          >
          </el-checkbox
          >名称
        </div>
        <div class="item">大小</div>
        <div class="item">修改时间</div>
        <div class="item">上传时间</div>
        <div class="item">加密级别</div>
        <div class="item">下载级别</div>
        <div class="item">操作</div>
      </div>
      <div v-loading="loading" class="tree-content">
        <el-tree
          ref="tree"
          :data="treeData"
          node-key="directoryId"
          :props="props"
          show-checkbox
          default-expand-all
          @check="handleCheckChange"
          @check-change="handleCurChange"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <template>
              <div v-if="data.directoryType === 1" class="node_div">
                <span class="name-box">
                  <el-tooltip effect="dark" placement="left">
                    <div slot="content">
                      {{ node.label }}
                    </div>
                    <i class="file-icon icon-folder"></i>
                  </el-tooltip>
                  {{ node.label }}
                </span>
              </div>
              <div v-if="data.directoryType === 2" class="node_div">
                <span class="name-box" :title="node.label">
                  <el-tooltip effect="dark" placement="left">
                    <div slot="content">
                      {{ node.label }}
                    </div>
                    <i :class="node.label | getIcon"></i>
                  </el-tooltip>
                  {{ node.label }}
                </span>
                <span class="size-box">
                  {{ data.size | renderSize }}
                </span>
                <span class="time-box">
                  {{ $DayTime(data.gmtUpdate).format("YYYY-MM-DD HH:mm") }}
                </span>
                <span class="upload-box">
                  {{ $DayTime(data.gmtUpload).format("YYYY-MM-DD HH:mm") }}
                </span>
                <span class="secret-box">
                  {{ data.secretType | secretType }}
                </span>
                <span class="download-box">
                  {{ data.downloadType | downloadStatus }}
                </span>
                <span class="operate-box">
                  <el-button
                    v-if="data.downloadType === 1 && data.directoryType === 2"
                    type="text"
                    size="small"
                    @click="() => handleDownload(data, 2)"
                    >下载</el-button
                  >
                  <el-button
                    v-if="data.directoryType === 2"
                    type="text"
                    size="small"
                    @click="() => handleShare(data, 2)"
                    >分享</el-button
                  >
                </span>
              </div>
            </template>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tree",
  data() {
    return {
      loading: false, // 页面预加载
      isCheckedAll: false, // 是否全选状态
      isIndeterminate: false, // 是否半选状态
      isMultipleDownload: true, // 批量下载按钮是否禁用
      isDownloadFile: true, // 选中的所有文件是否可下载
      isDownloadFileBtn: true, // 文件是否可下载
      isMultipleShare: true, // 批量分享按钮是否禁用
      newTreeArray: [], // 过滤新数组
      totalNum: 0, // 统计文件数
      selectTotalNum: 0, // 选中文件数
      props: { // 配置选项
        children: "children",
        label: "name",
        isLeaf: "leaf",
      },
      treeData: [ // 初始化目录树数据
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
  computed: {},
  mounted() {
    this.getTotalNum(this.treeData);
  },
  methods: {
    // 目录树是否全选
    async handleCheckAllChange(val) {
      console.log("是否全选===", val);
      let tree = this.treeData;
      this.isMultipleShare = !val;
      this.isIndeterminate = false;
      if (val) {
        // 全选
        this.isMultipleDownload = tree[0].downloadType === 0;
        this.isDownloadFileBtn = this.isMultipleDownload;
        this.$refs.tree.setCheckedNodes(tree);
      } else {
        // 取消全选
        this.$refs.tree.setCheckedNodes([]);
        this.isMultipleDownload = true;
        this.isDownloadFile = true;
      }
      this.selectTotalNum = 0;
      await this.getRecursion(tree);
      this.newTreeArray = await this.getFilterFile(tree);
      setTimeout(() => {
        console.log("旧数组===", tree);
        console.log("新数组===", this.newTreeArray, this.selectTotalNum);
      });
    },
    // 当复选框被点击的时候触发
    async handleCheckChange(data, node) {
      let tree = this.treeData;
      this.selectTotalNum = 0;
      await this.getRecursion(tree);
      this.isDownloadFileBtn = data.downloadType === 0 && data.isChecked;
      this.newTreeArray = await this.getFilterFile(tree);
      this.isCheckedAll = this.newTreeArray.length === tree.length;
      this.isIndeterminate =
        this.newTreeArray.length > 0 && this.newTreeArray.length < tree.length;
      if (node.checkedNodes.length > 0) {
        this.isMultipleShare = false;
        console.log('选中===', node.checkedNodes[0])
        this.isMultipleDownload = node.checkedNodes[0].downloadType === 0;
      } else {
        this.isCheckedAll = false;
        this.isIndeterminate = false;
        this.isMultipleDownload = true;
        this.isMultipleShare = true;
        this.isDownloadFile = true;
        this.newTreeArray = [];
      }
      setTimeout(() => {
        console.log("treeData===", tree);
        console.log(
          "新数组newTreeArray===",
          this.newTreeArray,
          this.selectTotalNum
        );
      }, 500);
    },
    // 节点选中状态发生变化时的回调
    handleCurChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
      let isChecked = checked;
      let arr = [];
      arr.push(data);
      this.getCheckedChild(arr, [], isChecked, indeterminate);
    },
    // 递归所有子集设置选中状态isChecked
    async getCheckedChild(data, arr, flag, isParent) {
      return data.map(async (item) => {
        if (flag) {
          item.isChecked = true;
        } else {
          item.isChecked = false;
        }
        if (isParent && item.directoryType === 1) {
          item.isChecked = true;
        }
        if (item.children) {
          await this.getCheckedChild(item.children, arr, flag, isParent);
        }
        return item;
      });
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
      this.$nextTick(async () => {
        tree.map(async (item) => {
          if (item.directoryType === 2 && item.isChecked) {
            this.selectTotalNum += 1;
          }
          if (item.children) {
            await this.getRecursion(item.children);
          }
        });
      });
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
    async getDownloadFile(tree, arrList = []) {
      for (let item of tree) {
        arrList.push(item.downloadType)
        if (item.children) {
          await this.getDownloadFile(item.children, arrList)
        }
      }
      return arrList
    },
    // 批量下载
    async handleDownload(row, type) {
      console.log('下载===', row)
      if (type === 1) {
        let downloadTypeArr = await this.getDownloadFile(this.newTreeArray);
        if (downloadTypeArr.includes(0)) {
          return this.$message.error('请选择所有可下载的文件')
        }
        this.$message.success(`已选中${this.selectTotalNum}个文件，下载成功`);
      } else {
        this.$message.success("单个目录或文件下载成功");
      }
    },
    // 批量分享
    handleShare(row, type) {
      console.log('分享===', row)
      if (type === 1) {
        this.$message.success(`已选中${this.selectTotalNum}个文件，分享成功`);
      } else {
        this.$message.success("单个目录或文件分享成功");
      }
    },
  },
};
</script>
<style scoped lang="less">
.tree-container {
  text-align: left;
  .header {
    display: flex;
  }
  .tree-box {
    position: relative;
    height: 100%;
    .tree-nav {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 12px 0;
      .item {
        font-size: 14px;
        color: #666;
        text-align: center;
        .checkbox-style {
          &.el-checkbox:last-of-type {
            margin-right: 12px;
            margin-left: 8px;
          }
        }
        &:nth-child(1) {
          flex: 1;
          text-align: left;
          padding-left: 16px;
        }
        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(6) {
          flex: 0 0 100px;
        }
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(7) {
          flex: 0 0 200px;
        }
      }
    }
    .tree-content {
      .custom-tree-node {
        width: 100%;
        font-size: 14px;
        .node_div {
          display: flex;
          align-items: center;
          span {
            text-align: center;
            &.name-box {
              flex: 1;
              text-align: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .size-box,
          .secret-box,
          .download-box {
            flex: 0 0 100px;
          }
          .time-box,
          .upload-box,
          .operate-box {
            flex: 0 0 200px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-tree-node__content {
  padding: 8px 0;
}
.el-button--small {
  font-size: 14px;
}
</style>