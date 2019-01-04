import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId.js'

const Mutation = {
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: jwt.sign({userId: user.id}, 'thisisasecret')
        }
    },
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        let password = await bcrypt.hash(args.data.password, 10)

        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password: password
            }
        })

        return {
            user,
            token: jwt.sign({userId: user.id}, 'thisisasecret')
        }

    },
    async deleteUser(parent, args, { prisma, request }, info){
        const userId = getUserId(request)

        const user = await prisma.exists.User({ id: args.id })

        if (!user) {
            throw new Error('User does not exist')
        }

        return prisma.mutation.deleteUser({ 
            where: {
                id: userId
            }
        }, info)
    },
    async deletePost(parents, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        }, info)

        if(!postExists) {
            throw new Error('Not authorized to perform this action.')
        }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if(!postExists) {
            throw new Error('Not authorized to perform this action.')
        }

        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.data.postedOn,
            authoredBy: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('You are not authorized to perform this action.')
        }

        return prisma.mutation.updateComment({
            where: {
                id: args.id
            },
            data: {
                text: args.data.text
            }
        }, info)
    },
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            authoredBy: {
                id: userId
            }
        })

        if (!commentExists) {
            throw new Error('You are not authorized to perform this action.')
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const userExists = await prisma.exists.User({
            id: userId
        })

        if(!userExists) {
            throw new Error('You are not authorized to perform this action.')
        }

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                postedOn: {
                    connect: {
                        id: args.data.postedOn
                    }
                },
                authoredBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
 
    }
}

export { Mutation as default }