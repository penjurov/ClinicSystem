var url = 'http://localhost:9999';

(function () {
    describe('Try', function () {
        it('to register when user data is wrong, expect to return }', function () {
            var req = new XMLHttpRequest();
            var actual = null;
            var expected = 500;
            var params = "Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=qweq&confirmpassword=123456789a&password=123456789a";

            req.open('POST', url + '/api/users', true);
            req.send(params);

            var actual = req.status;
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 && req.response != null) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to login as specialist with default name and password', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();
            req.open('POST', url + '/login', true);

            var params = "userName=specialist&password=123456";
            req.send(params);
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) { //To do : check if responseText contains success:true !
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to login as patient with default name and password', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();

            req.responseType="json";
            req.open('POST', url + '/login', true);

            var params = "userName=patient&password=123456";
            req.send(params);
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) { //To do : check if responseText contains success:true !
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to view users', function () {
            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();
            req.open('GET', url + '/api/users', true);
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 && req.response !=null) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to create user with duplicated username', function () {
            var actual = null;
            var expected = 404;
            var req = new XMLHttpRequest();
            var params = "Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=specialist&confirmpassword=123456789a&password=123456789a";
            req.open('GET', url + '/api/users:'+params.username, true);
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 && req.status ==404) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to update user information', function () {
            var actual = null;
            var expected = 200;
            var username = 'specialist'
            var req = new XMLHttpRequest();
            var params = "Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=qweq&confirmpassword=123456789a&password=123456789a";

            req.open('GET', url + '/api/users:'+username, true);
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.

                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to create procedure', function () {
            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();

            req.open('POST',url + '/api/procedure', true);

            var params = "Name=extremlyNew&desc=whatever&recovery=none";
            req.send(params);
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 && req.response !=null) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to create procedure with wrong input data', function () {
            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();

            req.open('POST', url + '/api/procedure', true);
            var params = "Name=extremlyNew&desc=whatever&recovery=none";
            req.send(params);
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to create procedure as patient', function () {
            var req = new XMLHttpRequest();

            req.open('POST', url + '/login', true);

            var params = "userName=patient&password=123456";
            req.send(params);

            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();

            req.open('POST', url + '/api/procedure', true);
            var params = "Name=NoNew&desc=ever&recovery=none";
            req.send(params);
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to view all procedures', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();

            req.open('GET', url + "/api/procedure", true);
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to view specialists', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();

            req.open('GET', url + '/api/specialists', true);
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to view medicine as specialist', function () {
            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();
            req.open('GET',url + '/api/medicine', true);
            req.send();
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to view medicine as patient', function () {
            var actual = null;
            var expected = 403;
            var req = new XMLHttpRequest();
            req.open('GET', url + '/api/medicine', true);
            req.send();
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to update user as patient', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();
            //-------------Login as patient
            req.open('POST', url + '/login', true);
            var params = "userName=patient&password=123456";
            req.send(params);
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    req.open('PUT', url + '/api/users', true);
                    req.send();
                }
            }
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });

        it('to logout', function () {
            var actual = null;
            var expected = 200;
            var req = new XMLHttpRequest();
            req.open('POST', url + '/logout', true);
            var params = "userName=patient&password=123456";
            req.send();
            req.onreadystatechange = function() {//Call a function when the state changes.
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            }
        });
    });
}());


