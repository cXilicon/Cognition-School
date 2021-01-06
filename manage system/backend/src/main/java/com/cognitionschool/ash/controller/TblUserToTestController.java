package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblUserToTestService;
import com.cognitionschool.ash.entity.UserTestRecordEntity;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @RequestMapping(value="/findbyuseropenid",method= RequestMethod.GET)
    public JSONObject findByUserOpenID(@RequestParam(value = "userOpenID") String userID,
                                       @RequestParam(value = "page")int page,
                                       @RequestParam(value = "size")int size){
        int maxTestNumber = tblUserToTestService.findMaxTestNumber(userID,1)-1;
        List<UserTestRecordEntity> listUserTestRecordEntity = new ArrayList<>();
        for (int i=1;i<=maxTestNumber;i++)
        {
            UserTestRecordEntity userTestRecordEntity = new UserTestRecordEntity();
            userTestRecordEntity.setTestNumber(i);
            List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByUserIDAndTestNumber(userID,i);
            userTestRecordEntity.setTestTime(userToTestEntity.get(0).getFinishTime());
            for (int j = 0;j<userToTestEntity.size();j++)
                userTestRecordEntity.addScore(userToTestEntity.get(j).getScore());
            listUserTestRecordEntity.add(userTestRecordEntity);
        }
        List<UserTestRecordEntity> newList = new ArrayList<>();
        int begin = (page-1)*size;
        int end = page * size;
        JSONObject result=new JSONObject();
        if (begin >= listUserTestRecordEntity.size())
        {
            result.put("port","500");
            return result;
        }
        if (end > listUserTestRecordEntity.size())
            end = listUserTestRecordEntity.size();
        for (int i = begin ; i< end ; i++)
        {
            newList.add(listUserTestRecordEntity.get(i));
        }

        if (newList.size()== 0)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("data",newList);
            result.put("size",maxTestNumber);
            return result;
        }
    }

    @RequestMapping(value="/findlatestbyuseropenid",method= RequestMethod.GET)
    public JSONObject findLatestByUserOpenID(@RequestParam(value = "userOpenID") String userID){
        int maxTestNumber = tblUserToTestService.findMaxTestNumber(userID,1)-1;
        List<UserTestRecordEntity> listUserTestRecordEntity = new ArrayList<>();
        for (int i=1;i<=maxTestNumber;i++)
        {
            UserTestRecordEntity userTestRecordEntity = new UserTestRecordEntity();
            userTestRecordEntity.setTestNumber(i);
            List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByUserIDAndTestNumber(userID,i);
            userTestRecordEntity.setTestTime(userToTestEntity.get(0).getFinishTime());
            for (int j = 0;j<userToTestEntity.size();j++)
                userTestRecordEntity.addScore(userToTestEntity.get(j).getScore());
            listUserTestRecordEntity.add(userTestRecordEntity);
        }
        List<Integer> newList = new ArrayList<>();
        List<String> finishTime = new ArrayList<>();
        JSONObject result=new JSONObject();
        int begin = 0;
        int end = listUserTestRecordEntity.size();
        if (end - 3 >= 0)
            begin = end-3;
        for (int i = begin ; i< end ; i++)
        {
            newList.add(listUserTestRecordEntity.get(i).getTestAllScore());
            finishTime.add(listUserTestRecordEntity.get(i).getTestTime());
        }

        if (newList.size()== 0)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("data",newList);
            result.put("time",finishTime);
            return result;
        }
    }


    @RequestMapping(value="/findbyuseropenidandtestnumber",method= RequestMethod.GET)
    public JSONObject findByUserOpenIDAndTestNumber(@RequestParam(value = "userOpenID") String userID,
                                       @RequestParam(value = "testNumber") int testNumber){
        List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByUserIDAndTestNumber(userID, testNumber);
        JSONObject result=new JSONObject();
        ArrayList<Integer> al = new ArrayList<>();
        if (userToTestEntity.size()==0)
        {
            result.put("port","500");
            return result;
        }
        else {
            for (int i = 0;i<userToTestEntity.size();i++)
            {

                result.put("test"+Integer.toString(i+1),userToTestEntity.get(i).getScore());
            }
            result.put("p",userToTestEntity.get(0).getScore()+userToTestEntity.get(1).getScore());
            result.put("a",userToTestEntity.get(2).getScore()+userToTestEntity.get(3).getScore());
            result.put("s1",userToTestEntity.get(4).getScore()+userToTestEntity.get(5).getScore());
            result.put("s2",userToTestEntity.get(6).getScore()+userToTestEntity.get(7).getScore());
            return result;
        }
    }

    @RequestMapping(value="/findbyuseropenidandlatesttestnumber",method= RequestMethod.GET)
    public JSONObject findByUserOpenIDAndLatestTestNumber(@RequestParam(value = "userOpenID") String userID){
        int maxTestNumber = tblUserToTestService.findMaxTestNumber(userID,1)-1;
        List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByUserIDAndTestNumber(userID, maxTestNumber);
        JSONObject result=new JSONObject();
        if (userToTestEntity.size()==0)
        {
            result.put("port","500");
            return result;
        }
        else {
            for (int i = 0;i<userToTestEntity.size();i++)
            {

                result.put("test"+Integer.toString(i+1),userToTestEntity.get(i).getScore());
            }
            result.put("p",userToTestEntity.get(0).getScore()+userToTestEntity.get(1).getScore());
            result.put("a",userToTestEntity.get(2).getScore()+userToTestEntity.get(3).getScore());
            result.put("s1",userToTestEntity.get(4).getScore()+userToTestEntity.get(5).getScore());
            result.put("s2",userToTestEntity.get(6).getScore()+userToTestEntity.get(7).getScore());
            return result;
        }
    }

    @RequestMapping(value="/findbytestid",method= RequestMethod.GET)
    public JSONObject findByTestID(@RequestParam(value = "testID") int testID){
        List<UserToTestEntity> userToTestEntity  = tblUserToTestService.findByTestID(testID);
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

    @RequestMapping(value="/findtestcount",method= RequestMethod.GET)
    public JSONObject findTestCount(@RequestParam(value = "testID") int testID){
        List<Integer> listInt = new ArrayList<>();
        JSONObject result=new JSONObject();
        for (int i = 0;i<=10;i++)
        {
            listInt.add(tblUserToTestService.findByTestIDAndScore(testID,i));
        }
        result.put("data",listInt);
        return result;
    }


    @RequestMapping(value="/add",method= RequestMethod.POST)
    public JSONObject addUserRecord(@RequestParam(value = "userOpenID")String userID,
                              @RequestParam(value = "scores") ArrayList<Integer> scores,
                              @RequestParam(value = "finishTime")String finishTime)
    {
        JSONObject result=new JSONObject();
        int testNumber = tblUserToTestService.findMaxTestNumber(userID,1);
        for (int i = 0;i<scores.size();i++)
        {
            tblUserToTestService.addRecord(userID, i+1, testNumber, scores.get(i), finishTime);
        }
        result.put("port","200");
        return result;
    }
}
