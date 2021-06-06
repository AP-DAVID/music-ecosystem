import "../styles/tailwind.css";
import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css'
import {Provider} from "next-auth/client"


function MyApp({ Component, pageProps }) {

  return(
    <Provider session={pageProps.session} >
        <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp


