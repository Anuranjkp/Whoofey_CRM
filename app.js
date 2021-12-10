var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./config/dbConnection")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session')

var app = express();

//facebook api integration variables
const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken = 'EAADkO0ZBlVkUBAGXAMIZBD6rr9deYokLP5f2uQhmj4PKZAtRqSzrK7QWJ4B7l6tHkAvQijrpRaMPliExt9RkccQdx84ZBuiIWuB3Fmq8Kf9mdalapZAlr3KgJSbijE5Dlp77IRcvXGyu1V5HX71aKZCHC7c71kmf2H7pRq9epgkwzLyeM6Bo5SE7G7HICjcsYsWpEii45XB53uL7zNw5fQKoy5TI8NbRAndRUFO0CqFbAe2prwkbX7';
const accountId = 'act_250943390438981';

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const account = new AdAccount(accountId);
var campaigns;
//facebook api integration variables



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret:"sjd23rfs83r38u489rsjsd983f",
  cookie:{maxAge:30 * 24 * 60 * 60 * 1000}
}))
app.use(express.static(path.join(__dirname, 'public')));



//facebook integration
/* account.read([AdAccount.Fields.name])
  .then((account) =>{
    return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
  })
  .then((result) =>{
    campaigns = result
    campaigns.forEach((campaign) =>console.log(campaign.name))  
  }).catch(console.error); */
//facebook integration



app.use('/', indexRouter);
app.use('/u', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
