describe('end to end testing', function() {

  var clientServer = require('../../config').clientServerUrl;

  describe('project crud testing', function() {

    beforeEach(function() {
      browser.get(clientServer+'/#/project-crud');
    });

    it('have project element for each project', function() {
      element.all(by.repeater('project in crudCtrl.projects'))
        .then(function(projects) {
          element(by.repeater('project in crudCtrl.projects')).evaluate('crudCtrl.projects.length')
            .then(function(nProjects) {
              expect(projects.length).toBe(nProjects);
            });
        })
    });

    it('projects have name', function() {
      element.all(by.repeater('project in crudCtrl.projects').column('name')).getText()
        .then(function(names) {
          names.forEach(function(name) {
            expect(name).toBeDefined();
          });
        })
    });

    // it('created, update, delete project', function() {
    //
    //   
    // })


  });


})
