import {
  ref
} from 'vue'
import dayjs from 'dayjs'
// 导出一个名为useTime的函数，用于获取当前时间
export const useTime = (format?: string) => {
  // 使用ref函数创建一个响应式变量time，初始值为format参数指定的格式化时间，如果没有指定format参数，则初始值为当前时间
  const time = ref(format ? dayjs().format(format) : dayjs())
  // 定义一个名为timeRun的函数，用于更新time的值
  const timeRun = () => {
    // 如果指定了format参数，则将time的值更新为当前时间的格式化时间，否则更新为当前时间
    time.value = format ? dayjs().format(format) : dayjs()
    // 使用requestAnimationFrame函数递归调用timeRun函数，实现时间的实时更新
    requestAnimationFrame(timeRun);
  };
  // 使用requestAnimationFrame函数调用timeRun函数，实现时间的实时更新
  requestAnimationFrame(timeRun);
  // 返回一个包含time的响应式对象
  return {
    time
  }
}