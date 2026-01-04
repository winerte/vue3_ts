export interface BaseResponse<T> {
    code:    number;
    message: string;
    data:    T;
    ok:      boolean;
}

export interface ListData {
    records: Record[];
    total:   number;
    size:    number;
    current: number;
    pages:   number;
}

export interface Record {
    createTime?: string;
    updateTime?: string;
    id?:         number;
    username:   string;
    roleName?:   string;
    password?:   string;
    name:       string;
    phone?:      string;
}

export interface userListData extends BaseResponse<ListData>{}