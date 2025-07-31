import {
  Box,
  Tooltip
} from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatter'

const MENU_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.30'
  }
}

function BoardBar(props) {
  const { board } = props
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (
        theme.palette.mode === 'dark' ? '#512da8' : '#42a5f5'
      )
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<DashboardIcon />}
            label={board?.title}
            onClick={() => { }}
            sx={MENU_STYLE}
          />
        </Tooltip>

        <Chip
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          onClick={() => { }}
          sx={MENU_STYLE}
        />

        <Chip
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick={() => { }}
          sx={MENU_STYLE}
        />

        <Chip
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => { }}
          sx={MENU_STYLE}
        />

        <Chip
          icon={<FilterListIcon />}
          label="Filter"
          onClick={() => { }}
          sx={MENU_STYLE}
        />

      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                bgcolor: '#a4b0be'
              }
            }
          }}
        >
          <Tooltip>
            <Avatar alt="user_1" src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_2" src="https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_3" src="https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_4" src="https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_5" src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_6" src="https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_7" src="https://i.pinimg.com/originals/d5/38/b5/d538b58c74c12bc8aa658fc42d1e28df.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_8" src="https://images.unsplash.com/photo-1527980965255-d3b416303d12" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_9" src="https://i.pinimg.com/originals/67/95/38/679538aa62cb6bb7e53c79e519289700.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_10" src="https://images.unsplash.com/photo-1603415526960-f7e0328f6637" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_11" src="https://i.pinimg.com/originals/f0/86/3f/f0863fb5e729e62b0b379a6abf48d1b4.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar