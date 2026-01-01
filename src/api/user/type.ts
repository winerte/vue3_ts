export interface loginFrom{
    username: string,
    password: string
}

export interface RespData{
    code: number,
    message: string,
    ok:number
}


export interface logingResp extends RespData{
    data: string
}


interface user{
    userId:number,
    avatar: string,
    name: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string

}

export interface userInfoResp extends RespData{
    data: user
}