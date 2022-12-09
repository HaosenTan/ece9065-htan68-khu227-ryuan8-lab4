const express = require('express')

const app = express()
// const expressJWT = require('express-jwt')
// const config = require('./config')
const jwt = require('jsonwebtoken')

const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
app.set('trust proxy', true)

const expressJWT = require('express-jwt')
const config = require('./config')

// expressJWT use for analysis token
//unless: api/open/login is not need to analysis token
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\/open/] }))




//express-openid-connect is a middleware that allows you to easily add authentication to your application. It uses the OpenID Connect protocol to authenticate users and get their profile information.
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

const artistdetailsRouter = require('./router/artistdetails');
app.use('/', artistdetailsRouter);

const trackdetailsRouter = require('./router/trackdetails');
app.use('/', trackdetailsRouter);

const genresRouter = require('./router/genres');
app.use('/', genresRouter);

const favouritelistRouter = require('./router/favouritelist');
app.use('/', favouritelistRouter);

const userRouter = require('./router/user');
app.use('/api/open', userRouter);

//A mechanism is provided to update the password for an authenticated user.
const changePasswordRouter = require('./router/password');
app.use('/api/secure', changePasswordRouter);

const adminRouter = require('./router/admin');
app.use('/api/admin', adminRouter);

//Add a review to a play-list
const reviewRouter = require('./router/review');
app.use('/api/secure', reviewRouter);

//resend email verification
const resendRouter = require('./router/resend');
app.use('/api/secure', resendRouter);

app.listen(3009, function () {
  console.log('api server running at 3009')
})