var require = patchRequire(require);

var id = "your account";
var passwd = "your password";

exports.get_id = function() {
    return id;
};

exports.get_passwd = function() {
    return passwd;
};
