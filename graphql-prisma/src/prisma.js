import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'miamiDolphinsAreTheGreatestTeamEverInExistence7389217897438291'
})

export { prisma as default }

// prisma.query.users(null, '{ id name email posts { title body } comments { id text } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })
 
// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId })

//     if (!userExists) {
//         throw new Error('Error: The authorId entered does not any known user')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return post.author
// }

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({ id: postId })

//     if (!postExists) {
//         throw new Error('Error: The postId entered does not match and existing posts.')
//     }

//     const updatedPost = await prisma.mutation.updatePost({
//         data: {
//             ...data
//         },
//         where: {
//             id: postId
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return updatedPost.author
// }

// updatePostForUser('cjomemiuh005u0974i9s6ltga', {
//     title: "Bestest books to read",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })

// createPostForUser("cjol5f8xh003s0974buxg8t0m", {
//     title: "Great books to read",
//     body: "The war of art",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })