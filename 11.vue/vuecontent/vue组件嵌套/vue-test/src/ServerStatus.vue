<template>
  <div>
    <p>Server status:  {{status}}</p>
    <hr>
    <button @click="changeStatus">changeStatus</button>
  </div>
</template>

<script>
  export default {
    data:function () {
      return {
        status:"ccccc"
      }
    },
    methods:{
      changeStatus:function () {
        this.status = 'Normal'
      }

    }
  }
</script>

<style scoped>

</style>
