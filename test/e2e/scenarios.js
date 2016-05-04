describe('end to end testing', function() {

  var clientServer = require('../../config').clientServerUrl;

  describe('project crud testing', function() {

    beforeEach(function() {
      //sign in
      browser.get(clientServer+'/#/signin');
      element(by.model('user.username')).clear().sendKeys('tad');
      element(by.model('user.password')).clear().sendKeys('salem');
      element(by.buttonText('sign in')).click()
        .then(function() {
          //nav to project-crud
          browser.get(clientServer+'/#/project-crud');
        });
    });

    // it('have project element for each project', function() {
    //   element.all(by.repeater('project in crudCtrl.projects'))
    //     .then(function(projects) {
    //       element(by.repeater('project in crudCtrl.projects')).evaluate('crudCtrl.projects.length')
    //         .then(function(nProjects) {
    //           expect(projects.length).toBe(nProjects);
    //         });
    //     })
    // });
    //
    // it('projects have name', function() {
    //   element.all(by.repeater('project in crudCtrl.projects').column('name')).getText()
    //     .then(function(names) {
    //       names.forEach(function(name) {
    //         expect(name).toBeDefined();
    //       });
    //     })
    // });

    describe('created, update, delete project', function() {

      beforeEach(function() {
        //sign in
        browser.get(clientServer+'/#/signin');
        element(by.model('user.username')).clear().sendKeys('tad');
        element(by.model('user.password')).clear().sendKeys('salem');
        element(by.buttonText('sign in')).click()
          .then(function() {
            //nav to project-crud
            browser.get(clientServer+'/#/project-crud');

            //create a project
            var createForm = $('#project-crud').$('#create-project');
            element(by.model('project.name')).clear().sendKeys('plz');
            element(by.model('project.url')).clear().sendKeys('http://plz.com');
            element(by.model('project.imgSrc')).clear().sendKeys('https://media.giphy.com/media/CL5FfrZoVR3Gw/giphy.gif');
            element(by.model('project.date')).clear().sendKeys('5/4/16');
            element(by.model('project.tags')).clear().sendKeys('plz,respond');
            element(by.model('project.about')).clear().sendKeys('<p>this is a test</p>');
            element(by.buttonText('create')).click()
              .then(function() {
                console.log('button click');
                element.all(by.repeater('project in crudCtrl.projects').column('name')).getText()
                  .then(function(names) {
                    console.log(names);
                    var newName = names[names.length-1];
                    console.log(newName);

                    browser.manage().logs().get('browser').then(function(browserLogs) {
                       // browserLogs is an array of objects with level and message fields
                       browserLogs.forEach(function(log){
                          console.log(log.message);
                        });
                    });

                  });
              });
          });
        // //create a project
        // var createForm = $('#project-crud').$('#create-project');
        // element(by.model('project.name')).clear().sendKeys('plz');
        // element(by.model('project.url')).clear().sendKeys('http://plz.com');
        // element(by.model('project.imgSrc')).clear().sendKeys('https://media.giphy.com/media/CL5FfrZoVR3Gw/giphy.gif');
        // element(by.model('project.date')).clear().sendKeys('5/4/16');
        // element(by.model('project.tags')).clear().sendKeys('plz,respond');
        // element(by.model('project.about')).clear().sendKeys('<p>this is a test</p>');
        // element(by.buttonText('create')).click()
        //   .then(function() {
        //     console.log('button click');
        //     element.all(by.repeater('project in crudCtrl.projects').column('name')).getText()
        //       .then(function(names) {
        //         console.log(names);
        //         var newName = names[names.length-1];
        //         console.log(newName);
        //
        //         browser.manage().logs().get('browser').then(function(browserLogs) {
        //            // browserLogs is an array of objects with level and message fields
        //            browserLogs.forEach(function(log){
        //               console.log(log.message);
        //             });
        //         });
        //
        //       });
        //   });

      });

      it('update me', function() {
        console.log('will update');
      });



    });


  });


})
