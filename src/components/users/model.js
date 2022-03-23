// @ts-check
import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const UserSchema = new Schema(
  {
    nikname: {
      type: String,
      default: 'user'
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'email required']
    },
    password: {
      type: String,
      required: [true, 'password required']
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

UserSchema.plugin(paginate)

const UserModel = model('Users', UserSchema)

export default UserModel
