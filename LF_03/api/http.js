class http_request {

    constructor(){
        this.baseURL = 'http://localhost:3000';
        this.timeout = 5000;
    }
    get(url){
        return new Promise((resolve, reject) => {
            fetch(this.baseURL + url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                resolve(res.json());
            }).catch(err => {
                reject(err);
            })
        })
    }
    post(url, data){
        return new Promise((resolve, reject) => {
            fetch(this.baseURL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => {
                resolve(res.json());
            }).catch(err => {
                reject(err);
            })
        })
    }
}

const http = new http_request()

export default http