import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//functions -middleware

Schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//functions -comparePassword

Schema.methods.comparePassword = async (string_pass: string) => {
  const isMatch: boolean = await bcrypt.compare(string_pass, this.password);
  return isMatch;
};
//functions -updatePassword

Schema.methods.updatePassword = async (string_pass: string) => {
  const pass: string = await bcrypt.hash(string_pass, 10);
  return pass;
};
export const UserModel = mongoose.models.User || mongoose.model("user", Schema);
