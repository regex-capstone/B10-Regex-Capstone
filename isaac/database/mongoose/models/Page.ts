import mongoose from 'mongoose'
import IPage from '@/isaac/models/IPage'

const pageSchema = new mongoose.Schema<IPage>({
    title: { type: String, required: true },
    content: { type: String, required: true }
})

const modelName = mongoose.models.Page || mongoose.model<IPage>('Page', pageSchema)

export default modelName
 