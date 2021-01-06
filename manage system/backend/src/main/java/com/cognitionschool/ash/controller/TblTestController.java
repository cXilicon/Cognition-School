package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblTestItemService;
import com.cognitionschool.ash.entity.TestItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Transactional
@RestController
@CrossOrigin
@RequestMapping(value="/test")
public class TblTestController {
    @Autowired
    TblTestItemService tblTestItemService;
    @RequestMapping(value="/get",method= RequestMethod.GET)
    public JSONObject getTestInfo(@RequestParam(value = "testItemID") int testItemID){
        TestItemEntity testItemEntity = tblTestItemService.findByTestItemID(testItemID);
        JSONObject result=new JSONObject();
        if (testItemEntity == null)
        {
            result.put("port","500");
            return result;
        }
        else{
            result.put("data",testItemEntity);
            return result;
        }
    }

    @RequestMapping(value="/delete",method= RequestMethod.GET)
    public JSONObject deleteUser(@RequestParam(value = "testItemID") int testItemID)
    {
        JSONObject result=new JSONObject();
        tblTestItemService.deleteTest(testItemID);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/findall",method= RequestMethod.GET)
    public JSONObject deleteUser()
    {
        JSONObject result=new JSONObject();
        List<TestItemEntity>  testList = tblTestItemService.findAll();
        result.put("data",testList);
        return result;
    }

    @RequestMapping(value="/add",method= RequestMethod.POST)
    public JSONObject addUser(@RequestParam(value = "testName")String testName,
                              @RequestParam(value = "testType")String testType)
    {
        JSONObject result=new JSONObject();
        tblTestItemService.addTest(testName,testType);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/modify",method= RequestMethod.POST)
    public JSONObject modifyUser(@RequestParam(value = "testItemID")int testItemID,
                                 @RequestParam(value = "testName")String testName,
                                 @RequestParam(value = "testType")String testType)
    {
        JSONObject result=new JSONObject();
        tblTestItemService.modifyUser(testName,testType,testItemID);
        result.put("port","200");
        return result;
    }


}
