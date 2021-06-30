import useSWR from 'swr'

const fetcher = (url) =>  fetch(url).then(res => res.json())
const baseUrl = "/api/messages"


export function getMessages(id){
    const {data, error} = useSWR(`${baseUrl}/${id}`, fetcher, { refreshInterval: 1000 })
    
    return{
        messages: data,
        isLoadingg: !error && !data,
        isErrorr: error
    }
}

export default { getMessages }