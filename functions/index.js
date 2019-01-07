import functions from 'firebase-functions'

exports.delete = functions.firestore.document('timers').onDelete((snap, context) => {
    console.log(snap, context)
    console.log('ugurlu function')
})