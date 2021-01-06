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

## 请求地址：http://101.37.64.59:8080/user/delete

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

## 分页查找用户

请求地址：http://101.37.64.59:8080/user/findbypage

请求参数：

| 变量名 | 说明           | 是否允许为空 |
| ------ | -------------- | ------------ |
| page   | 页数           | 否           |
| size   | 页面显示数     | 否           |
| userID | 模糊查询用户名 | 是           |

查询成功返回参数：

```
{
  "data": [
    {
      "id": 8,
      "userName": "Ash",
      "openid": "oTLOr5VlplqFA0qmibi-Gick5rLPGKl",
      "area": "浙江 台州",
      "birthday": "2010-01-01",
      "education": "保密",
      "sex": "male",
      "sign": null,
      "deleteFlag": 0
    },
    {
      "id": 9,
      "userName": "hsA",
      "openid": "oTlOrOTRiV0zx-GigBitsLof_MpZy",
      "area": "浙江 台州",
      "birthday": "2010-01-01",
      "education": "保密",
      "sex": "female",
      "sign": null,
      "deleteFlag": 0
    }
  ],
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

## 测试信息全部获取

请求地址：http://101.37.64.59:8080/test/findAll

请求参数：无

查询存在返回参数：

```
{
  "data": [
    {
      "testItemId": 1,
      "testName": "舒尔特方格",
      "testType": "计划",
      "deleteFlag": 0
    },
    ...
  ]
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

## 根据测试id查询

请求地址：http://101.37.64.59:8080/usertotest/findbytestid

请求参数：

| 变量名 | 说明   | 是否允许为空 |
| ------ | ------ | ------------ |
| testID | 用户id | 否           |

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

## 根据用户openID查询

请求地址：http://101.37.64.59:8080/usertotest/findbyopenid

请求参数：

| 变量名     | 说明       | 是否允许为空 |
| ---------- | ---------- | ------------ |
| page       | 页数       | 否           |
| size       | 单页显示数 | 否           |
| userOpenID | 用户openID | 否           |

返回参数：

```
{
  "data": [
    {
      "id": 2,
      "userId": "453534",
      "testId": 1,
      "score": 23432,
      "testNumber": 1,
      "finishTime": "2343",
      "deleteFlag": 0
    },
    {
      "id": 3,
      "userId": "453534",
      "testId": 1,
      "score": 23,
      "testNumber": 2,
      "finishTime": "dfssdfdsf",
      "deleteFlag": 0
    },
    {
      "id": 4,
      "userId": "453534",
      "testId": 2,
      "score": 23,
      "testNumber": 1,
      "finishTime": "dfssdfdsf",
      "deleteFlag": 0
    }
  ]
}
```

## 根据用户openID和测试数查询

请求地址：http://101.37.64.59:8080/usertotest/findbyuseropenidandtestnumber

请求参数：

| 变量名     | 说明       | 是否允许为空 |
| ---------- | ---------- | ------------ |
| testNumber | 测试数     | 否           |
| userOpenID | 用户openID | 否           |

返回参数：

```
{
  "data": [
    {
      "id": 2,
      "userId": "453534",
      "testId": 1,
      "score": 23432,
      "testNumber": 1,
      "finishTime": "2343",
      "deleteFlag": 0
    },
  ]
}
```

## 根据测试ID查询测试各分数分布情况

请求地址：http://101.37.64.59:8080/usertotest/findtestcount

请求参数：

| 变量名 | 说明   | 是否允许为空 |
| ------ | ------ | ------------ |
| testID | 测试ID | 否           |

返回参数：

```
{
  "data": [
    0,
    0,
    3,
    0,
    5,
    0,
    6,
    0,
    4,
    0,
    5
  ]
}
```

## 查找用户最近1次测试详细情况

请求地址：http://101.37.64.59:8080/usertotest/findbyuseropenidandlatesttestnumber

请求参数：

| 变量名     | 说明   | 是否允许为空 |
| ---------- | ------ | ------------ |
| userOpenID | 用户ID | 否           |

返回参数：

```
{
  "test4": 6,
  "p": 12,
  "test5": 2,
  "a": 14,
  "test2": 4,
  "test3": 8,
  "test8": 2,
  "test6": 8,
  "test7": 4,
  "test1": 8,
  "s1": 10,
  "s2": 6
}
```

## 查找用户最近3次测试总得分情况

请求地址：http://101.37.64.59:8080/usertotest/findlatestbyuseropenid

请求参数：

| 变量名     | 说明   | 是否允许为空 |
| ---------- | ------ | ------------ |
| userOpenID | 用户ID | 否           |

返回参数：

```
{
  "data": [
    38,
    34,
    42
  ],
  "time": [
    "2021-01-06 19:58",
    "2021-01-06 19:58",
    "2021-01-06 20:06"
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