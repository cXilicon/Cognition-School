package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.UserToTestEntity;

import java.util.List;

public interface TblUserToTestService {
    UserToTestEntity findByID(int id);
    List<UserToTestEntity> findByUserID(String userID);
    Integer findMaxTestNumber(String userID,int test_id);
    void addRecord(String  userID,int testID,int testNumber,double score,String finishTime);
}
