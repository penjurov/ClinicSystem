var url = 'http://localhost:9999';

(function () {
    describe('Try', function () {
        it('to register when user data is wrong, expect to return }', function () {
            var req = new XMLHttpRequest(),
                actual,
                expected = 500,
                params = 'Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=qweq&confirmpassword=123456789a&password=123456789a';

            req.open('POST', url + '/api/users', true);
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.response) {
                    actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to login as specialist with default name and password', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                params = 'userName=specialist&password=123456',
                actual;

            req.open('POST', url + '/login', true);
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState === 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to login as patient with default name and password', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                params = 'userName=patient&password=123456',
                actual;

            req.responseType="json";
            req.open('POST', url + '/login', true);

            req.send(params);
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to view users', function () {
            var expected = 403,
                req = new XMLHttpRequest(),
                actual;

            req.open('GET', url + '/api/users', true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.response) {
                    actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to create user with duplicated username', function () {
            var expected = 404,
                req = new XMLHttpRequest(),
                params = 'Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=specialist&confirmpassword=123456789a&password=123456789a',
                actual;
            
            req.open('GET', url + '/api/users:'+params.username, true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.status ==404) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to update user information', function () {
            var expected = 200,
                username = 'specialist',
                req = new XMLHttpRequest(),
                params = 'Age=21&FirstName=qw&Gender=Male&History=NoHistory&LastName=Qwerty&PatientNumber=23456778&Phone=234567322&Username=qweq&confirmpassword=123456789a&password=123456789a',
                actual;

            req.open('GET', url + '/api/users:'+username, true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to create procedure', function () {
            var expected = 403,
                req = new XMLHttpRequest(),
                params = 'Name=extremlyNew&desc=whatever&recovery=none',
                actual;

            req.open('POST',url + '/api/procedure', true);
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState == 4 && req.response) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to create procedure with wrong input data', function () {
            var expected = 403,
                req = new XMLHttpRequest(),
                params = 'Name=extremlyNew&desc=whatever&recovery=none',
                actual;

            req.open('POST', url + '/api/procedure', true);
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to create procedure as patient', function () {
            var req = new XMLHttpRequest(),
                params = 'userName=patient&password=123456',
                expected = 403,
                actual;

            req.open('POST', url + '/login', true);
            req.send(params);
            req.open('POST', url + '/api/procedure', true);
            params = 'Name=NoNew&desc=ever&recovery=none';
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to view all procedures', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                actual;

            req.open('GET', url + '/api/procedure', true);
            req.send();
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to view specialists', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                actual;

            req.open('GET', url + '/api/specialists', true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to view medicine as specialist', function () {
            var expected = 403,
                req = new XMLHttpRequest(),
                actual;

            req.open('GET',url + '/api/medicine', true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to view medicine as patient', function () {
            var expected = 403,
                req = new XMLHttpRequest(),
                actual;

            req.open('GET', url + '/api/medicine', true);
            req.send();
            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to update user as patient', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                params = 'userName=patient&password=123456',
                actual;

            req.open('POST', url + '/login', true);
            req.send(params);

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    req.open('PUT', url + '/api/users', true);
                    req.send();
                }
            };

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });

        it('to logout', function () {
            var expected = 200,
                req = new XMLHttpRequest(),
                params = 'userName=patient&password=123456',
                actual;

            req.open('POST', url + '/logout', true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState == 4 ) {
                    var actual = req.status;
                    expect(actual).to.equal(expected);
                }
            };
        });
    });
}());