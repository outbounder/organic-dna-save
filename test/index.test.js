var path = require("path")
var expect = require("chai").expect
var rmdir = require("rimraf")
var cp = require("cp-r")
var mkdirp = require("mkdirp")
var save = require("../index")


var DNA = require("organic-dna")
var loadDir = require("organic-dna-fsloader").loadDir

describe("index test", function(){
  var predefinedDNA = path.join(__dirname, "playground", "dna")

  var destEmpty = path.join(__dirname, "-runtime", "dna") 
  var destPredefined = path.join(__dirname, "-runtime", "dnaPredefined") 

  before(function(next){
    mkdirp(destEmpty, function(err){
      if(err) return next(err)
      mkdirp(destPredefined, function(err){
        if(err) return next(err)
        cp(predefinedDNA, destPredefined).read(next)
      })  
    })
  })

  after(function(next){
    rmdir(path.join(__dirname, "-runtime"), next)
  })
  
  it("saves properly over empty folder", function(next){
    save({
      processes: {
        index: {
          plasma: {

          },
          membrane: {

          }
        }
      }
    }, destEmpty, function(err){
      expect(err).not.to.exist
      var dna = new DNA()
      loadDir(dna, destEmpty, function(err){
        expect(err).not.to.exist
        expect(dna.processes.index.plasma).to.exist
        expect(dna.processes.index.membrane).to.exist
        next()
      })
    })
  })

  it("saves over predefined folder structure", function(next){
    save({
      processes: {
        index: {
          plasma: {
            test: true
          },
          membrane: {
            test: true
          }
        }
      },
      public: {
        "public": [],
        "public/templates": []
      }
    }, destPredefined, function(err){
      expect(err).not.to.exist
      var dna = new DNA()
      loadDir(dna, destPredefined, function(err){
        expect(err).not.to.exist
        expect(dna.processes.index.plasma.test).to.be.equal(true)
        expect(dna.processes.index.membrane.test).to.be.equal(true)
        expect(dna.public.public.length).to.be.equal(0)
        expect(dna.public["public/templates"].length).to.be.equal(0)
        next()
      })
    })
  })
})