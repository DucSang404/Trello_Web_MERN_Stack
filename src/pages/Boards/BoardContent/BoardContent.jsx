import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns.jsx'
import { mapOrder } from '~/utils/sorts.js'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column.jsx'
import Cards from './ListColumns/Column/ListCards/Cards/Cards.jsx'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // Yêu cầu chuột di chuyển 10px mới thực hiện event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState([]) // Kéo 1 phần tử trong 1 thời điểm (card or column)
  const [activeDragItemType, setActiveDragItemType] = useState([])
  const [activeDragItemData, setActiveDragItemData] = useState([])
  const [oldColumn, setOldColumn] = useState([])

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumnsState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Function handle update state in case move card to another column
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        // Xóa card đang kéo ra khỏi column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Cập nhật card order
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // Kiểm tra card đang kéo có tồn tại trong overColumn chưa.
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // Thêm card vào vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Cập nhật card order
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // console.log('handleDragOver', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    if (!active | !over) return
    // Card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // Card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId } = over

    // Find 2 column by card Id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn | !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active | !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // Card đang tương tác trên hoặc dưới so với card được kéo ở trên
      const { id: overCardId } = over

      // Find 2 column by card Id
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn | !overColumn) return

      if (oldColumn._id !== overColumn._id) {
        // Drag card in another column
        moveCardBetweenDifferentColumns(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
      } else {
        // Drag card in column
        const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          // Find end column when drop
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          // Update value in card and cardOrderIds in targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)

        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns:', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds:', dndOrderedColumnsIds)
        setOrderedColumnsState(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (
          theme.palette.mode === 'dark' ? '#512da8' : '#42a5f5'
        ),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumnsState} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Cards card={activeDragItemData} />}

        </DragOverlay>

      </Box >
    </DndContext>
  )
}

export default BoardContent