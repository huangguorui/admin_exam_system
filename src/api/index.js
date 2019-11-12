import request from '../utils/request';

//先放着
export const fetchData = query => {
    return request({
        url: '/user/user-list',
        method: 'get',
        params: query
    });
};

//用户列表
export const UserList = query => {
    return request({
        url: '/user/user-list',
        method: 'get',
        params: query
    });
};
//删除用户
export const UserDel = query => {
    return request({
        url: '/user/user-del',
        method: 'post',
        params: query
    });
};
//用户添加以及修改
export const UserSave = query => {
    return request({
        url: '/user/user-save',
        method: 'post',
        params: query
    });
};


/**
//  *  Api Get请求参数格式化
//  * @author Maybe
//  */
export const formatGetParm = (url, params) => {
    if (params) {
        url = url + '?' + param + '&'
        let propertys = Object.keys(params)
        propertys.forEach((key, index) => {
            if (index === propertys.length - 1) {
                url = url + key + '=' + params[key]
            } else {
                url = url + key + '=' + params[key] + '&'
            }
        })
    } else {
        url = url + '?' + param
    }
    return url
}
