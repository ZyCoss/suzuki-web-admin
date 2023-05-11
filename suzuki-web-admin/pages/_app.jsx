import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import dynamic from 'next/dynamic'

const HeaderComponent = dynamic(() => import('@/components/Header'), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <HeaderComponent>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        <Component {...pageProps} />
      </HeaderComponent>
    </Provider>
  )
}
