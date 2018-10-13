
module.exports = function(app) {

    var userService = require("./services/user/user.service.server.js")(app);
    var itemService = require("./services/item/item.service.server.js")(app);
    var productService = require("./services/product/product.service.server.js")(app);

}