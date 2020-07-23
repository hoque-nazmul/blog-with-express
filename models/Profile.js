const { Schema, model } = require('mongoose');
const User = require('./User');
const Post = require('./Post');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    title: {
        type: String,
        trim: true,
        maxlength: 80,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    profilePic: String,
    links: {
        fb: String,
        twitter: String,
        linkedin: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ]
}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema);

module.exports = Profile;