package com.cognitionschool.ash.controller;

import com.cognitionschool.ash.Service.TblAdminService;
import com.alibaba.fastjson.JSONObject;
import com.cognitionschool.ash.entity.AdminEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value="/admin")
public class TblAdminController {
    @Autowired
    TblAdminService tblAdminService;
    @RequestMapping(value="/login",method= RequestMethod.GET)
    public JSONObject loginAdmin(@RequestParam(value = "adminAccount") String adminAccount,
                                 @RequestParam(value = "adminPassword") String password){
        AdminEntity adminEntity = tblAdminService.loginAdmin(adminAccount,password);
        JSONObject result=new JSONObject();
        if (adminEntity == null)
        {
            result.put("port","500");
            return result;
        }
        else if(!adminEntity.getPassword().equals(password)){
            result.put("port","400");
            return result;
        }
        else{
            result.put("port","200");
            return result;
        }
    }
}
