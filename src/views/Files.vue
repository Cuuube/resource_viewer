<template>
  <div class="file-list">
    <el-row>
      <el-col :span="4" class="container-left">
        <el-table :data="tableData" style="width: 100%" @row-click="handleClickRow">
          <el-table-column label="类型" width="50">
            <template slot-scope="{ row }">
              <!-- <span>{{ getType(row) }}</span> -->
              <i :class="getTypeIcon(row)" size="xl"></i>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="文件名" width="180">
            <template slot-scope="{ row }">
              <span>{{ row.name + (row.ext ? `.${row.ext}` : '')}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="fullpath"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="modifyTime"
            label="修改日期"
            width="180">
          </el-table-column>-->
          <el-table-column>
            <template slot-scope="{ row }">
              <button :class="{'dis':row.isDir,'downloadbtn':true}" @click="download(row)">下载</button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="20" class="container-right">
        <div>
          <Prevue v-if="showFile" :file="showFile" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Prevue from "../components/Prevue.vue";

import { getFileList, getResourceSrc } from "../service/FileService";
import { isImage, isVideo, isText } from "../utils/FileUtil";
@Component({
  components: { Prevue }
})
export default class Files extends Vue {
  private tableData: IFileInfo[] = [];
  private isshwo: boolean = true;
  private showFile: IFileInfo | null = null;
  private currentPath!: string;
  private resource: string;
  private getType(fileinfo: IFileInfo): string {
    if (fileinfo.isDir) {
      return "dir";
    }
    return fileinfo.ext || "";
  }

  private async getList(filePath: string) {
    const data: IFileInfo[] = await getFileList(filePath);

    data.unshift({
      fullpath: filePath + "/../",
      isDir: true,
      modifyTime: 0,
      name: "../",
      size: 0
    });
    this.tableData = data;

    this.currentPath = filePath;
    this.$router.push({
      path: "/files",
      query: { resource: this.currentPath }
    });
  }

  private async handleClickRow(row: IFileInfo) {
    if (row.isDir) {
      await this.getList(row.fullpath);
    } else {
      const fileType = this.getType(row);
      this.showFile = row;
    }
    console.log(this.showFile + "----");
  }

  private getTypeIcon(row: IFileInfo) {
    if (row.isDir) {
      return "el-icon-folder-opened";
    }
    if (isImage(row)) {
      return "el-icon-picture-outline";
    }
    if (isVideo(row)) {
      return "el-icon-film";
    }
    if (isText(row)) {
      return "el-icon-document";
    }
    return "el-icon-question";
  }

  private created() {
    this.resource = (this.$route.query["resource"] || "") + "";
    this.getList(this.resource || "/Users/zxod/Pictures");
  }
  download(e) {
    /* console.log(getResourceSrc(this.resource || '/Users/zxod/Pictures')); */
    if (e.isDir) {
      alert("文件夹不要下载");
      this.isshwo = false;
    } else {
      let downpath: string;
      /* console.log(e.fullpath); */

      downpath = e.fullpath.replace(/\.\./gim, "");
      downpath = "http://localhost:8081/resources?path=".concat(
        encodeURIComponent(downpath)
      );
      window.open(downpath);
    }
    /* window.open(getResourceSrc(this.resource || '/Users/zxod/Pictures')) */
  }
}
</script>

<style>
.el-table__row:first-of-type .downloadbtn {
  display: none;
}
.dis {
  display: none;
}
* {
  cursor: pointer;
}
.container-left,
.container-right {
  max-height: 100vh;
  overflow: auto;
}
.container-right > div {
  padding: 0 30px;
}
</style>
