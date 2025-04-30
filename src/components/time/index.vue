<script setup lang="ts">
import { useTime } from "../../hooks/useTime";
import { useCountdown } from "../../hooks/useCountdown";
import { useImageExtra } from "../../hooks/useImageExtra";
const oImage =
	"https://cdn.doc-exam.com/old_academy/image/99619431971C4E3698BF1A594B66F4FD.jpg";
const { time } = useTime("HH:mm:ss");
const { sum, state, timeRun } = useCountdown({ force: "sendMsg" });
const { xImage, yImage, imageWidth, imageHeight } = useImageExtra(oImage);
</script>

<template>
	<p>时间</p>
	<p>{{ time }}</p>
	<p>倒计时</p>
	<p>
		<button @click="timeRun">
			{{ state === "start" ? "发送" : state === "ing" ? sum + "s" : "重发" }}
		</button>
	</p>
	<div style="width: 256px; height: 256px; position: relative">
		<img
			style="width: 100%; height: 100%"
			:src="imageWidth > imageHeight ? xImage : yImage"
			alt=""
		/>
		<img
			style="
				position: absolute;
				left: 0;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			"
			:style="`${imageWidth > imageHeight ? 'width: 100%' : 'height: 100%'}`"
			:src="oImage"
			alt=""
		/>
	</div>
</template>

<style scoped></style>
