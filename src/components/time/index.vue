<script setup lang="ts">
import { useTime } from "../../hooks/useTime";
import { useCountdown } from "../../hooks/useCountdown";
const { time } = useTime("hh:mm:ss");
const { sum, state, timeRun } = useCountdown({ force: "sendMsg" });
</script>

<template>
	<p>时间</p>
	<p>{{ time }}</p>
	<p>倒计时</p>
	<p>
		<button @click="timeRun">
			{{ state === "start" ? "发送" : state === "ing" ? sum + 's' : "重发" }}
		</button>
	</p>
</template>

<style scoped></style>
