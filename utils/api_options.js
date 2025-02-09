module.exports = class ApiOptions {
    constructor(responseResult, authorParam, requestQuery) {
        this.result = responseResult
        this.author = authorParam
        this.query = requestQuery
    }

    percolate() {
        this.result = this.result.select('-__v')
        if (this.author)
            this.result = this.result.find({
                author: new RegExp(this.author, 'i'),
            })
    }

    filter() {
        if (this.query.categories) {
            const categoriesList = this.query.categories.split(',')
            this.result = this.result.find({
                categories: { $in: categoriesList },
            })
        }
        if (this.query.tags) {
            const tagsList = this.query.tags.split(',')
            this.result = this.result.find({ tags: { $in: tagsList } })
        }
    }
}
