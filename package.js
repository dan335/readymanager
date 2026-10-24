Package.describe({
  name: 'danimal:readymanager',
  summary: 'Subscription ready manager for Meteor.',
  version: '1.1.0',
  git: 'https://github.com/dan335/readymanager'
});

Package.onUse(function(api) {
  api.versionsFrom(['2.16', '3.0']);
  // readyManager.js uses all of these; before, it worked only in apps that
  // added tracker, underscore and templating themselves
  api.use(['reactive-var', 'tracker', 'underscore'])
  api.use('templating@1.4.0', 'client')
  api.addFiles('readyManager.js');
  api.export('ReadyManager', 'client')
});
