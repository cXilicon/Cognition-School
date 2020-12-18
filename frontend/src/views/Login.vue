<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="adminAccount">
      <el-input type="text" v-model="loginForm.adminAccount" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="adminPassword">
      <el-input type="password" v-model="loginForm.adminPassword" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="logining">登 录</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  import Cookies from "js-cookie";
  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        loginForm: {
          adminAccount: '',
          adminPassword: ''
        },
        fieldRules: {
          adminAccount: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          adminPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      login() {
                this.$axios.get('http://101.37.64.59:8080/admin/login',{
								params: {
                                    adminAccount:this.loginForm.adminAccount,
                                    adminPassword:this.loginForm.adminPassword,
                                    
								},headers: {
                                     
										"Content-Type": "application/json;charset=utf-8" //头部信息
									}
							})
							 .then(response => {
                                 if(response.data.port=="400")
                                {
                                    this.$message.error('密码有误');
                                }
                                else if(response.data.port=="500")
                                {
                                  this.$message.error('该账号不存在');
                                }
                                else if(response.data.port=="200"){
                                    this.$message.success('登录成功');
                                    // localStorage.setItem('ms_username', this.param.username);
                                    this.$router.push('/');
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });    
      },
      reset() {
        this.$refs.loginForm.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>