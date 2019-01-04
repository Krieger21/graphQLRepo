import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, { db }, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)
            
        if (emailTaken) {
            throw new Error('Email is already registered.')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, { db }, info){
        const findIndex = db.users.findIndex((user) => user.id === args.id)

        if(findIndex === -1) {
            throw new Error(`User not found`)
        }

        const deletedUser = db.users.splice(findIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.postedOn !== post.id
                })
            }

            return !match
        })
        db.comments = db.comments.filter((comment) => comment.authoredBy !== args.id)

        return deletedUser[0]
    },
    deletePost(parents, args, { db, pubsub }, info) {
        let findIndex = db.posts.findIndex((post) => post.id === args.id)

        if (findIndex === -1) {
            throw new Error(`Post does not exist`)
        }

        // This const names the deleted post "post" through destructuring
        const [post] = db.posts.splice(findIndex, 1)

        db.comments = db.comments.filter((comment) => comment.postedOn !== args.id)

        if (post.published) {
            pubsub.publish(`post`, {
                post: {
                    mutation: 'DELETED',
                    data: post
                }
            })
        }

        return post

    },
    updatePost(parent, args, { db, pubsub }, info) {
        const post = db.posts.find((post) => post.id === args.id)
        const originalPost = { ...post }

        if (!post) {
            throw new Error('Post cannot be found')
        }

        if (typeof args.data.title === 'string') {
            post.title = args.data.title
        }

        if (typeof args.data.body === 'string') {
            post.body = args.data.body
        }

        if (typeof args.data.published === 'boolean') {
            post.published = args.data.published

            if(originalPost.published && !post.published) {
                pubsub.publish(`post`, {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if (!originalPost.published && post.published) {
                pubsub.publish(`post`, {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            } else if (post.published) {
                pubsub.publish(`post`, {
                    post: {
                        mutation: 'UPDATED',
                        data: post
                    }
                })
            }
        }

        return post
    },
    updateComment(parent, args, { db, pubsub }, info) {
        const comment = db.comments.find((comment) => comment.id === args.id)

        if (!comment) {
            throw new Error('Comment cannot be found')
        }

        if (typeof args.data.text === 'string') {
            comment.text = args.data.text
        }

        pubsub.publish(`comment ${comment.postedOn}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        let findIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if (findIndex === -1) {
            throw new Error(`No comment exists`)
        }

        let [comment] = db.comments.splice(findIndex, 1)

        pubsub.publish(`comment ${comment.postedOn}`, {
            comment: {
                mutation: "DELETED",
                data: comment
            }
        })

        return comment
    },
    createPost(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User does not exist.')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)
        
        if (args.data.published) {
            pubsub.publish(`post`, {
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
        }

        return post
    },
    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some((user) => user.id === args.data.authoredBy)
        const postExists = db.posts.some((post) => post.id === args.data.postedOn)
        const postPublushed = db.posts.find((post) => {
            return post.id === args.data.postedOn
        })
        
        

        if (!userExists || !postExists || postPublushed.published === false) {
            throw new Error('This user or post does not exist.')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        pubsub.publish(`comment ${args.data.postedOn}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        })

        return comment
    },
    updateUser(parent, args, { db }, info) {
        const user = db.users.find((user) => args.id === user.id)

        if(!user) {
            throw new Error('User cannot be found')
        }

        if(typeof args.data.email === 'string') {
            const emailTaken = db.users.some((user) => user.email === args.data.email)

            if (emailTaken) {
                 throw new Error('Email is already taken')
            }

            user.email = args.data.email
        }

        if (typeof args.data.name === 'string') {
            user.name = args.data.name
        }

        if (typeof args.data.age !== 'undefined') {
            user.age = args.data.age
        }

        return user
    }
}

export { Mutation as default }