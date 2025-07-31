/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title) // convert word to a-b-c
    }

    const createdBoard = await boardModel.createNew(newBoard)
    console.log('createdBoard', createdBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log('getNewBoard', getNewBoard)
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    // Create a new board to handle, it dont effect board at first
    const resBoard = cloneDeep(board)
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}