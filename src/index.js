const fs   = require('fs')
    , path = require('path')
    , ext  = [ '.js', '.json' ]

const isFile = filePath =>
{
  try
  {
    if( fs.statSync( filePath ) )
      return filePath
  }
  catch( e ) { return false }
}

module.exports = function multipath( pathString )
{
  try
  {
    var isDir = fs.lstatSync( pathString ).isDirectory()

    // file path with extension
    if( !isDir && isFile( pathString ) )
      return require( pathString )
  }
  catch( err )
  {
    var filename = ext.filter( e => isFile(`${pathString}${e}`) )

    if( filename.length === 1 )
      return require( `${pathString}${filename[0]}` )

    throw new Error(`'${pathString}' is not a directory or a file`)
  }

  // last check
  if( !isDir )
    throw new Error(`'${pathString}' is not a directory or a file`)
  else
  {
    // if directory has an `index.js` file
    if( isFile( `${pathString}/index.js` ) )
      return require( `${pathString}/index.js` )
  }

  const modules  = {}

  fs
    .readdirSync( pathString )
    .filter( file => file.indexOf('.') !== 0 )
    .forEach( file =>
    {
      if( file.slice(-3) !== '.js' )
        return

      var namespace = ( fname =>
          {
            var splited = fname.toLowerCase().split(/[-_]/g)
              , reponse = []

            splited.forEach( w => reponse.push( w.charAt(0).toUpperCase() + w.slice(1) ) )

            return reponse.join('')

          })( file.slice( 0, -3 ) )

      modules[ namespace ] = require( path.join( pathString, file ) )
    })

  return modules
}
