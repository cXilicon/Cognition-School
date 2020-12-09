package com.cognitionschool.ash.controller;

import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.Service.TblTest6Service;
import com.cognitionschool.ash.Service.TblTestItemService;
import com.cognitionschool.ash.entity.Test6Entity;
import com.cognitionschool.ash.entity.TestItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
        public JSONObject getByID(@RequestParam(value = "ID") int ID){
            Test6Entity test6Entity= tblTest6Service.findByID(ID);
            JSONObject result=new JSONObject();
            if (test6Entity== null)
            {
                result.put("port","500");
                return result;
            }
            else{
                result.put("questionImgAddress",test6Entity.getQuestionImgAddress());
                result.put("choice1",test6Entity.getChoice1());
                result.put("choice2",test6Entity.getChoice2());
                result.put("choice3",test6Entity.getChoice3());
                result.put("choice4",test6Entity.getChoice4());
                result.put("choice5",test6Entity.getChoice5());
                result.put("choice6",test6Entity.getChoice6());
                result.put("level",test6Entity.getLevel());
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
            Random rand = new Random();
            Test6Entity test6Entity = test6EntityList.get(rand.nextInt(test6EntityList.size()));
            result.put("questionImgAddress",test6Entity.getQuestionImgAddress());
            result.put("choice1",test6Entity.getChoice1());
            result.put("choice2",test6Entity.getChoice2());
            result.put("choice3",test6Entity.getChoice3());
            result.put("choice4",test6Entity.getChoice4());
            result.put("choice5",test6Entity.getChoice5());
            result.put("choice6",test6Entity.getChoice6());
            result.put("level",test6Entity.getLevel());
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
                                 @RequestParam(value = "ID")int ID)
    {
        JSONObject result=new JSONObject();
        tblTest6Service.modifyTest(questionImgAddress, choice1, choice2, choice3, choice4, choice5, choice6, level,ID);
        result.put("port","200");
        return result;
    }
}
