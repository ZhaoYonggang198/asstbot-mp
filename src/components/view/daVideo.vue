<template>
  <view class="image-wrapper" v-if="url">
    <!--<view class="videoBox" v-if="showVideo" @click="hideVideo">-->
      <!--<video @click.stop="" @play="" :src="url" controls></video>-->
    <!--</view>-->
    <!--<button @click="previewVideo">预览视频</button>-->
    <button>视频</button>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        showVideo: false
      }
    },
    props: ['url'],
    methods: {
      previewVideo () {
        this.showVideo = true
      },
      hideVideo () {
        this.showVideo = false
      }
    }
  }
</script>

<style scoped>
  .image-wrapper{
    text-align: center;
    font-size: 0;
  }
  .videoBox{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    top: 0;
    left: 0;
    z-index: 501;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .image{
    display: inline-block;
    width:100%;
  }
</style>
