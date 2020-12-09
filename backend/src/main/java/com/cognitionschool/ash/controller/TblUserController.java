package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPObject;
import com.cognitionschool.ash.Service.TblUserService;
import com.cognitionschool.ash.entity.AdminEntity;
import com.cognitionschool.ash.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
@Transactional
@RestController
@CrossOrigin
@RequestMapping(value="/user")
public class TblUserController {
    @Autowired
    TblUserService tblUserService;
    @RequestMapping(value="/login",method= RequestMethod.GET)
    public JSONObject loginUser(@RequestParam(value = "openid") String openID){
        UserEntity userEntity  = tblUserService.findByOpenID(openID);
        JSONObject result=new JSONObject();
        if (userEntity == null)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("id",userEntity.getId());
            result.put("area",userEntity.getArea());
            result.put("birthday",userEntity.getBirthday());
            result.put("education",userEntity.getEducation());
            result.put("sex",userEntity.getSex());
            result.put("sign",userEntity.getSign());
            result.put("userName",userEntity.getUserName());
            return result;
        }
    }

    @RequestMapping(value="/delete",method= RequestMethod.GET)
    public JSONObject deleteUser(@RequestParam(value = "openid") String openID)
    {
        JSONObject result=new JSONObject();
        tblUserService.deleteUser(openID);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/add",method= RequestMethod.POST)
    public JSONObject addUser(@RequestParam(value = "openID")String openID,
                              @RequestParam(value = "userName")String userName,
                              @RequestParam(value = "area")String area,
                              @RequestParam(value = "birthday")String birthday,
                              @RequestParam(value = "education")String education,
                              @RequestParam(value = "sex")String sex,
                              @RequestParam(value = "sign")String sign)
    {
        JSONObject result=new JSONObject();
        tblUserService.addUser(openID,userName,area,birthday,education,sex,sign);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/modify",method= RequestMethod.POST)
    public JSONObject modifyUser(@RequestParam(value = "openID")String openID,
                              @RequestParam(value = "userName")String userName,
                              @RequestParam(value = "area")String area,
                              @RequestParam(value = "birthday")String birthday,
                              @RequestParam(value = "education")String education,
                              @RequestParam(value = "sex")String sex,
                              @RequestParam(value = "sign")String sign)
    {
        JSONObject result=new JSONObject();
        tblUserService.modifyUser(userName,area,birthday,education,sex,sign,openID);
        result.put("port","200");
        return result;
    }
}
