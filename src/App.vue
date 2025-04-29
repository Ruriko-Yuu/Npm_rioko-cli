<script setup lang="ts">
import Time from "./components/time/index.vue";
import { getTest, postTest } from "./service/api/test";
getTest({});
postTest({});
</script>

<template>
	<Time />
</template>

<style>
#app {
	/* empty */
}
</style>
