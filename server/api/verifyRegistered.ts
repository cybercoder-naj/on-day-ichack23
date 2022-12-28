import users from '../data/users.json'

export default defineEventHandler(async (e): Promise<boolean> => {
    const { email } = getQuery(e)
    return users.some(user => user.Email === email)
})