const Comment = {
    postedOn(parent, args, { db }, info) {
        return db.posts.find((post) => {
            return post.id === parent.postedOn
        })
    },
    authoredBy(parent, args, { db }, info) {
        return db.users.find((user) => {
            return user.id === parent.authoredBy
        })
    }
}

export { Comment as default }