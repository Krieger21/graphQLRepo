const Query = {
    greeting(parent, args, ctx, info) {
        if (args.name && args.position) {
            return `Hello ${args.name}, you are my favorite ${args.position}!`
        } else {
            return 'Hello!' 
        }
    },
    comment(parent, args, { db }, info) {
        return db.comments
    },
    grades(parent, args, ctx, info) {
        return [99, 80, 90]
    },
    add(parent, args, ctx, info) {
            if (args.numbers.length) {
                return args.numbers.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                })
            }
            return 0
    },
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase())
        })

    },
    me() {
        return {
            id: '123008',
            name: 'Colten',
            email: "kingkrieg@gmail.com",
        }
    },
    you() {
        return 'Tanneer'
    },
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }

        return db.posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase.includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase.includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
    }
}

export { Query as default }