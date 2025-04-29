import {
  ref
} from 'vue'
export const useCountdown = (config: { sum?: number, step?: number, force?: string }) => {
  const configG = ref({ sum: 60, step: 1, force: '', ...config })
  const sum = ref(configG.value.sum)
  const state = ref('start')
  const timeRun = () => {
    state.value = 'ing'
    const time = configG.value.force ? parseInt(localStorage.getItem(configG.value.force) || `${new Date().getTime()}`) : new Date().getTime()
    if (configG.value.force) {
      localStorage.setItem(configG.value.force, time.toString())
    }
    const countdown = () => {
      const lastValue = configG.value.sum + ~~((-new Date().getTime() + time) / 1000)
      if (lastValue > 0) {
        sum.value = lastValue
        requestAnimationFrame(countdown);
      } else {
        state.value = 'end'
        sum.value = configG.value.sum
        if (configG.value.force) {
          localStorage.removeItem(configG.value.force)
        }
      }
    };
    requestAnimationFrame(countdown);
  }

  if (configG.value.force) {
    const time = localStorage.getItem(configG.value.force)
    if (time) {
      if (new Date().getTime() - parseInt(time) < 1000 * configG.value.sum) {
        timeRun()
      } else {
        state.value = 'start'
        localStorage.removeItem(configG.value.force)
      }
    }
  }
  return {
    sum,
    state,
    timeRun,
  }
}