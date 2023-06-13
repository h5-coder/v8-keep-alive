/*
 * @Author       : 梁燕翔 yanxiang.liang@genlot.com
 * @Date         : 2023-06-13 13:33:35
 * @LastEditors  : 梁燕翔 yanxiang.liang@genlot.com
 * @Description  : 删除元素
 */
export const remove = (arr, item) => {
  if (!Array.isArray(arr)) return arr;
  arr.splice(arr.indexOf(item), 1);
  return arr;
}

