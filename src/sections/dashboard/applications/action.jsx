/* eslint-disable prettier/prettier */
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import { Popover, MenuList } from '@mui/material'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'
import APIService from '../../../service/api-service'
import CustomizedDialog from '../../../components/dialog'
import { RenderConfirmation } from '../../../components/confirmation'

import { MoreOutlined, CheckCircleOutlined, DislikeOutlined } from '@ant-design/icons';

// icons
const icons = {
  MoreOutlined,
  CheckCircleOutlined,
  DislikeOutlined
};

const ActionButton = ({ row }) => {
  const dispatch = useDispatch()
  const [openUpdate, setOpenUpdate] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [message, setMessage] = useState('')
  const [openPopover, setOpenPopover] = useState(null)
  const { profile } = useSelector(state => state.auth)

  const handleOpenPopover = useCallback(event => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const updateApplication = status => {
    const payload = {
      status: status
    }
    const prom = APIService.updateApplication(row?.id ?? row?._id, payload)

    toast.promise(prom, {
      pending: {
        render () {
          return 'Loading. Please wait...'
        },
        icon: false
      },
      success: {
        render ({ data }) {
          dispatch(setLoading(false))
          mutate('/application/all')
          const res = data?.data?.message || `Application ${status} successfully`
          setOpenDelete(false)
          return `${res}`
        }
      },
      error: {
        render ({ data }) {
          dispatch(setLoading(false))
          console.log('ERRO ON TOAST HERE :: ', data?.response?.data?.message)
          const errorMsg = data?.response?.data?.message || data?.message || ''
          // When the promise reject, data will contains the error
          return `${errorMsg ?? 'An error occurred!'}`
        }
      }
    })
  }

  return (
    <>
      <CustomizedDialog
        open={openUpdate}
        setOpen={setOpenUpdate}
        title={'Approve Application'}
        body={<RenderConfirmation setOpen={setOpenUpdate} message={message} action={() => updateApplication('approved')} />}
      />

      <CustomizedDialog
        open={openDelete}
        setOpen={setOpenDelete}
        title={'Reject Application'}
        body={<RenderConfirmation setOpen={setOpenDelete} message={message} action={() => updateApplication('rejected')} />}
      />
      <IconButton onClick={handleOpenPopover}>
        <icons.MoreOutlined />
      </IconButton>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' }
            }
          }}
        >
          {profile && profile?.access === 'read/write' && (row?.status !== 'approved' || row?.status !== 'rejected') && (
            <>
              <MenuItem
                onClick={() => {
                  setMessage(`Are you sure you want to approve this application? Action is irreversible.`)
                  handleClosePopover()
                  setOpenUpdate(true)
                }}
                sx={{ color: 'info.main' }}
              >
                <icons.CheckCircleOutlined />
                Approve
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMessage(`Are you sure you want to reject this application? Action is irreversible.`)
                  handleClosePopover()
                  setOpenDelete(true)
                }}
                sx={{ color: 'error.main' }}
              >
                <icons.DislikeOutlined />
                Reject
              </MenuItem>
            </>
          )}
        </MenuList>
      </Popover>
    </>
  )
}

export default ActionButton
