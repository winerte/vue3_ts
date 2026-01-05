export interface BaseResponse<T> {
    code:    number;
    message: string;
    data:    T;
    ok:      boolean;
}

export interface RolePageData {
    records:     Role[];
    total:       number;
    size:        number;
    current:     number;
    pages:       number;
    searchCount: boolean;
}

export interface Role {
    createTime?: Date;
    updateTime?: Date;
    id:         number;
    roleName:   string;
    remark:     string;
}

export interface  RolePageList extends BaseResponse<RolePageData>{}