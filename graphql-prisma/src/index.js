import prisma from './prisma.js'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { parseConstValue } from 'graphql/language/parser';
import db from './db.js'
import Query from './resolvers/Query.js'
import Mutation from './resolvers/Mutation.js'
import Subscription from './resolvers/Subscriptions.js'
import Post from './resolvers/post.js'
import User from './resolvers/user.js'
import Comment from './resolvers/comment.js'

const pubsub = new PubSub()

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Post,
        Comment,
        User,
        Mutation,
        Subscription
    },
    context(request) {
        return {
            db: db,
            pubsub: pubsub,
            prisma: prisma,
            request
        }
    }
})

server.start(() => {
    console.log('The server is up')
})