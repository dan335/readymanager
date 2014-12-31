Package.describe({
  name: 'danimal:readymanager',
  summary: 'Subscription ready manager for Meteor.',
  version: '1.0.1',
  git: 'https://github.com/dan335/readymanager'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.use('reactive-var')
  api.addFiles('readyManager.js');
  api.export('ReadyManager', 'client')
});
