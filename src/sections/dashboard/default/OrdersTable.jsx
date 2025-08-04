/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types'
// material-ui
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// project imports
import Dot from 'components/@extended/Dot'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

// function createData(tracking_no, name, fat, carbs, protein) {
//   return { tracking_no, name, fat, carbs, protein };
// }

// const rows = [
//   createData(84564564, 'Camera Lens', 40, 2, 40570),
//   createData(98764564, 'Laptop', 300, 0, 180139),
//   createData(98756325, 'Mobile', 355, 1, 90989),
//   createData(98652366, 'Handset', 50, 1, 10239),
//   createData(13286564, 'Computer Accessories', 100, 1, 83348),
//   createData(86739658, 'TV', 99, 0, 410780),
//   createData(13256498, 'Keyboard', 125, 2, 70999),
//   createData(98753263, 'Mouse', 89, 2, 10570),
//   createData(98753275, 'Desktop', 185, 1, 98063),
//   createData(98753291, 'Chair', 100, 0, 14001)
// ];

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map(el => el[0])
}

const headCells = [
  {
    id: 'passport',
    align: 'left',
    disablePadding: false,
    label: 'Applicant'
  },
  {
    id: 'email_address',
    align: 'left',
    disablePadding: true,
    label: 'Email Address'
  },
  {
    id: 'phone_number',
    align: 'left',
    disablePadding: true,
    label: 'Phone Number'
  },
  {
    id: 'category',
    align: 'left',
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'state',
    align: 'left',
    disablePadding: false,

    label: 'State'
  },
  {
    id: 'lga',
    align: 'left',
    disablePadding: false,
    label: 'Local Govt'
  }
]

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead ({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells?.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function OrderStatus ({ status }) {
  let color
  let title

  switch (status) {
    case 0:
      color = 'warning'
      title = 'Pending'
      break
    case 1:
      color = 'success'
      title = 'Approved'
      break
    case 2:
      color = 'error'
      title = 'Rejected'
      break
    default:
      color = 'primary'
      title = 'None'
  }

  return (
    <Stack direction='row' sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  )
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable () {
  const order = 'asc'
  const orderBy = 'tracking_no'

  const { allApplications } = useSelector(state => state.application)

  function initLetters (fName, lName) {
    const fN = `${fName}`.substring(0)
    const lN = `${lName}`.substring(0)

    return `${fN}${lN}`
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby='tableTitle'>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(allApplications?.data?.slice(0, 5), getComparator(order, orderBy))?.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role='checkbox'
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component='th' id={labelId} scope='row'>
                    <Box display='flex' flexDirection='row' justifyContent='start' alignItems={'center'}>
                      <Avatar variant='circular' src={row?.passport}>
                        {(initLetters(row?.first_name), row?.last_name)}
                      </Avatar>
                      <Typography px={1} >
                      {`${row?.first_name} ${row?.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.email_address}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell sx={{textTransform: 'capitalize' }} >{`${row?.category}`.replaceAll('_', ' ')}</TableCell>
                  <TableCell>{row.qualification}</TableCell>
                  <TableCell>{row.lga}</TableCell>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string }

OrderStatus.propTypes = { status: PropTypes.number }
