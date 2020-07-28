<template>
  <div>
    <div v-if="isImage">
      <el-image :src="file.fullpath"></el-image>
    </div>
    <div v-else-if="isVideo">
      <video :src="file.fullpath" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div v-else>
      不支持阅览
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class Prevue extends Vue {
    @Prop()
    private file!: IFileInfo

    get fileType(): string {
      if (this.file.is_dir) {
        return 'dir'
      }
      const arr = this.file.fullpath.split('.')
      return arr[arr.length - 1]
    }

    get isImage() {
      return ['png', 'jpg', 'jpeg', 'bmp'].includes(this.fileType.toLowerCase())
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
