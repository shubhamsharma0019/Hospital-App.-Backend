const express = require('express')

const app = express();

const users = [{
    name:"john",
    kidneys:[{
        healthy:false
    }]
}];
app.use(express.json());


// User can check How many kidneys they have and their health.

app.get('/',function(req,res){
    const johnkidneys = users[0].kidneys;
    const numberOfKidneys =  johnkidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i = 0; i<johnkidneys.length; i++){
        if(johnkidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })
})

// user can add a new Kidneys.

app.post('/',function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done!"
    })
})

// user can replace a kidney , make it healthy.

app.put('/',function(req,res){
    for (let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg:"Done"
    })
})

// user can remove a unhealthykidney.

app.delete("/",function(req,res){
    const newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg:"Done!"
    })
})


app.listen(3000)