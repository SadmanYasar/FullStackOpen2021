const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (previousValue, currentValue) => 
        previousValue + currentValue.likes

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    //finds the blog with most likes
    const reducer = (previousValue, currentValue) => 
        Math.max(previousValue, currentValue.likes)

    const mostLikes = blogs.reduce(reducer, 0)    

    return blogs.length === 0
        ? 0
        : mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}