import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns.jsx'

function BoardContent() {

  return (
    <Box sx={{
      bgcolor: (theme) => (
        theme.palette.mode === 'dark' ? '#512da8' : '#42a5f5'
      ),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      <ListColumns />

    </Box >
  )
}

export default BoardContent