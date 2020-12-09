package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.TestItemEntity;

public interface TblTestItemService {
    TestItemEntity findByTestItemID(int testItemID);
    void deleteTest(int testItemID);
    void addTest(String testName,String testType);
    void modifyUser(String testName,String testType,int testItemID);
}
