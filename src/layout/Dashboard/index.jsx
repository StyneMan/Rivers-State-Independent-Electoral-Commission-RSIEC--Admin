/* eslint-disable prettier/prettier */
import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import useMediaQuery from '@mui/material/useMediaQuery'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'

// project imports
import Drawer from './Drawer'
import Header from './Header'
import Footer from './Footer'
import Loader from 'components/Loader'
import Breadcrumbs from 'components/@extended/Breadcrumbs'

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu'
import { SuspenseLoader } from '../../components/suspense_loader'
import { useDispatch } from 'react-redux'
import useUsers from '../../hooks/use-users'
import useApplications from '../../hooks/use-applications'
import { setAdmins } from '../../redux/reducers/users'
import { setApplications } from '../../redux/reducers/applilcations'

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout () {
  const { menuMasterLoading } = useGetMenuMaster()
  const downXL = useMediaQuery(theme => theme.breakpoints.down('xl'))

  const dispatch = useDispatch()
  const { data: usersData } = useUsers(1)
  const { data: applicationsData } = useApplications(1)

  useEffect(() => {
    if (usersData) {
      dispatch(setAdmins(usersData))
    }

    if (applicationsData) {
      dispatch(setApplications(applicationsData))
    }

    // if (applicationsData) {
    //   dispatch(setApplications(applicationsData))
    // }
  }, [dispatch, usersData, applicationsData])

  // set media wise responsive drawer
  useEffect(() => {
    handlerDrawerOpen(!downXL)
  }, [downXL])

  if (menuMasterLoading) return <Loader />

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />

      <Box component='main' sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: 'inherit' }} />
        <Box
          sx={{
            ...{ px: { xs: 0, sm: 2 } },
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Breadcrumbs />
          <Suspense fallback={<SuspenseLoader />}>
            <Outlet />
          </Suspense>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
