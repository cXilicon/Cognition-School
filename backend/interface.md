# 用户登录注册

## 登录

请求地址：http://101.37.64.59:8080/user/login

请求参数：

| 变量名 | 说明       | 是否允许为空 |
| ------ | ---------- | ------------ |
| openid | 用户openid | 否           |

账号存在返回JSON数据：

```
{
  "data": {
    "id": 2,
    "area": "area",
    "birthday": "2020-12-06",
    "deleteFlag": 0,
    "education": "大学",
    "openid": "sb222",
    "sex": "男",
    "sign": "呼呼呼呼",
    "userName": "sb"
  },
  "port": "200"
}
```

账号不存在返回JSON数据：

```
{
  "port": "500"
}
```

## 添加用户

请求地址：http://101.37.64.59:8080/user/add

请求参数：

| 变量名    | 说明           | 是否允许为空 |
| --------- | -------------- | ------------ |
| openid    | 用户openid     | 否           |
| userName  | 用户名         | 否           |
| area      | 用户地区       | 是           |
| birthday  | 用户生日       | 是           |
| education | 用户受教育程度 | 是           |
| sex       | 用户性别       | 是           |
| sign      | 用户签名       | 是           |

注册成功返回数据：

```
{
  "port": "200"
}
```

## 删除用户

请求地址：http://101.37.64.59:8080/user/delete

请求参数：

| 变量名 | 说明       | 是否允许为空 |
| ------ | ---------- | ------------ |
| openid | 用户openid | 否           |

删除成功返回数据：

```
{
  "port": "200"
}
```

## 修改用户信息

请求地址：http://101.37.64.59:8080/user/modify

请求参数：

| 变量名    | 说明           | 是否允许为空 |
| --------- | -------------- | ------------ |
| openid    | 用户openid     | 否           |
| userName  | 用户名         | 否           |
| area      | 用户地区       | 是           |
| birthday  | 用户生日       | 是           |
| education | 用户受教育程度 | 是           |
| sex       | 用户性别       | 是           |
| sign      | 用户签名       | 是           |

修改成功返回参数：

```
{
  "port": "200"
}
```

# 测试管理

## 测试信息获取

请求地址：http://101.37.64.59:8080/test/get

请求参数：

| 变量名     | 说明     | 是否允许为空 |
| ---------- | -------- | ------------ |
| testItemID | 测试编号 | 否           |

查询为空返回参数：

```
{
  "port": "500"
}
```

查询存在返回参数：

```
{
  "data": {
    "testItemId": 1,
    "deleteFlag": 0,
    "testName": "PASS",
    "testType": "P"
  }
}
```

## 测试信息添加：

请求地址：http://101.37.64.59:8080/test/add

请求参数：

| 变量名   | 说明     | 是否允许为空 |
| -------- | -------- | ------------ |
| testName | 测试名   | 否           |
| testType | 测试类型 | 否           |

添加成功返回参数：

```
{
  "port": "200"
}
```

## 测试信息删除：

请求地址：http://101.37.64.59:8080/test/delete

请求参数：

| 变量名     | 说明   | 是否允许为空 |
| ---------- | ------ | ------------ |
| testItemID | 测试号 | 否           |

删除成功返回参数：

```
{
  "port": "200"
}
```

## 测试信息修改：

请求地址：http://101.37.64.59:8080/test/modify

请求参数：

| 变量名     | 说明     | 是否允许为空 |
| ---------- | -------- | ------------ |
| testItemID | 测试号   | 否           |
| testName   | 测试名   | 否           |
| teseType   | 测试类型 | 否           |

修改成功返回参数：



# 测试6题库管理

## 根据题号查询

请求地址：http://101.37.64.59:8080/test6/getbyid

请求参数：

| 变量名 | 说明   | 是否允许为空 |
| ------ | ------ | ------------ |
| id     | 测试号 | 否           |

查询成功返回参数：

```
{
  "data": {
    "id": 1,
    "choice1": "aaa",
    "choice2": "aaaa",
    "choice3": "aaaaa",
    "choice4": "b",
    "choice5": "bb",
    "choice6": "bbb",
    "deleteFlag": 0,
    "level": 1,
    "questionImgAddress": "aa"
  }
}
```

