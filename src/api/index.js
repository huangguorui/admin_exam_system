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
import qs from 'qs'

//excel导入
export const OneSubjectImport = query => {

    console.log('qs', qs)
    console.log('query', query)
    return request({
        url: '/link/add-list',
        method: 'post',
        data: qs.stringify(query)
    });
};
//qs.stringify(query)


/* OneSubjectImport  试题导入界面*/

//栏目列表
export const ColumnList = query => {
    return request({
        url: '/column/column-list',
        method: 'get',
        params: query
    });
};


/* OneSubjectImport  试题导入界面*/


/* column  栏目增删改查*/

//添加a and 修改栏目
export const ColumnSave = query => {
    return request({
        url: '/column/column-save',
        method: 'post',
        data: qs.stringify(query)

    });
};

export const ColumnDel = query => {
    return request({
        url: '/column/column-del',
        method: 'post',
        data: qs.stringify(query)

    });
};




/* column  栏目增删改查*/


// 试题列表


export const SubjectList = query => {
    return request({
        url: '/column/subject-status-list',
        method: 'get',
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
