/*
 * @Author       : 梁燕翔 yanxiang.liang@genlot.com
 * @Date         : 2023-06-12 18:17:59
 * @LastEditors  : 梁燕翔 yanxiang.liang@genlot.com
 * @Description  : 定制版keepalive
 */
import Vue from 'vue'
import { remove } from './remove'
import { EVENT_NAME } from './constant'

let cache = {}
let keys = []

function getComponentName(opts) {
  return this.$route.name
}

/**
 * @author       : LiangYanXiang
 * @description  :
 * @param         {*} name
 * @return        {*}
 */
export const removeCacheByName = (name) => {
  const cached = cache[name]
  cached && cached.componentInstance.$destroy() // 执行组件的destroy钩子函数
  cache[name] = null
  remove(keys, name)
}

export const emitEvent = data => {
  const evt = new CustomEvent(EVENT_NAME, { detail: data });
  document.dispatchEvent(evt);
};

/**
 * @author       : LiangYanXiang
 * @description  :
 * @param         {*} evt {detail:string/array}
 * @return        {*}
 */
const listener = (evt) => {
  const { detail } = evt
  if (!detail) return
  if (typeof detail === 'string') {
    removeCacheByName(detail)
  } else if (Array.isArray(detail) && detail.length) {
    detail.forEach(i => removeCacheByName(i))
  }
}

export default Object.assign({}, Vue.options.components.KeepAlive, {
  name: 'V8KeepAlive',
  created() {
    this.cache = cache
    this.keys = keys;
    document.addEventListener(EVENT_NAME, listener);
  },
  beforeDestroy() {
    document.removeEventListener(EVENT_NAME, listener)
  },
})
