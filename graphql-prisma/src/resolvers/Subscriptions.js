const Subscription = {
    comment: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.comment({
                where: {
                    node: {
                        postedOn: {
                            id: args.postID
                        }
                    }
                }
            }, info)
        }
    },
    post: {
        subscribe(parent, args, { prisma }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info)
        }
    }
}

export { Subscription as default }