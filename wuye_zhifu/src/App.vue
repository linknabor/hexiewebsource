<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
	#app{
		font-size: 0.26rem;
	}

  :root {
    --origin-color: #ff8a00;
    --primary-color: #ff8a00;
    --secondary-color: #d01120;

    --origin-icon-select: url("~@/assets/image/icon_select.png");
    --primary-icon-select: url("~@/assets/image/icon_select.png");
    --secondary-icon-select: url("~@/assets/image/icon_select_ngs.png");

    --origin-icon_selectted: url("~@/assets/image/icon_selectted.png");
    --primary-icon_selectted: url("~@/assets/image/icon_selectted.png");
    --secondary-icon_selectted: url("~@/assets/image/icon_selectted_ngs.png");
  }
</style>
