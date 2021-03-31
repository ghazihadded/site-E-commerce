import axios from 'axios'

const setToken=(token)=>{

    if(token){
        return axios.defaults.headers.common['x-auth-token']=token
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
}


export default setToken