<template>
  <div>
    <div class="container">
      <div class="login_div">
        <img alt="Vue logo" src="../assets/logo.png">
        <h1 class="title">Vue. Js Register</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" class="form-control" v-model="input.username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" v-model="input.password">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Re-Type Password</label>
            <input type="password" class="form-control" v-model="input.repassword">
          </div>
          <button type="button" class="btn btn-login" v-on:click="register()">Register</button>
          <small id="emailHelp" class="form-text text-muted">Already have an account? <router-link to="/">Login Here</router-link></small>
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
  name: 'Register',
  props: {
    msg: String
  },
  data(){
    return{
      input:{
        username: '',
        password: '',
        repassword: ''
    },
    info: null
    }
  },
  methods:{
    register(){
      if(this.input.username !='' && this.input.password !='' && this.input.repassword !=''){
        if(this.input.password.length >= 6){
            if(this.input.password == this.input.repassword){
            var encryptedPass = this.CryptoJS.MD5(this.input.password)
            this.$http.get('http://localhost:8080'+'/getuser?username='+this.input.username)
              .then((response) => {
                  this.$http.post('http://localhost:8080'+'/register?username='+this.input.username+'&password='+encryptedPass) //this.$http = axios
                  .then(
                    alert('Registration Success!'),
                    this.info = 'Thank You! :D',
                    this.input.username = '',
                    this.input.password = '',
                    this.input.repassword = '',
                  )
                  return response
              }).catch((error) => {
                  alert('Username Taken!'),
                  this.info = 'Username Taken! :(',
                  this.input.username = '',
                  this.input.password = '',
                  this.input.repassword = '',
                  console.warn('Not good man :(');
                  return error
              })
          }else{
            alert('Password Did Not Match')
          }
        }else{
          alert('Password Must Be 6 Characters or More!')
        }
      }else{
        alert('Field Cannot Be Empty :(')
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

