const {Octokit} = require('@octokit/rest')
require('dotenv').config()
const octokit = new Octokit ({
  auth: process.env.TOKEN
})

const users = async (req,res,next) => {

    let allUser = [];
    try {
        const users = await octokit.request('/users')
            allUser = users.data
            const nextPage = users.headers.link
            res.send(allUser.concat(nextPage))
    } catch (error) {
        next(error)
    }
}

const userSince = async (req,res,next) => {
    const number = req.query.since;
    try {
    const userSince = await octokit.request(`/users?since=${number}&per_page`,{
      per_page: 100
    })
    const nextPage = userSince.headers.link
        res.send(userSince.data.concat(nextPage))
    } catch (error) {
        next(error)
    }
}

const userDetail = async (req,res,next) => {
    const {username} = req.params;
    try {
        const {data} = await octokit.request(`/users/${username}`);
        res.send(data)
    } catch (error) {
        next(error)
    }
}

const userRepos = async (req,res,next) => {
    const {username} = req.params;

    let userRepos = [];
    try {
        const repoData = await octokit.request(`/users/${username}/repos{?type,sort,direction,per_page,page}'`,{
          per_page: 100
        })
        userRepos = repoData.data
        let filterData = userRepos.map(e => {
            return {
                id: e.id,
                name: e.name,
                html_url: e.html_url
            }
        })
        res.send(filterData)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userSince,
    userDetail,
    userRepos,
    users
}