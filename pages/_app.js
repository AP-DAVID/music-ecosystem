import "../styles/tailwind.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import _ from "lodash";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "next-auth/client";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <Provider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp;
