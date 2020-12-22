package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.UserToTestEntity;

import java.util.ArrayList;
import java.util.List;

public interface TblUserToTestService {
    UserToTestEntity findByID(int id);
    List<UserToTestEntity> findByUserID(String userOpenID);
    List<UserToTestEntity> findByUserIDAndTestNumber(String userOpenID,int testNumber);
    List<UserToTestEntity> findByTestID(int testID);
    int findByTestIDAndScore(int testID,int score);
    Integer findMaxTestNumber(String userOpenID,int test_id);
    void addRecord(String  userOpenID,int testID,int testNumber,int score,String finishTime);
}
