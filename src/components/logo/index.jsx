import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// material-ui
import ButtonBase from '@mui/material/ButtonBase'

import imgLogo from '../../assets/images/rsiec-logo.png'

// project imports
import Logo from './LogoMain'
import LogoIcon from './LogoIcon'
import { APP_DEFAULT_PATH } from 'config'
import { Typography, Box } from '@mui/material'

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection ({ reverse, isIcon, sx, to }) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} sx={sx}>
      {!isIcon ? (
        <img alt='' src={imgLogo} width={36} />
      ) : (
        <Box display='flex' flexDirection='row' justifyContent='start' alignItems='center'>
          <img alt='' src={imgLogo} width={48} />
          <Typography px={1} sx={{color: 'black', fontSize: 32}} >RSIEC</Typography>
        </Box>
      )}
    </ButtonBase>
  )
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any }
