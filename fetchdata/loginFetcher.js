import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/login"


export function getLogin(id){
    const {data, error} = useSWR(`${baseUrl}/${id}`, fetcher, { refreshInterval: 1000 })
    
    return{
        logins: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default { getLogin }