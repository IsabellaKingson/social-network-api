const { Schema, model } = require("mongoose");

const formatDate = function (val) {
  if (!val) return val;
  return val.getMonth() + 1 + "/" + val.getDate() + "/" + val.getFullYear();
};

const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  });
  

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
}
);

userSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;