/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'

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
    return board
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}