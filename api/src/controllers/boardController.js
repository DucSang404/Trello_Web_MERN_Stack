import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body:', req.body)
    // console.log('req.query', req.query)

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'test')
    res.status(StatusCodes.CREATED).json({ message: 'POST CONTROLLER' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}