// 统一返回数据格式
interface Result<T = any> {
    code: number
    msg: string
    data: T | null
}

// 成功
function success<T>(data: T, msg = 'success'): Result<T> {
    return {
        code: 200,
        msg,
        data
    }
}

// 失败
function fail<T = null>(msg: string, data?: T): Result<T> {
    return {
        code: 400,
        msg,
        data: data || null
    }
}

// 无权限
function unauth<T = null>(msg = 'unauthorized', data?: T): Result<T> {
    return {
        code: 401,
        msg,
        data: data || null
    }
}

// 未找到
function notfound<T = null>(msg = 'not found', data?: T): Result<T> {
    return {
        code: 404,
        msg,
        data: data || null
    }
}

// 服务器错误
function servererror<T = null>(msg = 'server error', data?: T): Result<T> {
    return {
        code: 500,
        msg,
        data: data || null
    }
}

export default{
    success,
    fail,
    unauth,
    notfound,
    servererror
}
export {}