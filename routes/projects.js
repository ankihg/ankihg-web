'use strict';
module.exports = (router, models) => {

  const Project = models.Project;

  router.route('/projects')
    .get((req, res) => {
      Project.find({}, (err, projects) => {
        if (err) return res.status(500).json({msg: 'error retrieving projects', err:err, data:null});
        return res.status(200).json({msg: 'all projects', err:null, data:projects});
      })
    })
    .post((req, res) => {
      var newProject = new Project(req.body);
      newProject.save((err, project) => {
        if (err) return res.status(500).json({msg: 'error creating project', err:err, data:null});
        return res.status(200).json({msg: 'created project', err:null, data:project});
      })
    })

}
