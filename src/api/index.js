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

//关联试卷和栏目的关系，并且给试卷取名
export const Relation = query => {
    return request({
        url: '/column/relation',
        method: 'post',
        data: qs.stringify(query)
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

export const UserInfo = query => {
    return request({
        url: '/user/user-info',
        method: 'get',
        params: query
    });
};

/* userlist*/

// getUserInfo

/* userlist*/

// 试题列表


export const SubjectList = query => {
    return request({
        url: '/column/subject-status-list',
        method: 'get',
        params: query

    });
};

//postExamSave
//试卷名称修改
export const ExamSave = query => {
    return request({
        url: '/subject/exam-save',
        method: 'post',
        data: qs.stringify(query)

    });
};
//试卷删除
export const ExamDel = query => {
    return request({
        url: '/subject/exam-del',
        method: 'get',
        params: query

    });
};

// export const SubjectList = query => {
//     return request({
//         url: '/subject/subject-list',
//         method: 'get',
//         params: query

//     });
// };

export const ExamList = query => {
    return request({
        url: '/subject/exam-list',
        method: 'get',
        params: query

    });
};

//用户vip等级列表

export const UserVipList = query => {
    return request({
        url: '/user/user-vip-list',
        method: 'get',
        params: query

    });
};

export const UserVipSave = query => {
    return request({
        url: '/user/user-vip-save',
        method: 'post',
        data: qs.stringify(query)

    });
};

export const UserVipDel = query => {
    return request({
        url: '/user/user-vip-del',
        method: 'post',
        data: qs.stringify(query)

    });
};



/*

一级栏目列表展示

*/

//一级栏目列表
export const TopColumnList = query => {
    return request({
        url: '/topcolumn/column-list',
        method: 'get',
        params: query
    });
};


export const TopColumnSave = query => {
    return request({
        url: '/topcolumn/column-save',
        method: 'post',
        data: qs.stringify(query)

    });
};

export const TopColumnDel = query => {
    return request({
        url: '/topcolumn/column-del',
        method: 'post',
        data: qs.stringify(query)

    });
};

export const FeedbackList = query => {
    return request({
        url: '/feedback/list',
        method: 'get',
        params: query

    });
};




/*

一级栏目列表展示

*/








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