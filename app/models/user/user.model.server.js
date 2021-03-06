var mongoose      = require("mongoose");

module.exports = function() {

    var UserSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                required: true, 
                index: { unique: true}
            },
            password: String,
            google:   {
                id:    String,
                token: String
            },
            email: {
                type: String,
                match: [
                    /[\w]+?@[\w]+?\.[a-z]{2,4}/,
                    'The value of path {PATH} ({VALUE}) is not a valid email address.'
                ]
            },
            roles: [String]
        },
        {
          collection: 'user', // collection name
          timestamps: true // create 'createdAt' and 'updatedAt' timestamps
        });

    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser,
        findUserByGoogleId: findUserByGoogleId,
        getMongooseModel: getMongooseModel
    };
    return api;

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function findAllUsers() {
        return UserModel.find();
    }
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function getMongooseModel() {
        return UserModel;
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }
}