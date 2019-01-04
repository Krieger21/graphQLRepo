const Subscription = {
    comment: {
        subscribe(parent, args, { db, pubsub }, info) {
            const post = db.posts.find((post) => args.postID === post.id && post.published)

            if (!post) {
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${args.postID}`)
        }
    },
    post: {
        subscribe(parent, args, { pubsub }, info) {
           
            return pubsub.asyncIterator(`post`)
        }
    }
}

export { Subscription as default }