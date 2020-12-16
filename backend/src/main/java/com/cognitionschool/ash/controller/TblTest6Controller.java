package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblTest6Service;
import com.cognitionschool.ash.entity.Test6Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Transactional
@RestController
@CrossOrigin
@RequestMapping(value="/test6")
public class TblTest6Controller {
    @Autowired
    TblTest6Service tblTest6Service;
        @RequestMapping(value="/gebyid",method= RequestMethod.GET)
        public JSONObject getByID(@RequestParam(value = "id") int ID){
            Test6Entity test6Entity= tblTest6Service.findByID(ID);
            JSONObject result=new JSONObject();
            if (test6Entity== null)
            {
                result.put("port","500");
                return result;
            }
            else{
                result.put("data",test6Entity);
                return result;
            }
    }

    @RequestMapping(value="/getbylevel",method= RequestMethod.GET)
    public JSONObject getByLevel(@RequestParam(value = "level") int level){
        List<Test6Entity> test6EntityList= tblTest6Service.findByLevel(level);
        JSONObject result=new JSONObject();
        if (test6EntityList.size() == 0)
        {
            result.put("port","500");
            return result;
        }
        else{
            int time;
            if(level == 1 || level == 2)
            {
                 time = 2;
            }
            else
            {
                time = 1;
            }
            ArrayList<Test6Entity> test6EntityArrayList = new ArrayList<>();
            int oldTest = -1;
            for (int i = 0;i<time;i++)
            {
                Random rand = new Random();
                int randomNum = rand.nextInt(test6EntityList.size());
                while (randomNum == oldTest)
                {
                    randomNum = rand.nextInt(test6EntityList.size());
                }
                oldTest = randomNum;
                Test6Entity test6Entity = test6EntityList.get(randomNum);
                test6EntityArrayList.add(test6Entity);
            }
            result.put("data",test6EntityArrayList);
            return result;
        }
    }

    @RequestMapping(value="/add",method= RequestMethod.POST)
    public JSONObject addTest(@RequestParam(value = "questionImgAddress")String questionImgAddress,
                              @RequestParam(value = "choice1")String choice1,
                              @RequestParam(value = "choice2")String choice2,
                              @RequestParam(value = "choice3")String choice3,
                              @RequestParam(value = "choice4")String choice4,
                              @RequestParam(value = "choice5")String choice5,
                              @RequestParam(value = "choice6")String choice6,
                              @RequestParam(value = "level")String level)

    {
        JSONObject result=new JSONObject();
        tblTest6Service.addTest(questionImgAddress, choice1, choice2, choice3, choice4, choice5, choice6, level);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/delete",method= RequestMethod.GET)
    public JSONObject deleteUser(@RequestParam(value = "ID") int ID)
    {
        JSONObject result=new JSONObject();
        tblTest6Service.deleteTest(ID);
        result.put("port","200");
        return result;
    }

    @RequestMapping(value="/modify",method= RequestMethod.POST)
    public JSONObject modifyUser(@RequestParam(value = "questionImgAddress")String questionImgAddress,
                                 @RequestParam(value = "choice1")String choice1,
                                 @RequestParam(value = "choice2")String choice2,
                                 @RequestParam(value = "choice3")String choice3,
                                 @RequestParam(value = "choice4")String choice4,
                                 @RequestParam(value = "choice5")String choice5,
                                 @RequestParam(value = "choice6")String choice6,
                                 @RequestParam(value = "level")int level,
                                 @RequestParam(value = "id")int ID)
    {
        JSONObject result=new JSONObject();
        tblTest6Service.modifyTest(questionImgAddress, choice1, choice2, choice3, choice4, choice5, choice6, level,ID);
        result.put("port","200");
        return result;
    }
}
