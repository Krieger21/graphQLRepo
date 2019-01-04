import prisma from "../prisma";

const Query = {
    greeting(parent, args, ctx, info) {
        if (args.name && args.position) {
            return `Hello ${args.name}, you are my favorite ${args.position}!`
        } else {
            return 'Hello!' 
        }
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
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
    users(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)

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
    posts(parent, args, { prisma }, info) {
        const opArgs = {}

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArgs, info)
    }
}

export { Query as default }