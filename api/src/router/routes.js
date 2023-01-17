const {Router} = require('express');
const router = Router();
const {userDetail,userRepos,userSince,users} = require('./controller/controller')

router.get('/api/users/:username/details', userDetail)
router.get('/api/users/:username/repos' , userRepos)
router.get(`/api/users`, userSince)
router.get('/api/users/', users)

module.exports = router;