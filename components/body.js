import Image from 'next/image'


const Body = ({svg}) => {
    return (
        <div className="container"  style={{display: 'flex', justifyContent: 'center', marginTop: 150, }}>
            <Image src={svg} height={320} width={320} />
        </div>
      )
}
 
export default Body;