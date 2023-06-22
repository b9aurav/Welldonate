import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

type Props = {}

const Profile = (props: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Welldonate | Profile</title>
      </Helmet>
      <div>Profile</div>
    </HelmetProvider>
  )
}

export default Profile