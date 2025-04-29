<script setup lang="ts">
import { useTime } from "../../hooks/useTime";
import { useCountdown } from "../../hooks/useCountdown";
const { time } = useTime("hh:mm:ss");
const { sum, timeRun } = useCountdown({force: 'sendMsg'});
</script>

<template>
	<p>时间</p>
	<p>{{ time }}</p>
	<p>倒计时</p>
	<p>
		{{ sum }}
		<button @click="timeRun">start</button>
	</p>
</template>

<style scoped></style>
