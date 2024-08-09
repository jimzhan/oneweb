import joi from 'joi'

export const id = joi.object({
  id: joi.string().hex().length(24)
})

export const pagination = joi.object({
  next: joi.string().hex(),
  prev: joi.string().hex()
}).oxor('next', 'prev')
