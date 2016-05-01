(function(module) {
Project.all = [];

function Project(tmp) {
  this.name = tmp.name;
  this.imgSrc = tmp.imgSrc;
  this.date = tmp.date;
  this.about = tmp.about;
  this.url = tmp.url;
  this.tags = tmp.tags;
};

Project.prototype.make = function() {
  $('#projects').append(this.toHTML());
  this.handleJQuery();
}

Project.prototype.toHTML = function() {
  var template = Handlebars.compile($('#project-template').text());

 this.id = this.name.split(' ')[0];

 this.hashtags = this.tags.map(function(tag) {
   return ' #'+ tag.replace(/ /g, '_');
 });


  var html = template(this);
  return html;
};

Project.prototype.handleJQuery = function() {
  var $project = $('#'+this.id);
  $project.data('tags', this.tags);
  $project.addClass('populated');
};

Project.loadAll = function(rawData) {
  Project.all = [];
  $('#projects').empty();
  $('#tag-checklist :checked').removeAttr('checked');


  rawData.map(function(elm) {
    Project.all.push(new Project(elm));
    console.log('project created and pushed');
  });

  // Project.all.map(function(p) {
  //   p.make();
  // });
};

Project.fetchAll = function(callNext) {
  if (localStorage.rawData) {
    Project.checkUpdate(callNext); //calls load all either way
    // projectView.initIndexPage();
  } else {
    Project.update(callNext);
    // projectView.initIndexPage();
  }
};

Project.update = function(callNext) {
  console.log('update');
 $.getJSON('/data/projectData.json', function(data, message, xhr) {
    Project.loadAll(data);
    localStorage.rawData = JSON.stringify(data);
    localStorage.etag = xhr.getResponseHeader('eTag');
    callNext();
  });

};

Project.checkUpdate = function(callNext) {
  console.log('check update');
  $.ajax({
  type: 'HEAD',
  url: "/data/projectData.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.etag !== etag) {
      Project.update(Project.loadAll(JSON.parse(localStorage.rawData)));
    } else {
      Project.loadAll(JSON.parse(localStorage.rawData));
      callNext();
    }
  }
  });
};

Project.countProjPerTag = function(tag) {
  return Project.all.filter(function(p) {
    if (p.tags.indexOf(tag) >= 0) {
      return true;
    }
  }).length;
};

Project.allTags = function(tag) {

  return Project.all.map(function(p) {
    return p.tags;
  }).reduce(function(uniqueTags, projectTags) {
    projectTags.filter(function(tag) {
      return uniqueTags.indexOf(tag) < 0;
    }).forEach(function (tag) {
      uniqueTags.push(tag);
    });
    return uniqueTags;
  }, []);

};


  module.Project = Project;
})(window);
