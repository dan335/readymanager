Package.describe({
  name: 'danimal:readymanager',
  summary: 'Subscription ready manager for Meteor.',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('reactive-var')
  api.addFiles('readyManager.js');
  api.export('ReadyManager', 'client')
});
