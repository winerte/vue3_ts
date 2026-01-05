export interface BaseResponse<T> {
    code:    number;
    message: string;
    data:    T;
    ok:      boolean;
}

export interface Menu {
    createTime: Date;
    updateTime: Date;
    id:         number;
    name:       string;
    pid:        number;
    code:       string;
    toCode:     string;
    type:       number;
    status:     string;
    level:      number;
    children:   Menu[] | null;
    select:     boolean;
}

export interface MenuListData  extends BaseResponse<Menu[]>{}