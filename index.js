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

export const emitEvent = data => new CustomEvent(EVENT_NAME, { detail: data });

const listener = (evt) => {
  console.log('removeCacheByNameEvent', evt);
  const { detail: { name } } = evt
  name && removeCacheByName(name)
}

export default Object.assign({}, Vue.options.components.KeepAlive, {
  name: 'V8KeepAlive',
  created() {
    this.cache = cache
    this.keys = keys;
    document.addEventListener(EVENT_NAME, listener);
  },
  destroyed() {
    document.removeEventListener(EVENT_NAME, listener)
  },
})

