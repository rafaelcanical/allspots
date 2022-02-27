import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AllSpots</title>
        <meta
          name="description"
          content="A catalog of parkour spots around the world, with images, description and map locations."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold">Hi mom</h1>
    </div>
  )
}

export default Home
