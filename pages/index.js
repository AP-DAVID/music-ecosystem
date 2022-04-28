import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar.js";
import Body from "../components/body.js";
import Attributes from "../components/attributes";
import Footer from "../shared/footer.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1.5 },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  };
  return (
    <motion.div className={styles.container} style={{ height: "100vh" }}>
      <Head>
        <title>Musco App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Body svg="/svgs2.svg" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Attributes />

        <Footer />
      </motion.div>
    </motion.div>
  );
}
