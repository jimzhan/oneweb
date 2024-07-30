
export const login = (_, h) => {
  return h.response({ data: '<token>' }).code(200)
}

export const logout = (_, h) => {
  return h.response({ data: 'echo' }).code(204)
}
