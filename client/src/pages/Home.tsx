import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

type Props = {}

const Home = (props: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Welldonate | Home</title>
      </Helmet>
    <div>Home</div>
    </HelmetProvider>
  )
}

export default Home