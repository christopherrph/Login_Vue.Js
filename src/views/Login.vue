<template>
  <div>
    <div class="container">
      <div class="login_div">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 class="title">{{msg}}</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input name="username" v-model="input.username" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" name="password" v-model="input.password" class="form-control">
          </div>
          <button type="button" class="btn btn-login" v-on:click="login()">Login</button>
          <br/>
          <small id="emailHelp" class="form-text text-muted">Don't have an account? <router-link to="/register">Register Here</router-link></small>
        </form>
        <div id="app">
          {{ info }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data(){
    return {
      input: {
        username: "",
        password: ""
      },
      info: null
    }},
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        this.$http.get('http://localhost:8080/getuser?username='+this.input.username)
              .then((res) => {
                  this.info = 'Account Not Found!',
                  alert('Account Not Found!');
                  return res
              }).catch((res) => {
                var username = this.input.username;
                var password = this.input.password;
                  this.$http.post('http://localhost:8080/login',{
                    username,
                    password,
                  })
                  .then((res) => {
                      this.info = 'Login Success! :D',
                      alert('Login Success!');
                      return res
                    }
                  )
                  .catch((error) => {
                  this.info = 'Wrong Username or Password! :(',
                  alert('Wrong Username or Password! :('),
                  console.warn('Not good man :(');
                  return error
                  }
                  )
                  return res
              })
      } 
      else {
        alert('Username or Password cannot be empty :(')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.title{
  font-weight: 600;
  margin-bottom: 30px;
}

.login_div{
  margin: auto;
  width: 50%;
  border: 3px solid #41B883;
  border-radius: 10px;
  padding: 30px;
}

.btn-login {
  color: #fff;
  background-color: #41B883;
  border-color: #41B883;
  margin-bottom: 10px;
}

.btn-login:hover {
  transition: 0.5s;
  color: #fff;
  background-color: #35495E;
  border-color: #35495E;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

