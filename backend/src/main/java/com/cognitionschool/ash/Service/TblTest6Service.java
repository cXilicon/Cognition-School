package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.Test6Entity;

import java.util.List;

public interface TblTest6Service {
    Test6Entity findByID(int id);
    List<Test6Entity> findByLevel(int level);
    void addTest(String questionImgAddress,String choice1,String choice2,String choice3,String choice4,String choice5,String choice6,String level);
    void deleteTest(int id);
    void modifyTest(String questionImgAddress,String choice1,String choice2,String choice3,String choice4,String choice5,String choice6,int level,int id);
}
