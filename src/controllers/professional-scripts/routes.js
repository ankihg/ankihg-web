page.base('');

page('/', indexController.index);

page('/projects', projectController.loadAll, projectController.index);
page('/about', aboutController.index);

page('/projects/:tags', projectController.loadByTag, projectController.index);
page('*', '/');



page();
