Subscription ready manager for Meteor
---



Example

   <template name="hello">
      {{#if fooReady}}
         subscription group foo is ready
      {{else}}
         subscription group foo is NOT ready
      {{/if}}
   </template>


   Bears = new Mongo.Collection('bears')
   Bees = new Mongo.Collection('bees')

   if (Meteor.isClient) {
      var subs = new ReadyManager()

      Template.hello.created = function() {
         this.autorun(function() {
            subs.subscriptions([{
               groupName: 'foo',
               subscriptions: [
                  Meteor.subscribe('bears').ready(),
                  Meteor.subscribe('bees').ready()
               ]
            }])
         })
      }
   }

   if (Meteor.isServer) {
      Meteor.publish('bears', function() {
         return Bears.find()
      })

      Meteor.publish('bees', function() {
         return Bees.find()
      })
   }
