import {
  Box
} from '@mui/material'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (
        theme.palette.mode === 'dark' ? '#512da8' : '#42a5f5'
      ),
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`
    }}>
            Board Content
    </Box>)
}

export default BoardContent