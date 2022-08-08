import Head from 'next/head';

import GetStarted from '../components/GetStarted/GetStarted';

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
