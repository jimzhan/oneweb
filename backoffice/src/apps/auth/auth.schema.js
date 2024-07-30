import joi from 'joi'

export const login = joi.object({
  username: joi.string().min(6).email().required(),
  password: joi.string().min(6).required()
})
