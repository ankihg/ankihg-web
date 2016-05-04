'use strict';
const jwtAuth = require('../lib/jwt_auth');
module.exports = (router, models) => {

  const Project = models.Project;

  router.route('/projects')
    .get((req, res) => {
      Project.find({}, (err, projects) => {
        if (err) return res.status(500).json({msg: 'error retrieving projects', err:err, data:null});
        return res.status(200).json({msg: 'all projects', err:null, data:projects});
      })
    })
    .post(jwtAuth, (req, res) => {
      var newProject = new Project(req.body);
      newProject.save((err, project) => {
        if (err) return res.status(500).json({msg: 'error creating project', err:err, data:null});
        return res.status(200).json({msg: 'created project', err:null, data:project});
      })
    });

    router.route('/projects/:id')
      .put(jwtAuth, (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, project) => {
          if (err) return res.status(500).json({msg: 'error updating project', err:err, data:null});
          return res.status(200).json({msg: 'updated project', err:null, data:project});
        });
      })
      .delete(jwtAuth, (req, res) => {
        Project.findByIdAndRemove(req.params.id, (err) => {
          if (err) return res.status(500).json({msg: 'error deleting project', err:err, data:null});
          return res.status(200).json({msg: 'project deleted', err:null, data:null});
        });
      })

}
