Subscription ready manager for Meteor
---

Give it your subscriptions and it will create a helper that will be true when your subscriptions are all ready.


Example
----

    // the helpers animalsReady and booksReady are automatically created
    // they will be true when all of the subscriptions in the their group are ready
    
    <template name="hello">
        {{#if animalsReady}}
            subscription group animals is ready
        {{else}}
            subscription group animals is NOT ready
        {{/if}}
    </template>


    Bears = new Mongo.Collection('bears')
    Bees = new Mongo.Collection('bees')
    Books = new Mongo.Collection('books')
    
    
    if (Meteor.isClient) {
        var subs = new ReadyManager()
        
        Template.hello.created = function() {
            this.autorun(function() {
                subs.subscriptions([{
                   groupName: 'animals',
                   subscriptions: [
                        Meteor.subscribe('bears').ready(),
                        Meteor.subscribe('bees').ready()
                    ]
                }, {
                	groupName:'books',
                	subscriptions: [
                		Meteor.subscribe('books').ready()
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
        Meteor.publish('books', function() {
        	return Books.find()
        })
    }
