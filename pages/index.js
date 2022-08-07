import Head from 'next/head';

import Logo from './components/home/logo';
import GetStarted from './components/GetStarted/GetStarted';
import MainPage from './components/MainPage/mainPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dystopyan</title>
        <meta name="description" content="Gamified Python Learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        
        <GetStarted/>
      </main>
    </div>
  )
}
