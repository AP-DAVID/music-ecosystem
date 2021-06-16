import { Result, Button } from 'antd';
import {useRouter, withRouter} from 'next/router'
const Oops = () => {
    const router = useRouter()

    const pushh = () =>{
        router.push('/')
    }

    return ( 
        <div className="container" style={{display:"flex", flexDirection : "column", justifyContent : "center"}}>
            <div style={{display:"flex", flexDirection : "column", justifyContent : "center"}}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button onClick={pushh} type="primary">Back Home</Button>}
                />
            </div>
        </div>
     );
}
 
export default Oops;