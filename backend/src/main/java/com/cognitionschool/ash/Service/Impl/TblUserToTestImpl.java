package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblUserToTestService;
import com.cognitionschool.ash.dao.TblUserToTestDAO;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public List<UserToTestEntity> findByUserID(int userID) {
        return tblUserToTestDAO.findByUserID(userID);
    }

    @Override
    public Integer findMaxTestNumber(int userID, int test_id) {
        Integer num = tblUserToTestDAO.findMaxTestNumber(userID,test_id);
        if (num == null)
            return 1;
        else
        {
            return  num + 1;
        }
    }

    @Override
    public void addRecord(int userID, int testID, int testNumber, double score, String finishTime) {
        tblUserToTestDAO.addRecord(userID, testID, testNumber, score, finishTime);
    }
}
