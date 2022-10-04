import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Couldnt get all posts... :/'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postID = req.params.id;
        PostModel.findOneAndUpdate({
            _id: postID
        }, {
            $inc: { viewsCount: 1 }
        },
        {
            returnDocument: 'after'
        },
        (error, doc) => {
            if(error) {
                console.log(error)
                return res.status(500).json({
                    message: 'Couldnt get post... :/'
                })
            }

            if(!doc) {
                return res.status(404).json({
                    message: 'Post didnt find'
                })
            }

            res.json(doc)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Couldnt get all posts... :/'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageURL: req.body.imageURL,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Couldnt create post... :/'
        })
    }
}