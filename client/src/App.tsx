import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Profile, CreateCompaign, CampaignDetails } from './pages'
import { Sidebar, Navbar } from './components'

type Props = {}

const App = (props: Props) => {
  return (
    <div className="relative sm:-8 p-4 bg-[#E9ECEF] min-h-screen flex flex-row">
        <div className='sm:flex hidden mr-10 relative'>
            <Sidebar />
        </div>

        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/create-campaign' element={<CreateCompaign />}></Route>
                <Route path='/campaign-details/:id' element={<CampaignDetails />}></Route>
            </Routes>
        </div>
    </div>
  )
}

export default App