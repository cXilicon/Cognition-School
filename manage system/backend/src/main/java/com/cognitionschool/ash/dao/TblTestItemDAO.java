package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.TestItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface TblTestItemDAO extends JpaRepository<TestItemEntity,Integer> {

    @Query(value = "select * from test_item where test_item_id = ? and delete_flag = 0 ",nativeQuery = true)
    TestItemEntity findByTestItemId(int testItemID);

    @Modifying
    @Query(value = "update test_item set delete_flag = 1 where test_item_id =? ",nativeQuery = true)
    void deleteTest(int testItemID);

    @Modifying
    @Query(value = "insert into test_item(test_name,test_type,delete_flag) values (?,?,0)",nativeQuery = true)
    void addTest(String testName, String testType);

    @Modifying
    @Query(value = "update test_item set test_name = ?, test_type = ? where test_item_id = ?",nativeQuery = true)
    void modifyUser(String testName, String testType, int testItemID);

    @Query(value = "select * from test_item where delete_flag = 0 ",nativeQuery = true)
    List<TestItemEntity> findAll();
}
