import Image from 'next/image'
import { motion } from 'framer-motion'


const Body = ({svg}) => {
    return (
        <motion.div
            className="container" 
            style={{display: 'flex', justifyContent: 'center', marginTop: 150, }}
            initial={{x : '-100vw'}}
            animate = {{ x : 0}}
            transition={{duration : 1.5, delay : 0.2, type : "spring", stiffness : 120}}
        >
            <Image src={svg} height={320} width={320} />
        </motion.div>
      )
}
 
export default Body;