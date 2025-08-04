/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
// import { varAlpha } from 'src/theme/styles'

export function SuspenseLoader () {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' flex='1 1 auto'>
      <LinearProgress
        sx={{
          width: 1,
          maxWidth: 320,
          bgcolor: 'black', // theme => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' }
        }}
      />
    </Box>
  )
}
