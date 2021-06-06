import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/register"

export  function getRegister(){
    const {data, error} = useSWR(baseUrl, fetcher, { refreshInterval: 1000 })
    return{
        registers: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function getUser(id){
    const {data, error} = useSWR(`${baseUrl}/${id}`, fetcher, { refreshInterval: 1000 })
    
    return{
        register: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default { getRegister, getUser}