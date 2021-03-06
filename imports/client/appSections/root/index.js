//new urls.js
import { Meteor } from 'meteor/meteor'
import { Cash } from '/imports/db/cash.js'
import { Transaction } from '/imports/db/transaction.js'
import './templates.js'

Router.route('/', {
  name: 'root',
  layoutTemplate: 'home',
  yieldRegions: {
    'login': {to: 'loginRegion'},
    'register': {to: 'registerRegion'},
    'cashList': {to: 'cashListRegion'},
    'summary': {to: 'summaryRegion'}
  },
  subscriptions: function(){
    this.subscribe('Cash', Meteor.userId()).wait()
    this.subscribe('Transaction', Meteor.userId()).wait()
  },
  data: function(){
    var cashCursor = Cash.find({})
    var hasCash = cashCursor.count()
    var transactionCursor = Transaction.find({}, {sort: {tra_date: -1}, limit: 50})
    var hasTransaction = transactionCursor.count()
    return {cash: cashCursor,
            hasCashHelper: hasCash,
            generalTransaction: transactionCursor,
            hasTransactionHelper: hasTransaction}
  }
})
