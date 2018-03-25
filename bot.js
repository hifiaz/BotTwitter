const twitter = require('twitter');
const config = require('./auth.js');
const events = require('events');

const connect = new twitter(config)
const eventEmitter = new events.EventEmitter();

const keywords = {track:'#JKT48MelodyDay'};
const steam = connect.stream('statuses/filter', keywords);

const likeTweet = function(tweetId){
    connect.post('favorites/create', tweetId, function(err, response){
        if(err){
            console.log(err);
        }else{
            console.log('Liked! - twee dengan id ='+tweetId.id)
        }
    })
}

eventEmitter.on('like', likeTweet);

steam.on('data', function(data){
    eventEmitter.emit('like', {id:data.id_str});
})
steam.on('error', function(err){
    console.log(err)
})