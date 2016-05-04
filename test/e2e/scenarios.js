describe('end to end testing', function() {

  var clientServer = require('../../config').clientServerUrl;

  beforeEach(function() {
    browser.get(clientServer);
  });

  it('false be true', function() {
    expect(true).toBe(false);
  })

})
