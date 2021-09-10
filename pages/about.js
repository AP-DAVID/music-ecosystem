import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import Body from '../components/body.js'
import Attributes from '../components/attributes'
import Footer from '../shared/footer.js'
import {motion, AnimatePresence} from 'framer-motion'

export default function About() {
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
    
	<div className="bg-black h-full w-full text-white py-20" style={{height : "100vh"}}>
		<div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
			<motion.div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8"
                variants = {containerVariants}
                initial = "hidden"
                animate="visible"
                exit="exit"
            >
				<h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">About us</h1>
				<h2 className="text-3xl md:text-5xl leading-relaxed text-gray-50 md:leading-snug mb-2">The Musco Team
				</h2>
				<p className="text-2x1 md:text-base text-gray-50 mb-4">Musco provides the user with an ecosystem of sections providing services and functionalities. It includes: Five sections(user, music artist, videographers, record labels) interacting an providing
                 services to one another. An inbuilt chat application that makes the ecosystem even closer</p>
				<motion.a 
                    href="/logins/login"
                    whileHover={{scale : 1.1}}
                    whileTap={{scale : 1.1}}
                    transition={{type : 'spring', duration : 1.5, stiffness : 300}}
					className="bg-yellow-300 hover:bg-yellow-300 text-black-300 hover:text-red rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
					login Now</motion.a>
			</motion.div>
			<div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
				<div className="h-48 flex flex-wrap content-center">
					<div>
						<img className="inline-block mt-28 hidden xl:block" src="https://user-images.githubusercontent.com/54521023/116969935-c13d5b00-acd4-11eb-82b1-5ad2ff10fb76.png"/></div>
						<div>
							<img className="inline-block mt-24 md:mt-0 p-8 md:p-0"  src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png"/></div>
							<div>
								<img className="inline-block mt-28 hidden lg:block" src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png"/></div>
							</div>
						</div>
					</div>
                </div>
           
        
        

   
    
    
  
  )
}
