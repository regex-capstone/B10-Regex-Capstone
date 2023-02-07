import mongoose from 'mongoose'

interface IPage {
    title: String;
    content: String;
}

const pageSchema = new mongoose.Schema<IPage>({
    title: { type: String, required: true },
    content: { type: String, required: true }
})

const modelName = mongoose.models.Page || mongoose.model<IPage>('Page', pageSchema)

export default modelName
 