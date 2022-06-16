/**
 * 配置请求
 */
// 导入模块
import axios from 'axios';
import qs from 'qs';

var BASE_URL = "http://192.168.2.242:9090/";

// 超时时间（ms）
axios.defaults.timeout = 5000;

// 默认 axios 请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * 配置请求的参数处理、以及请求拦截
 */
axios.interceptors.request.use(function(config) {
    // 设置token
    config.headers['token'] = localStorage.getItem('token') || '';

    // 转换JSON
    config.paramsSerializer = function(params) {
        return qs.stringify(params, { indices: false });
    };

    return config;
}, function(error) {
    // 请求错误做的一些操作
    return Promise.reject(error);
});

/**
 * 配置请求的响应处理
 */
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // 判断登陆是否过期
            // if ("这里是判断token是否过期") {
            //     // 根据需求进行一些操作...

            //     return Promise.reject(response.data);
            // }

            // 一般来说后端会返回一个code 通过这个code做出相应的操作
            if (response.data.code === "200") {
                return Promise.resolve(response.data.body);
            } else {
                return Promise.reject(response.data.body);
            }
        } else {
            return Promise.reject(response.data.body);
        }
    },
    error => {
        return Promise.reject(error.data);
    }
);


function a1(apiUrl, params) {
    console.log(BASE_URL + apiUrl);
    console.log(params);
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(api, params) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + api + "?" + qs.stringify(params)).then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(api, params) {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + api, params).then(res => {
                resolve(res);
                console.log(res);
            })
            .catch(error => {
                reject(error)
                console.log(error);
            });
    });
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(api, params) {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + api, params).then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error)
            });
    });
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function _delete(api, params) {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + api + "?" + qs.stringify(params)).then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(error)
            });
    });
}

// 导出配置好的对象
export default {
    get,
    post,
    put,
    _delete,
    a1,
};