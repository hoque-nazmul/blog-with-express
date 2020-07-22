const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

const Profile = model('Profile', profileSchema);

module.exports = Profile;