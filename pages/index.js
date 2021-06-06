import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar.js'
import Body from '../components/body.js'
import Attributes from '../components/attributes'
import Footer from '../shared/footer.js'

export default function Home() {
  return (
    <div className={styles.container} style={{height: '100vh'}}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          
      <Navbar />
     
     
      <Body svg="/svgs2.svg"/>
      <Attributes />

      <Footer/>
     

     <Navbar />
     
    
     

      
    </div>
  )
}
