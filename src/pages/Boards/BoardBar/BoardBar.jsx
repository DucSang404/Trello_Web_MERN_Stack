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
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          onClick={() => { }}
          sx={MENU_STYLE}
        />

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
            <Avatar alt="user_1" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/493553681_1368383521160319_6908276385417800505_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=103&ccb=1-7&_nc_sid=a8f092&_nc_eui2=AeFFaeU_5QiD6Fp16-h4dpHkSSDBxiIzskRJIMHGIjOyRDl1ozIC_pYMYyhqDAes0c0Gh64U5KJJRRU9r5Ufbrt1&_nc_ohc=0qm5UDZ3olAQ7kNvwELoE6b&_nc_oc=AdmCBExULD5vQ7wA29GlZ74mltFX_LaI519bOrNIGxz5aCuJBDTQ1xxpIZSh0942ywQ&_nc_zt=24&_nc_ht=scontent.fdad3-1.fna&_nc_gid=QxqcTOJHdU-DamfuJaRHqg&oh=00_AfTEf-HM9xns9lyIAg-aXdL4yMEKDam7tNruDUjac03gyQ&oe=687AD139" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_2" src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/452209498_1189366752262109_2626282359879644730_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=106&ccb=1-7&_nc_sid=a8f092&_nc_eui2=AeH0wWOFy9C9hWgyEiVQipgaQppfUvMF655Cml9S8wXrnkHgwbeCjqOW762PH4myynAIy0dm4UF3yWNxatg_PCsg&_nc_ohc=uVJyuSgNko4Q7kNvwEomM80&_nc_oc=AdkLiGuBKBSyPnnnfolrCua0mokseFmshuy_ujQvlNVYHgj7kchYwgsBpxQ3GyW09iY&_nc_zt=24&_nc_ht=scontent.fdad3-5.fna&_nc_gid=6rSGqNsDlBNBOySdD8to7A&oh=00_AfTdOWPlavYPcoWkf0B_NO-w6xBcsvruzfzYPVXaImsnMA&oe=687AECB6" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_3" src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/476026131_4017042741951037_6308592764190574084_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=102&ccb=1-7&_nc_sid=a8f092&_nc_eui2=AeEgidGDSWM1FlhCsQtAvX36hUyVwht0HMKFTJXCG3QcwnC7AtZ0SHRRH7t4637epKDyKTTvc46thL1XhJcdiRrG&_nc_ohc=xXi-Lr8uI1YQ7kNvwHQFcG3&_nc_oc=AdnKUS4fvQtRFZ6Bco9J5R4lud8PkHwDTvIRkvB28CVZGHsh9bC-QTL05vVQqIODu-o&_nc_zt=24&_nc_ht=scontent.fdad3-5.fna&_nc_gid=BqoysqFuR4aZb24XDkjtGQ&oh=00_AfR6MHNrr10ife6Fw14XK-9FjXOmlX_w5Ybe6XCpZ4AMmw&oe=687ADF4F" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_4" src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-1/476560736_1979378512472013_5943435103807192302_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a8f092&_nc_eui2=AeEOafIt3qH7M4eCetpb9VirT2cv9-YMWF5PZy_35gxYXmIL_TzR26N3QsZX6SWfCADEBhJpvczgmf6FeJqmMc9I&_nc_ohc=9pW3m-3uYv0Q7kNvwFG3cLh&_nc_oc=AdkDGUmUIRjNDaw_FAn02Fs4Z_mreDOjRnJPnWOAEzHaaiTqF40iowBbx9XomcnFwGo&_nc_zt=24&_nc_ht=scontent.fdad3-5.fna&_nc_gid=6THZqe5qiLDmc-lWJD3yoQ&oh=00_AfRqputNkamcSrkqheWa4QTZ-JJ8bhJSyYOp7U62vXpz4A&oe=687AF935" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_5" src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/505742159_1278862234245596_9123395351599308781_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=108&ccb=1-7&_nc_sid=a8f092&_nc_eui2=AeEntqCyfjORxUG06t7GzMh96vqYmvEahc7q-pia8RqFzlV0m33MbAsuZbLW8v30aPosFmqICYSTkvJJj2ZbkN31&_nc_ohc=5WR7rIuD9JsQ7kNvwGFfm_3&_nc_oc=AdmQ75ytNAPiEgvGpRqDIMCnpjhrovtZh95i88bw6PPvCKJZBTst-TNEmpzeBl29DXk&_nc_zt=24&_nc_ht=scontent.fdad3-1.fna&_nc_gid=jn0RLrAR-7uPBCg5qBMDQg&oh=00_AfRO-uEYokyvVT3Zmn7FHtyKFQ-59YbejdRLwsjraeWZ_g&oe=687AF810" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="user_6" src="https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/473760588_1970870643419938_7166311787418988964_n.jpg?stp=cp0_dst-jpg_s80x80_tt6&_nc_cat=105&ccb=1-7&_nc_sid=a8f092&_nc_ohc=GBsrZw0hgTQQ7kNvwH7BjZx&_nc_oc=AdkXdRg9Y-3BNPy9tddK_0mLpd00u1khqwcJxPXcPGCABlGjSNFr0iVzS0pmnJmuRMs&_nc_zt=24&_nc_ht=scontent.fdad3-4.fna&_nc_gid=0rTma_IOyBvMLzYyVPPMeg&oh=00_AfRR5Fs25UkSRAjzE4cSVFOzeOi9uyrOWPcPsyGe11olRw&oe=687AF50D" />
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