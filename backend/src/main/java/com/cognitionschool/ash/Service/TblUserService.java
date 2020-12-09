package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.UserEntity;

import java.util.Date;

public interface TblUserService {
    UserEntity findByOpenID(String openID);
    void deleteUser(String openID);
    void addUser(String openID, String UserName, String area, String birthday,String education,String sex,String sign);
    void modifyUser(String UserName, String area, String birthday,String education,String sex,String sign,String openID);
}
