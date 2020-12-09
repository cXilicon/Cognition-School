package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.UserToTestEntity;

import java.util.List;

public interface TblUserToTestService {
    UserToTestEntity findByID(int id);
    List<UserToTestEntity> findByUserID(int userID);
    void addRecord(int userID,int testID,int testNumber,double score,String finishTime);
}
