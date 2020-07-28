<template>
  <div class="file-list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="类型">
        <template slot-scope="{ row }">
          <span>{{ getType(row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        width="180">
        <template slot-scope="{ row }">
          <a @click="handleClickRow(row)">{{ row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="fullpath"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="modify_time"
        label="修改日期"
        width="180">
      </el-table-column>
      
      <Prevue v-if="showFile" :file="showFile" />
    </el-table>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Prevue from '../components/Prevue.vue'
  import axios from 'axios';

  @Component({ components: { Prevue } })
  export default class FileList extends Vue {
    private tableData: IFileInfo[] = []

    private showFile: IFileInfo | null = null
    private currentPath!: string

    private getType(fileinfo: IFileInfo): string {
      if (fileinfo.is_dir) {
        return 'dir'
      }
      const arr = fileinfo.fullpath.split('.')
      return arr[arr.length - 1]
    }

    private async getList(filePath: string) {
      this.currentPath = filePath;
      const url = `http://0.0.0.0:8081/resources?path=${filePath}`
      let res = await axios.get(url)
      let data: IFileInfo[] = res.data
      data = data.filter(d => d.is_dir).concat(data.filter(d => !d.is_dir))

      data.unshift({
        fullpath: filePath + "/../",
        is_dir: true,
        modify_time: 0,
        name: "../",
        size: 0
      })
      this.tableData = data
    }

    private async handleClickRow(row: IFileInfo) {
      if (row.is_dir) {
        await this.getList(row.fullpath)
      } else {
        const fileType = this.getType(row)
        this.showFile = row;
      }
    }

    private created() {
      this.getList('/home/vm/code/')
    }
  }

  interface IFileInfo {
    fullpath: string
    is_dir: boolean
    modify_time: number
    name: string
    size: number
  }
</script>
