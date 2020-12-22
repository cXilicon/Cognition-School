package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TblUserToTestDAO extends JpaRepository<UserToTestEntity,Integer> {

    @Query(value = "select * from user_to_test where id = ? and delete_flag = 0",nativeQuery = true)
    UserToTestEntity findByID(int id);

    @Query(value = "select * from user_to_test where user_openid = ? and delete_flag = 0",nativeQuery = true)
    List<UserToTestEntity> findByUserID(String userOpenID);

    @Query(value = "select * from user_to_test where test_id = ? and delete_flag = 0",nativeQuery = true)
    List<UserToTestEntity> findByTestID(int testID);

    @Query(value = "select count(*) from user_to_test where test_id = ? and score = ? and delete_flag = 0",nativeQuery = true)
    int findByTestIDAndScore(int testID,int Score);

    @Query(value = "select max(test_number) from user_to_test where user_openid = ? and test_id = ? and delete_flag = 0",nativeQuery = true)
    Integer findMaxTestNumber(String userOpenID,int test_id);

    @Query(value = "select * from user_to_test where user_openid = ? and test_number=? and delete_flag = 0",nativeQuery = true)
    List<UserToTestEntity> findByUserOpenidAndTestNumber(String userOpenid,int testNumber);

    @Modifying
    @Query(value = "insert into user_to_test(user_openid,test_id,test_number,score,finish_time,delete_flag) values (?,?,?,?,?,0)",nativeQuery = true)
    void addRecord(String userOpenID,int testID,int testNumber,int score,String finishTime);
}
