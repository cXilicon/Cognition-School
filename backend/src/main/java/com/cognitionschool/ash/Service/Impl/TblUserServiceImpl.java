package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblUserService;
import com.cognitionschool.ash.dao.TblUserDAO;
import com.cognitionschool.ash.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Component
public class TblUserServiceImpl implements TblUserService {
    @Autowired
    TblUserDAO tblUserDAO;

    @Override
    public List<UserEntity> findByAll(String userID) {
        return tblUserDAO.findByUserNameContaining(userID);
    }

    @Override
    public UserEntity findByOpenID(String openID) {
        return tblUserDAO.findByOpenid(openID);
    }



    @Override
    public void deleteUser(String openID) {
        tblUserDAO.deleteUser(openID);
    }

    @Override
    public void addUser(String openID, String UserName, String area, String birthday, String education, String sex, String sign) {
        tblUserDAO.addUser(openID,UserName,area,birthday,education,sex,sign);
    }

    @Override
    public void modifyUser(String UserName, String area, String birthday,String education,String sex,String sign,String openID) {
        tblUserDAO.modifyUser(UserName,area,birthday,education,sex,sign,openID);
    }
}
