# BFF Graphql API

Graphql + Express setup

Gitlab CI ready
# DEVELOPMENT
### Install & Run

this uses `index.js` at the root to run a local graphql server

```
    npm install
    npm start // this runs the local development server
```

### Playground help for sample api

```

    --- SignUp User ---

    mutation signupUser {
      signupUser( name: "my user", email: "testing@gmail.com", password: "password") {
        token
      }
    }

    ---- Login User ----

    mutation loginUser {
      loginUser( email: "testing@gmail.com", password: "password") {
        token,
        error 
      }
    }

    ---- verify Token ----

    mutation verifyToken {
      verifyToken(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIDEiLCJlbWFpbCI6InRlc3RpbmdAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDQkWEdiYjF3aG40aHBIL0FrRUFJSEN5TzVhalpPMU4yeGdRT3J3L2ozTDdXaXYwa1NvdXhjc0ciLCJpZCI6MTAwLCJpYXQiOjE1ODU0ODcwMDB9.C9ezWI15HNsZAD68us6lL31DdsPFPJ5Xnh9tnb5duFw") {
        name,
        email,
        id
      }
    }

    ---- Query Users ----

    {
      users {
        email
        id
      }
      userById(id: 34) {
        name
      }
    }
```

# DEPLOYMENT

this uses `deploy.js` at the root of the folder

In your CI 

 - install aws cli


install serverless globally
```
    npm install -g serverless
```

Deploy using serverless
```
    serverless deploy --stage dev
    
    or 
    
    serverless deploy --stage prod
```

