<template>
  <menu>
    menu
  </menu>
  <div class="main">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {},
})
export default class menu extends Vue {
  msg!: string;
}
</script>

