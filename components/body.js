import Image from 'next/image'
import { motion } from 'framer-motion'


const Body = ({svg}) => {

    const containerVariants ={
        hidden :{
            x : '-100vw',
        },

        visible : {
            x : 0,
            transition : {duration : 1.5, delay : 0.2, type : "spring", stiffness : 120}
        },
        exit : {
            x : '-100vw',
            transition : {ease : 'easeInOut'}
        }
    }

    
    return (
        <motion.div
            className="container" 
            style={{display: 'flex', justifyContent: 'center', marginTop: 150, }}
            variants = {containerVariants}
            initial = "hidden"
            animate="visible"
            exit="exit"
        >
            <Image src={svg} height={320} width={320} />
        </motion.div>
      )
}
 
export default Body;