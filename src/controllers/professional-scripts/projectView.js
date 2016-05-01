(function(module) {
var projectView = {};

projectView.index = function(ctx) {
  console.log("url tag: " + ctx.params.tag);

  projectView.clearItems();

  projectView.display(ctx);

  // if (ctx.params.tag) {
  //   projectView.displayTag(ctx.params.tag);
  // } else {
  //   projectView.displayAll();
  // }
}

projectView.populateChecklist = function() {
  console.log('populate checklist');
  console.log(Project.allTags());

  Project.allTags().forEach(function(tag) {
    var optionTag = '<div class="col-sm-4"><li><label for="chk1"><input type="checkbox" name="chk1" value="'+tag+'" id="'+tag.split(' ')[0]+'"><img src="media/mtn.png"> '+tag+ ' <small>('+ Project.countProjPerTag(tag) +')</small> <img src="media/tree3_c.png"></label></li></div>';
    $('#tag-checklist').append(optionTag);
  });

  // $('.populated').each(function() {
  //    var val = $(this).data('tags');
  //    val.map(function(tag) {
  //      optionTag = '<div class="col-sm-4"><li><label for="chk1"><input type="checkbox" name="chk1" value="'+tag+'" id="'+tag.split(' ')[0]+'"><img src="media/mtn.png"> '+tag+ ' <small>('+ Project.countProjPerTag(tag) +')</small> <img src="media/tree3_c.png"></label></li></div>';
  //      if ($('#tag-checklist input[value="' + tag + '"]').length === 0) {
  //        $('#tag-checklist').append(optionTag);
  //      }
  //    });
  // });
};

projectView.handleChecklist = function() {
  $('#tag-checklist').on('change', function() {
    console.log('checklist callback');
    resource = "projects"; //this.id.replace('-filter', '');

    var $checkedTags = $(this).find(':checked');

    if (window.location.pathname !== '/') {
      if ($checkedTags.length > 0) {
        // var firstTag = $checkedTags.eq(0).val();
        var tagsStr = "";
        $checkedTags.each(function(i) {
          tagsStr += $checkedTags.eq(i).val().replace(/\W+/g, '+') + '&';
        });
        page('/' + resource + '/' + tagsStr);
        // page('/' + resource + '/' + firstTag.replace(/\W+/g, '-')); // Replace any/all whitespace with a +
      } else { //nothing is checked
        page('/' + resource + '/'); //go to projects page
      }
    } else {
      $('#projects').empty();
      if ($checkedTags.length > 0) {
        $('#projects').show();
        $checkedTags.each(function(t) {
            projectView.displayTag($checkedTags.eq(t).val());
        });
      } else {
        $('#projects').hide();
      }

    }
  });
};

projectView.clearItems = function() {
  $('.populated').remove();
};

projectView.display = function(ctx) {
  ctx.projects.forEach(function(i){
        i.make();
   });
};

projectView.displayTag = function(tag) {
  Project.all.map(function(i){
    // if ($('#projects .row[id="' + i.id + '"]').length === 0) {
     if (i.tags.indexOf(tag) >= 0) {
       i.make();
    }
  // }
 });
};

// projectView.displayAll = function() {
//   console.log('display all');
//   Project.all.forEach(function(i){
//       i.make();
//  });
// };

projectView.initIndexPage = function() {
  projectView.populateChecklist();
  projectView.handleChecklist();
  aboutController.handle();

};


module.projectView = projectView;
})(window);
