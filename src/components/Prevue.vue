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
      <pre><code>{{ getContext() }}</code></pre>
    </div>
    <div v-else>
      不支持阅览
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Prevue extends Vue {
    @Prop()
    private file!: IFileInfo

    get fileType(): string {
      if (this.file.isDir) {
        return 'dir'
      }
      const arr = this.file.fullpath.split('.')
      return arr[arr.length - 1]
    }

    get resourceSrc() {
      return `http://0.0.0.0:8081/resources?path=${this.file.fullpath}`
    }

    get isImage() {
      return ['png', 'jpg', 'jpeg', 'bmp', 'webp'].includes(this.fileType.toLowerCase())
    }
    get isVideo() {
      return ['mp4', 'm4v', 'mpeg4', 'avi'].includes(this.fileType.toLowerCase())
    }
    get isText() {
      return ['txt', 'go', 'py', 'js', 'ts'].includes(this.fileType.toLowerCase())
    }

    getContext() {

    }
  }
</script>
