export interface RequestInit {
    current: number,
  pages: number,
  records: Records,
  searchCount: true,
  size: number,
  total: number
}

export interface Records{

  createTime?:  string,
  id?: number,
  logoUrl: string,
  tmName: string,
  updateTime?: string
  
}

export interface RespData{
  code: number,
  message: string,
  ok:number
}

export interface RequestDataInit extends RespData{
    data: RequestInit
}