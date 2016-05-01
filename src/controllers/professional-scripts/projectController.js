(function(module) {
  var projectController = {};

  Project.fetchAll(projectView.initIndexPage);

projectController.index = function(ctx, next) {
    console.log('projectController index')

    ui();
    projectView.index(ctx);

  };

  function ui() {
    Tree.loadTrees();

    $('#contain-education').hide();
    $('#contain-technical-skills').hide();
    $('#about').hide();

    $('#projects').show();
    $('.contain-checklist').show();
  };

projectController.loadAll = function(ctx, next) {
  ctx.projects = Project.all;
  next();
};

projectController.loadByTag = function(ctx, next) {
  var selectedTags = ctx.params.tags.split('&');
  console.log(selectedTags);

  ctx.projects = Project.all.filter(function(p) {
    var addProject = false;
    selectedTags.forEach(function(selectedTag) {
      if (p.tags.indexOf(selectedTag) >= 0) {
        addProject = true;
      }
    });
    return addProject;
  });

  // ctx.projects = Project.all.filter(function(p) {
  //   return (p.tags.indexOf(ctx.params.tags) >= 0)
  // });
  next();
};


  module.projectController = projectController;
})(window);
