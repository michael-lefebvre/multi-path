
// Glorious basic test file  ====================================================
// because real tests are not fun...
// just kidding, don't judge me
// please

global.multiPath = filepath => require('./lib')( __dirname + filepath )

console.log( '\n-[ Directory ]----------------' )
console.log( multiPath('/test') )

console.log( '\n-[ Directory module ]---------' )
console.log( multiPath('/test').User )

console.log( '\n-[ Module function ]----------' )
console.log( multiPath('/test').User.create )

console.log( '\n-[ JSON ]---------------------' )
console.log( multiPath('/test/config') )

console.log( '\n-[ File extension ]----------' )
console.log( multiPath('/test/test.md') )

console.log( '\n-[ Directory has index.js ]--' )
console.log( multiPath('/test/nested') )

console.log( '\n-[ Not found ]----------------' )
try
{
  console.log( multiPath('/test/usertest') )
}
catch( err )
{
  console.log( err.message )
  // console.log( err.stack )
}
