function createRandomString () {
    var string = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        string += possible.charAt(Math.floor(Math.random() * possible.length));

    return string;
}

export default createRandomString;