import Head from 'next/head';

import Logo from './components/home/logo';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dystopyan</title>
        <meta name="description" content="Gamified Python Learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Logo />
      </main>
    </div>
  )
}
