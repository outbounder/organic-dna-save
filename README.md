# organic-dna-save

Save existing inmemory dna structure within a folder respecting existing structure

## Notes

* this is synchronious implementation
* destination folder and files structure are overriden

## api

### var save = require("organic-dna-save")
### save( dna, destinationFolderPath, function(err){ ... })

## usage

    var DNA = {
      processes: {
        index: {
          plasma: {

          },
          membrane: {

          }
        }
      }
    }

    save(DNA, path.join(process.cwd(), "dna"), function(err){
      // ...
    })