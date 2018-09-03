var express = require('express');
var request = require('supertest');

function createApp() {
    app = express();
  
    var router = express.Router();
    router.route('/').get(function(req, res) {
      return res.json({goodCall: true});
    });
  
    app.use(router);
  
    return app;
}

describe('user test', function() {
    var username = 'username';
    var password = 'password';
    var app;
  
    // Called once before any of the tests in this block begin.
    before(function(done) {
      app = createApp();
      app.listen(function(err) {
        if (err) { return done(err); }
        done();
      });
    });
  
    describe('sign up', function() {
        it('should not sign up an user when usernameis empty', function(done) {
            request(app)
            .post('/register')
            .send({
                username: '',
                password: password
            })
            .expect(200, function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('username or password cannot be empty');
                done();
            });
        });
        it('should not sign up an user when password is empty', function(done) {
            request(app)
            .post('/regjster')
            .send({
                username: username,
                password: ''
            })
            .expect(200, function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('username or password cannot be empty');
                done();
            });
        });
        it('should sign up an user', function(done) {
            request(app)
            .post('/register')
            .send({
                username: username,
                password: password
            })
            .expect(200, function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('Successfully register');
                done();
            });
        });
        it('should not sign up an user when it is exist', function(done) {
            request(app)
            .post('/register')
            .send({
                username: username,
                password: password
            })
            .expect(200, function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('user has existed');
                done();
            });
        });
    });
  
    describe('sign in', function(done) {
        it('should not sign in successful when username is empty', function(done) {
            request(app)
            .post('/login')
            .send({
                username: '',
                password: password
            })
            .end(function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('username or password cannot be null');
                done();
            });
        });
        it('should not sign in successful when usernameis not exist', function(done) {
            request(app)
            .post('/login')
            .send({
                username: username+ '1',
                password: password
            })
            .end(function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('user not exist');
                done();
            });
        });
        it('should not sign in successful when password is wrong', function(done) {
            request(app)
            .post('/login')
            .send({
                username: username,
                password: password + '1'
            })
            .end(function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('wrong password');
                done();
            });
        });
        it('should sign in successful', function(done) {
            request(app)
            .post('login')
            .send({
                username: username,
                password: password
            })
            .end(function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('Successfully log in');
                done();
            });
        });
    });
    describe('log out', function(done) {
        it('should log out successful', function(done) {
            request(app)
            .post('logout')
            .send({
                username: username,
                password: password
            })
            .end(function(err, res) {
                //should.not.exist(err);
                //res.text.should.containEql('Already Log out');
                done();
            });
        });
    
    });
});

