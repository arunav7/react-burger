import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://my-burger-1382c.firebaseio.com/'
})

instance.defaults.headers.post['Allow-Control-Access-Origin'] = '*'    // to allow cors policy

export default instance