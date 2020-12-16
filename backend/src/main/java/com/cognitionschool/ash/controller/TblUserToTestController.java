package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblUserToTestService;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Transactional
@RestController
@CrossOrigin
@RequestMapping(value="/usertotest")
public class TblUserToTestController {
    @Autowired
    TblUserToTestService tblUserToTestService;
    @RequestMapping(value="/findbyid",method= RequestMethod.GET)
    public JSONObject findByID(@RequestParam(value = "id") int ID){
        UserToTestEntity userToTestEntity  = tblUserToTestService.findByID(ID);
        JSONObject result=new JSONObject();
        if (userToTestEntity== null)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("id",userToTestEntity.getId());
            result.put("testID",userToTestEntity.getTestId());
            result.put("testNumber",userToTestEntity.getTestNumber());
            result.put("score",userToTestEntity.getScore());
            result.put("finishTime",userToTestEntity.getFinishTime());
            return result;
        }
    }

    @RequestMapping(value="/findbyuserid",method= RequestMethod.GET)
    public JSONObject findByUserID(@RequestParam(value = "userID") String userID){
        List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByUserID(userID);
        JSONObject result=new JSONObject();
        if (userToTestEntity== null)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("data",userToTestEntity);
            return result;
        }
    }

    @RequestMapping(value="/add",method= RequestMethod.POST)
    public JSONObject addUserRecord(@RequestParam(value = "userID")String userID,
                              @RequestParam(value = "testID")int testID,
                              @RequestParam(value = "score")double score,
                              @RequestParam(value = "finishTime")String finishTime)
    {
        JSONObject result=new JSONObject();
        int testNumber = tblUserToTestService.findMaxTestNumber(userID,testID);
        tblUserToTestService.addRecord(userID, testID, testNumber, score, finishTime);
        result.put("port","200");
        return result;
    }
}
