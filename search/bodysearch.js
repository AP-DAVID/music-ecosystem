import Image from 'next/image'
import Typography from '@material-ui/core/Typography'





const Sbody = ({svg}) => {
    return ( 
        // 404 error page
        <div className="container"  style={{display: 'flex', justifyContent: 'center', marginTop: 150, }}>
            <Image src={svg} height={320} width={320} />
            <Typography variant="h5">Oops, user cannot be found</Typography>
        </div>
     );
}
 
export default Sbody;