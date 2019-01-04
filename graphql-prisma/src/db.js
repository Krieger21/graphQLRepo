const users = [{
    id: '1',
    name: 'Colten',
    email: 'coltenkreig@gmail.com',
    age: 25,

}, {
    id: '2',
    name: 'Tanner',
    email: 'tannerkreig@gmail.com',
    age: 23,
}, {
    id: '3',
    name: 'David',
    email: 'davidkreig@gmail.com',
    age: 55,
}]

const posts = [{
    id: '1',
    title: 'Reading the word.',
    body: 'Read the bible every day',
    published: true,
    author: '3'
}, {
    id: '2',
    title: 'Loving the Lord.',
    body: 'Should be the number one priority',
    published: true,
    author: '3'
}, {
    id: '3',
    title: 'HAPPY BDAY.',
    body: 'Youre 25!!!!',
    published: false,
    author: '1'
}]

const comments = [{
    id: '12',
    text: 'I love you',
    postedOn: '1',
    authoredBy: '2'
}, {
    id: '13',
    text: 'Ya Baby',
    postedOn: '1',
    authoredBy: '1'
}, {
    id: '14',
    text: 'Hello',
    postedOn: '2',
    authoredBy: '2'
}, {
    id: '15',
    text: 'I love you very much',
    postedOn: '3',
    authoredBy: '2',
}]

const db = {
    users,
    posts,
    comments
}

export { db as default }