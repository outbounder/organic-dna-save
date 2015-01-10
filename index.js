var fs = require("fs")
var path = require("path")

module.exports = function(dna, dest, done) {
  try {
    for(var key in dna) {
      if(typeof dna[key] == "function") continue
      var target = path.join(dest,key)
      if(fs.existsSync(target)) {
        if(fs.lstatSync(target).isDirectory())
          module.exports(dna[key], target)
        else
          fs.writeFileSync(target, JSON.stringify(dna[key], null, 2))
        continue
      } else {
        fs.writeFileSync(path.join(dest, key+".json"), JSON.stringify(dna[key], null, 2))
      }
    }
  } catch(err){
    if(done) 
      return done(err)
    else 
      throw err
  }
  if(done)
    done()
}