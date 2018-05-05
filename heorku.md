## Heroku Deployment Steps

* heroku -v
* heroku login (Optional)
* heroku create
* setup remote git repo


## Making App heroku compliant
* Dynamic port binding 
```
const PORT = process.env.PORT || 5000;
```

* Specify Node Env
```
Inside package.json

  "engines": {
    "node": "8.1.1",
    "npm": "5.0.3"
  }
```

* specify start script
```
Inside package.json

"start": "node index.js",
```

* create .gitignore