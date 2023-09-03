import { defineStore } from 'pinia'

export const userdataStore = defineStore(
    'userdata',
    () => {
        const profile = {}

        return { profile }
    },
    {
        // 小程序端配置
        persist: {
            storage: {
                getItem(key) { return uni.getStorageSync(key) },
                setItem(key, value) { uni.setStorageSync(key, value) }
            }
        }
    }
)