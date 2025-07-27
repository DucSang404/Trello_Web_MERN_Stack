/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatter'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title) // convert word to a-b-c
    }

    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}