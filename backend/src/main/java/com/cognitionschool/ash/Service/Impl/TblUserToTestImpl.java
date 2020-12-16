package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblUserToTestService;
import com.cognitionschool.ash.dao.TblUserToTestDAO;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
@Component
public class TblUserToTestImpl implements TblUserToTestService {
    @Autowired
    TblUserToTestDAO tblUserToTestDAO;

    @Override
    public UserToTestEntity findByID(int id) {
        return tblUserToTestDAO.findByID(id);
    }

    @Override
    public List<UserToTestEntity> findByUserID(String userOpenID) {
        return tblUserToTestDAO.findByUserID(userOpenID);
    }

    @Override
    public Integer findMaxTestNumber(String userOpenID, int test_id) {
        Integer num = tblUserToTestDAO.findMaxTestNumber(userOpenID,test_id);
        if (num == null)
            return 1;
        else
        {
            return  num + 1;
        }
    }

    @Override
    public void addRecord(String userOpenID, int testID, int testNumber, int score, String finishTime) {
        tblUserToTestDAO.addRecord(userOpenID, testID, testNumber, score, finishTime);
    }
}
