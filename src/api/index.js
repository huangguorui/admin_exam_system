import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '/user/user-list',
        method: 'get',
        params: query
    });
};