## 根据难度查询

请求地址：http://101.37.64.59:8080/test6/getbylevel

请求参数：

| 变量名 | 说明 | 是否允许为空 |
| ------ | ---- | ------------ |
| level  | 难度 | 是           |

查询成功根据难度返回相应数量的题目：

```
{
  "data": [
    {
      "id": 2,
      "choice1": "bbbb",
      "choice2": "bbbbb",
      "choice3": "bbbb",
      "choice4": "c",
      "choice5": "cc",
      "choice6": "ccc",
      "deleteFlag": 0,
      "level": 1,
      "questionImgAddress": "bb"
    },
    {
      "id": 1,
      "choice1": "aaa",
      "choice2": "aaaa",
      "choice3": "aaaaa",
      "choice4": "b",
      "choice5": "bb",
      "choice6": "bbb",
      "deleteFlag": 0,
      "level": 1,
      "questionImgAddress": "aa"
    }
  ]
}
```

## 增加题库

请求地址：http://101.37.64.59:8080/test6/add

请求参数：

| 变量名             | 说明         | 是否允许为空 |
| ------------------ | ------------ | ------------ |
| questionImgAddress | 问题图片地址 | 否           |
| choice1            | 选项1        | 否           |
| choice2            | 选项2        | 否           |
| choice3            | 选项3        | 否           |
| choice4            | 选项4        | 否           |
| choice5            | 选项5        | 否           |
| choice6            | 选项6        | 否           |
| level              | 难度         | 否           |

添加成功：

```
{
  "port": "200"
}
```

## 删除题库

请求地址：http://101.37.64.59:8080/test6/add

请求参数：

| 变量名 | 说明   | 是否允许为空 |
| ------ | ------ | ------------ |
| id     | 测试号 | 否           |

删除成功：

```
{
  "port": "200"
}
```

## 修改题库

请求地址：http://101.37.64.59:8080/test6/modify

请求参数：

| 变量名             | 说明         | 是否允许为空 |
| ------------------ | ------------ | ------------ |
| id                 | 测试号       | 否           |
| questionImgAddress | 问题图片地址 | 否           |
| choice1            | 选项1        | 否           |
| choice2            | 选项2        | 否           |
| choice3            | 选项3        | 否           |
| choice4            | 选项4        | 否           |
| choice5            | 选项5        | 否           |
| choice6            | 选项6        | 否           |
| level              | 难度         | 否           |

修改成功：

```
{
  "port": "200"
}
```

# 测试记录管理

## 根据记录编号查询

请求地址：http://101.37.64.59:8080/usertotest/findbyid

请求参数：

| 变量名 | 说明     | 是否允许为空 |
| ------ | -------- | ------------ |
| id     | 记录编号 | 否           |

返回参数：

```
{
  "score": 89.3,
  "finishTime": "2020-12-06",
  "testNumber": 1,
  "testID": 1,
  "id": 1
}
```

## 根据用户id查询

请求地址：http://101.37.64.59:8080/usertotest/findbyuserid

请求参数：

| 变量名 | 说明   | 是否允许为空 |
| ------ | ------ | ------------ |
| userID | 用户id | 否           |

返回参数:

```
{
  "data": [
    {
      "id": 1,
      "deleteFlag": 0,
      "finishTime": "2020-12-10 14:46:45",
      "score": 89.3,
      "testId": 1,
      "testNumber": 1,
      "userId": 1
    },
    {
      "id": 2,
      "deleteFlag": 0,
      "finishTime": "2020-12-11 14:47:00",
      "score": 78.5,
      "testId": 2,
      "testNumber": 1,
      "userId": 1
    }
  ]
}
```

## 添加测试记录

请求地址：http://101.37.64.59:8080/usertotest/add

请求参数：

| 变量名     | 说明         | 是否允许为空 |
| ---------- | ------------ | ------------ |
| userID     | 用户id       | 否           |
| testID     | 测试id       | 否           |
| score      | 测试分数     | 否           |
| finishTime | 测试完成时间 | 否           |

返回参数：

```
{
  "port": "200"
}
```