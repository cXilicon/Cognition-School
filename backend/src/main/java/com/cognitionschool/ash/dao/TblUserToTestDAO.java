package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.UserEntity;
import com.cognitionschool.ash.entity.UserToTestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TblUserToTestDAO extends JpaRepository<UserToTestEntity,Integer> {

    @Query(value = "select * from user_to_test where id = ? and delete_flag = 0",nativeQuery = true)
    UserToTestEntity findByID(int id);

    @Query(value = "select * from user_to_test where user_id = ? and delete_flag = 0",nativeQuery = true)
    List<UserToTestEntity> findByUserID(int userID);

    @Query(value = "select max(test_number) from user_to_test where user_id = ? and test_id = ? and delete_flag = 0",nativeQuery = true)
    Integer findMaxTestNumber(int userID,int test_id);

    @Modifying
    @Query(value = "insert into user_to_test(user_id,test_id,test_number,score,finish_time,delete_flag) values (?,?,?,?,?,0)",nativeQuery = true)
    void addRecord(int userID,int testID,int testNumber,double score,String finishTime);
}
