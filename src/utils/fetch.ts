let prefix=''
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const contentType = {
  json: 'application/json; charset=UTF-8',
  form: 'application/x-www-form-urlencoded; charset=UTF-8',
  formData:'multipart/form-data'
}

// 检测状态
const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const errorText = codeMessage[res.status] || res.statusText;
  const error = new Error(errorText);
  error.status = res.status;
  error.data = res;
  throw error;
};
  
const parseResponse = async (res) => {
  const contentType = res?.headers?.get?.('Content-Type')
  // 判定返回的内容类型，做不同的处理
  if (contentType) {
    if (contentType.indexOf('json') > -1) {
      return await res?.json?.()
    }
    if (contentType.indexOf('text') > -1) {
      return await res?.text?.()
    }
    if (contentType.indexOf('form') > -1) {
      return await res?.formData?.()
    }
    if (contentType.indexOf('video') > -1) {
      return await res?.blob?.()
    }
  }

  return await res?.text?.()
}

const processResponse = async (res) => {
  let _response = checkStatus(res); 
  _response = await parseResponse(_response);

  return _response;
}

export const request = async(url:string,options?:any)=>{
    if(!url) throw new Error('need base api');

    const { headers, method = 'GET', body, ...rest } = options || {}
    let setHeaders={}
    // headers 设置
    if(body instanceof FormData){
      setHeaders = new Headers({
        ...headers
      });
    }else{
      setHeaders = new Headers({
        // 这个要和后端约定
        Accept: 'application/json',
        'Content-Type': contentType.json,
        ...headers
      });
    }    

    const setOptions = { ...rest, method, headers: method === 'GET' ? headers : setHeaders };

    let promise;
    if(method === 'GET'|| method === 'DELETE') {
        let urls = new URL(window.location.origin+prefix+url);
        urls.search = new URLSearchParams(body).toString();
        promise = await fetch(urls, setOptions);
    }else {
        promise = await fetch(prefix+url, {
        ...setOptions,
        body: body instanceof FormData?body:JSON.stringify(body)
        });
    }

    return processResponse(promise);

}