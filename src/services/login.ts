import { http } from '@/utils/http'


 type LoginData = {
    code: string
    mobileCode?: string
    encryptedData?: string
    ivStr?: string
    uuid?: string
}


export type { LoginData }
/**
 * 微信小程序登录
 * @param data 入参
 * @returns 
 */
export const postLoginWxMini = (data: LoginData) => {
    return http<any>({
        method: "POST",
        url: "/api/front/login",
        data
    })
}

