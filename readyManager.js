ReadyManager = function () {
   this.subGroups = []
}

ReadyManager.prototype = {
   subscriptions: function(data) {
      var self = this

      Tracker.nonreactive(function() {
         var newSubGroups = []

         _.each(data, function(groupData) {
            var group = self.getGroup(groupData.groupName)

            if (group) {
               // update group
               group.ready.set(self.areAllResultsTrue(groupData.subscriptions))
               group.subscriptions = groupData.subscriptions

            } else {
               // create group
               group = {
                  name:groupData.groupName,
                  ready: new ReactiveVar(self.areAllResultsTrue(groupData.subscriptions)),
                  subscriptions:groupData.subscriptions
               }

               // create template helper for group
               // called 'groupnameReady'
               self.createHelper(groupData.groupName)
            }

            newSubGroups.push(group)
         })

         self.subGroups = newSubGroups
      })

   },

   // returns object with ready for each subscription and group
   ready: function(groupName) {
      var self = this

      var group = self.getGroup(groupName)

      if (group) {
         return group.ready.get()
      }

      throw new Meteor.Error('Subscription group '+groupName+' not found.')
   },


   ///////////////////
   // private

   createHelper: function(groupName) {
      var self = this

      if (!Template.instance()) {
            throw new Meteor.Error('No template instance found. Cannot create helper.')
      }

      var templateName = Template.instance().view.name.split('.')[1]
      var helper = {}
      helper[groupName+'Ready'] = function() {return self.ready(groupName)}
      Template[templateName].helpers(helper)
   },

   getGroup: function(groupName) {
      var self = this
      return _.find(self.subGroups, function(g) {
         return g.name == groupName
      })
   },

   areAllResultsTrue: function(resultsArray) {
      return !_.contains(resultsArray, false)
   }
}
