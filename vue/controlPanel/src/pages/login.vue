<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <!-- justify 对齐方式 -->
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
    <!-- justify 对齐方式 -->
          <el-col :span="6">
              <el-card shadow="always" >
                <h1 style="text-align: center;">欢迎登陆</h1>
                <el-divider></el-divider>
                <!-- form表单 -->
                <el-form  :model="nameValidateForm" ref="nameValidateForm" label-width="100px" class="demo-ruleForm">
                  <!-- 用户名 -->
                  <el-form-item
                      label="用户名"
                      prop="adminAccount"
                      :rules="[
                      { required: true, message: '用户名不能为空'},
                      ]"
                  >
                      <el-input placeholder="请输入用户名" type="text" v-model="nameValidateForm.adminAccount" autocomplete="off"></el-input>
                  </el-form-item>

                  <!-- 密码 -->
                  <el-form-item
                      label="密码"
                      prop="adminPassword"
                      :rules="[
                      { required: true, message: '密码不能为空'},
                      ]"
                  >
                      <el-input placeholder="请输入密码" v-model="nameValidateForm.adminPassword" show-password></el-input>
                  </el-form-item>


                  <!-- 按钮 -->
                  <el-form-item>
                      <el-button type="primary" @click="submitForm(
                      )">提交</el-button>
                      <el-button @click="resetForm()">重置</el-button>
                  </el-form-item>
                </el-form>

              </el-card>
          </el-col>
    </el-row>


  </div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios';
    export default {
        data() 
        {
            return {
                nameValidateForm: 
                {
                adminAccount: '',
                adminPassword: '',
                },
                radio: false
            };
        },
        methods: {
           submitForm(){
                	this.$axios.get('http://localhost:8080/admin/login',{
								params: {
                                    adminAccount:this.nameValidateForm.adminAccount,
                                    adminPassword:this.nameValidateForm.adminPassword,
                                    
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
                                    localStorage.setItem('ms_username', this.param.username);
                                    this.$cookies.set("token",response.data.token);
                                    this.$router.push('/');
                                }
                            })
                            .catch(function(error) {
								console.log(error);
                            });    
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
  .el-radio-group{
    display: flex;
    margin: 20px;
    /* 边缘 */
    justify-content: center;
    
  }
  .el-card{
    border-radius:30px;
    width: 380px;
    /* box-shadow: 0 2px 12px 0 rgb(243, 102, 102); */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
  }
  .grid-content {
    /* background: rgb(14, 214, 131); */
    border-radius: 4px;
    min-height: 80px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  /* .el-input{
  width: 250px;  
  } */
  .el-form-item{
  width: 300px;  
  }
</style>