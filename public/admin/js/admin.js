// declare a new module called 'myApp', and make it require the `ng-admin` module as a dependency
var myApp = angular.module('myApp', [
  'ng-admin'
]);
// declare a function to run when the module bootstraps (during the 'config' phase)
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('My First Admin')
                .baseApiUrl('/api/');
    var lang = 'ita';

    var me = nga.entity('me');
    // add the user entity to the admin application
    me.editionView().fields([
      nga.field('name'),
      nga.field('surname'),
      nga.field('email'),
      nga.field('telephone'),
      nga.field('address'),
      nga.field('img'),
      nga.field('bio.eng','text'),
      nga.field('bio.ita','text')]);
    me.editionView().url(function() {
      return 'me'; // Can be absolute or relative
    });
    admin.addEntity(me);

    var education = nga.entity('education');
    education.listView().fields([
      nga.field('degree.'+lang).isDetailLink(true),
      nga.field('school.'+lang),
      nga.field('location'),
      nga.field('score.'+lang,'number'),
      nga.field('date.begin','date'),
      nga.field('date.end','date'),
    ]);
    // add the user entity to the admin application
    education.creationView().fields([
      nga.field('location'),
      nga.field('score.eng','number'),
      nga.field('score.ita','number'),
      nga.field('degree.eng'),
      nga.field('degree.ita'),
      nga.field('school.eng'),
      nga.field('school.ita'),
      nga.field('date.begin','date'),
      nga.field('date.end','date'),
    ]);
    education.editionView().fields(education.creationView().fields());
    admin.addEntity(education);

    var experience = nga.entity('experience');
    experience.listView().fields([
      nga.field('company').isDetailLink(true),
      nga.field('location'),
      nga.field('link'),
      nga.field('role.'+lang),
      nga.field('date.begin','date'),
      nga.field('date.end','date'),
    ]);
    // add the user entity to the admin application
    experience.creationView().fields([
      nga.field('company'),
      nga.field('location'),
      nga.field('link'),
      nga.field('info.ita','text'),
      nga.field('info.eng','text'),
      nga.field('role.ita'),
      nga.field('role.eng'),
      nga.field('date.begin','date'),
      nga.field('date.end','date'),
    ]);
    experience.editionView().fields(experience.creationView().fields());
    admin.addEntity(experience);

    var projectscat = nga.entity('projectscat');
    projectscat.listView().fields([
      nga.field('name.'+lang).isDetailLink(true)
    ]);
    // add the user entity to the admin application
    projectscat.creationView().fields([
      nga.field('name.eng'),
      nga.field('name.ita')
    ]);
    projectscat.editionView().fields(projectscat.creationView().fields());
    admin.addEntity(projectscat);

    var projects = nga.entity('projects');
    projects.listView().fields([
      nga.field('name').isDetailLink(true),
      nga.field('category','reference')
        .label('Category')
        .targetEntity(projectscat)
        .targetField(nga.field('name.'+lang)),
      nga.field('date.begin','date'),
      nga.field('date.end','date'),
    ]);
    // add the user entity to the admin application
    projects.creationView().fields([
      nga.field('name'),
      nga.field('info.ita','text'),
      nga.field('info.eng','text'),
      nga.field('link'),
      nga.field('category','reference')
        .label('Category')
        .targetEntity(projectscat)
        .targetField(nga.field('name.'+lang)),
      nga.field('date.begin','date'),
      nga.field('date.end','date')
    ]);
    projects.editionView().fields(projects.creationView().fields());
    admin.addEntity(projects);

    var skillscat = nga.entity('skillscat');
    skillscat.listView().fields([
      nga.field('name.'+lang).isDetailLink(true)
    ]);
    // add the user entity to the admin application
    skillscat.creationView().fields([
      nga.field('name.eng'),
      nga.field('name.ita')
    ]);
    skillscat.editionView().fields(skillscat.creationView().fields());
    admin.addEntity(skillscat);

    var skills = nga.entity('skills');
    skills.listView().fields([
      nga.field('name.'+lang).isDetailLink(true),
      nga.field('category','reference')
        .label('Category')
        .targetEntity(skillscat)
        .targetField(nga.field('name.'+lang)),
      nga.field('point','number')
    ]);
    // add the user entity to the admin application
    skills.creationView().fields([
      nga.field('name.ita'),
      nga.field('name.eng'),
      nga.field('point','number'),
      nga.field('category','reference')
        .label('Category')
        .targetEntity(skillscat)
        .targetField(nga.field('name.'+lang))
    ]);
    skills.editionView().fields(skills.creationView().fields());
    admin.addEntity(skills);

    admin.menu(nga.menu()
        .addChild(nga.menu()
            .title('Me')
            .link('/me/edit/')
            .active(function(path) {
                return path.indexOf('/stats') === 0;
            })
        )
        .addChild(nga.menu(education))
        .addChild(nga.menu(experience))
        .addChild(nga.menu().title('Projects')
                  .addChild(nga.menu(projectscat).title('category'))
                  .addChild(nga.menu(projects).title('list')))
        .addChild(nga.menu().title('Skills')
                  .addChild(nga.menu(skillscat).title('category'))
                  .addChild(nga.menu(skills).title('list')))
    );

    nga.configure(admin);
}]);
