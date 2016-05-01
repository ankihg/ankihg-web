(function(module) {
  var indexController = {};

  indexController.index = function() {
    console.log('indexController index');
    ui();
  };

  function ui() {
    // Tree.loadTrees();

    $('#contain-education').show();
    $('#contain-technical-skills').show();

    $('.contain-checklist').show();
    $('#projects').hide();

    $('#about').show();
    $('main').show();

    $('#tag-checklist :checked').removeAttr('checked');
  }

  module.indexController = indexController;
})(window);
