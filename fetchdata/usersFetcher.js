import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/getUsers"


export function getUsers(){
    const {data, error} = useSWR(`${baseUrl}`, fetcher, { refreshInterval: 1000 })
    
    return{
        users: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default { getUsers }