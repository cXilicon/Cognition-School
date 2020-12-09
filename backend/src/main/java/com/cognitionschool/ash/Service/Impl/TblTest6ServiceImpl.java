package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblTest6Service;
import com.cognitionschool.ash.dao.TblTest6DAO;
import com.cognitionschool.ash.entity.Test6Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@Component
public class TblTest6ServiceImpl implements TblTest6Service {
    @Autowired
    TblTest6DAO tblTest6DAO;

    @Override
    public Test6Entity findByID(int id) {
        return tblTest6DAO.findByID(id);
    }

    @Override
    public List<Test6Entity> findByLevel(int level) {
        return tblTest6DAO.findByLevel(level);
    }

    @Override
    public void addTest(String questionImgAddress, String choice1, String choice2, String choice3, String choice4, String choice5, String choice6, String level) {
        tblTest6DAO.addTest(questionImgAddress,choice1,choice2, choice3,choice4,choice5, choice6,level);
    }

    @Override
    public void deleteTest(int id) {
        tblTest6DAO.deleteTest(id);
    }

    @Override
    public void modifyTest(String questionImgAddress, String choice1, String choice2, String choice3, String choice4, String choice5, String choice6, int level, int id) {
        tblTest6DAO.modifyTest(questionImgAddress,choice1,choice2, choice3,choice4,choice5, choice6,level,id);
    }
}
