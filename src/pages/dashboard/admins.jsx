/* eslint-disable prettier/prettier */
import { Box, Card, Toolbar, Typography } from '@mui/material'
import React from 'react'
import ApplicationTable from '../../sections/dashboard/applications/table'

const Admins = () => {
  React.useEffect(() => {}, [])

  return (
    <Box p={2}>
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='start'>
        <Typography variant='h4' flexGrow={1}>
          Administrative Users
        </Typography>
      </Box>
      <Toolbar />;
      <Card sx={{ p: 1 }}>
        <ApplicationTable />
      </Card>
    </Box>
  )
}

export default Admins


