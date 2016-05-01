(function(module) {
Education.all = [];

function Education(tmp) {
  this.title = tmp.title;
  this.place = tmp.place;
  this.date = tmp.date;
};

Education.prototype.make = function() {
  $('#contain-education').append(this.toHTML());
}

Education.prototype.toHTML = function() {
  var template = Handlebars.compile($('#education-template').text());


  var html = template(this);
  return html;
};

Education.loadAll = function(rawData) {
  rawData.map(function(elm) {
    Education.all.push(new Education(elm));
  });

  Education.all.map(function(p) {
    p.make();
  });
};

Education.fetchAll = function() {
  if (localStorage.rawDataEdu) {
    Education.checkUpdate();

    Education.loadAll(JSON.parse(localStorage.rawDataEdu)); //DID: What do we pass in here to the .loadAll function?
  } else {
    Education.update();
  }
};

Education.update = function() {
 $.getJSON('/data/educationData.json', function(data, message, xhr) {
    Education.loadAll(data);
    localStorage.rawDataEdu = JSON.stringify(data);
    localStorage.etagEdu = xhr.getResponseHeader('eTag');
  });

};

Education.checkUpdate = function() {
  $.ajax({
  type: 'HEAD',
  url: "/data/educationData.json",
  complete: function(data) {
    var etag = data.getResponseHeader('eTag');
    if (localStorage.etagEdu !== etag) {
      Education.update();
    }
  }
  });
};

module.Education = Education;
})(window);
