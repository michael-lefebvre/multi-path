
// Glorious basic test file  ====================================================
// because real tests are not fun...
// just kidding, don't judge me
// please

global.multiPath = ( filepath, ext ) => require('./lib')( __dirname + filepath, ext )

console.log( '-[ Directory ]----------------' )
console.log( multiPath('/test') )

console.log( '-[ Directory module ]---------' )
console.log( multiPath('/test').User )

console.log( '-[ Module function ]----------' )
console.log( multiPath('/test').User.create )

console.log( '-[ JSON ]---------------------' )
console.log( multiPath('/test/config') )

console.log( '-[ File extension ]----------' )
console.log( multiPath('/test/test', 'md') )

console.log( '-[ Not found ]----------------' )
try
{
  console.log( multiPath('/test/usertest') )
}
catch( err )
{
  console.log( err.message )
  // console.log( err.stack )
}
