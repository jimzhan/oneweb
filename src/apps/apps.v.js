import joi from 'joi'

export const id = joi.object({
  id: joi.string().hex().length(24)
})
