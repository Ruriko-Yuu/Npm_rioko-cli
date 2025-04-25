<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { getTest, postTest } from "./service/api/test";
getTest({})
postTest({})
</script>

<template>
	<HelloWorld msg="props msg" />
</template>

<style>
#app {
	/* empty */
}
</style>
