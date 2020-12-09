package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblTestItemService;
import com.cognitionschool.ash.dao.TblTestItemDAO;
import com.cognitionschool.ash.entity.TestItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Component
public class TblTestItemServiceImpl implements TblTestItemService {
    @Autowired
    TblTestItemDAO tblTestItemDAO;
    @Override
    public TestItemEntity findByTestItemID(int testItemID) { return tblTestItemDAO.findByTestItemId(testItemID); }

    @Override
    public void deleteTest(int testItemID) {
        tblTestItemDAO.deleteTest(testItemID);
    }

    @Override
    public void addTest(String testName, String testType) {
        tblTestItemDAO.addTest(testName,testType);
    }

    @Override
    public void modifyUser(String testName, String testType, int testItemID) {
        tblTestItemDAO.modifyUser(testName,testType,testItemID);
    }
}
