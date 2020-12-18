package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblUserService;
import com.cognitionschool.ash.entity.UserEntity;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
            result.put("port","200");
            result.put("data",userEntity);
            return result;
        }
    }




    @RequestMapping(value="/findbypage",method= RequestMethod.GET)
    public JSONObject findByPage(@RequestParam(value = "page")int page,
                                 @RequestParam(value = "size")int size,
                                 @RequestParam(value = "userID")String userID)
    {
        List<UserEntity> userEntityList  = tblUserService.findByAll(userID);
        List<UserEntity> newUserList = new ArrayList<>();
        int begin = (page-1)*size;
        int end = page * size;
        JSONObject result=new JSONObject();
        if (begin >= userEntityList.size())
        {
            result.put("port","500");
            return result;
        }
        if (end > userEntityList.size())
            end = userEntityList.size();
        for (int i = begin ; i< end ; i++)
        {
            newUserList.add(userEntityList.get(i));
        }
        result.put("data",newUserList);
        result.put("size",userEntityList.size());
        return result;
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
                              @RequestParam(value = "area",required=false)String area,
                              @RequestParam(value = "birthday",required=false)String birthday,
                              @RequestParam(value = "education",required=false)String education,
                              @RequestParam(value = "sex",required=false)String sex,
                              @RequestParam(value = "sign",required=false)String sign)
    {
        JSONObject result=new JSONObject();
        tblUserService.addUser(openID,userName,area,birthday,education,sex,sign);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/modify",method= RequestMethod.POST)
    public JSONObject modifyUser(@RequestParam(value = "openid")String openID,
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
