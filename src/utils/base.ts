
// 定义一个函数，将传入的size参数转换为以b、kb、mb、gb、tb为单位的字符串
export const size2Xb = (size: number) => {
  // 计算size参数的缩放级别，取值范围为0-4
  const zoom = Math.min(~~(Math.log2(size) / 10), 4)
  // 将size参数除以1024的zoom次方，并保留两位小数，最后加上对应的单位
  return (size / 1024 ** zoom).toFixed(2) + ['b', 'kb', 'mb', 'gb', 'tb'][zoom]
}
