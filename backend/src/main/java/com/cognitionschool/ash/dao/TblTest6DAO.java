package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.AdminEntity;
import com.cognitionschool.ash.entity.Test6Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface TblTest6DAO extends JpaRepository<Test6Entity,Integer> {

    @Query(value = "select * from test6 where id = ? and delete_flag = 0 ",nativeQuery = true)
    Test6Entity findByID(int id);

    @Query(value = "select * from test6 where level = ? and delete_flag = 0 ",nativeQuery = true)
    List<Test6Entity> findByLevel(int level);

    @Modifying
    @Query(value = "insert into test6(question_img_address,choice1,choice2,choice3,choice4,choice5,choice6,level,delete_flag) values (?,?,?,?,?,?,?,?,0)",nativeQuery = true)
    void addTest(String questionImgAddress,String choice1,String choice2,String choice3,String choice4,String choice5,String choice6,String level);

    @Modifying
    @Query(value = "update test6 set delete_flag = 1 where id =? ",nativeQuery = true)
    void deleteTest(int id);

    @Modifying
    @Query(value = "update test6 set question_img_address = ?, choice1=?,choice2=?,choice3=?,choice4=?,choice5=?,choice6=?,level = ? where id=?",nativeQuery = true)
    void modifyTest(String questionImgAddress,String choice1,String choice2,String choice3,String choice4,String choice5,String choice6,int level,int id);
}
