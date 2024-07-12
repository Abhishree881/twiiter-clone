import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import '@/styles/globals.css';
import EditModal from '@/components/modals/EditModal';
import EditPostModal from '@/components/modals/EditPostModal';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import CreatePostModal from '@/components/modals/CreatePostModal';


const App: React.FC<{ Component: any, pageProps: any }> = ({ Component, pageProps }) => {
  const [mode, setMode] = useState(0)
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <EditModal />
        <EditPostModal />
        <CreatePostModal/>
        <Layout mode={mode} setMode={setMode}>
          <Component {...pageProps} mode={mode} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default App;
