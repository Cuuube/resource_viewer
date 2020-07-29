<template>
  <div>
    <div v-if="isImage">
      <!-- <el-image :src="file.fullpath"></el-image> -->
      <img :src="resourceSrc" />
    </div>
    <div v-else-if="isVideo">
      <video :src="resourceSrc" controls="controls">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div v-else-if="isText">
      <pre><code>{{ fileData }}</code></pre>
    </div>
    <div v-else>
      不支持阅览
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { isImage, isVideo, isText  } from '../utils/FileUtil'

  import { getFileData, getResourceSrc } from '../service/FileService'

  @Component
  export default class Prevue extends Vue {
    @Prop()
    private file!: IFileInfo

    private fileData: string = ''

    get fileType(): string {
      if (this.file.isDir) {
        return 'dir'
      }
      const arr = this.file.fullpath.split('.')
      return arr[arr.length - 1]
    }

    get resourceSrc() {
      return getResourceSrc(this.file.fullpath)
    }

    get isImage() { return isImage(this.file) }
    get isVideo() { return isVideo(this.file) }
    get isText() { return isText(this.file) }

    async getContext() {
      this.fileData = await getFileData(this.file.fullpath)
    }

    @Watch('file')
    handleFileChanged(file: IFileInfo): void {
      console.log(this.isText)
      if (this.isText) {
        this.getContext()
      }
    }
  }
</script>
