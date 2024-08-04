import { ObjectId } from 'bson'

export default () => new ObjectId().toHexString()
