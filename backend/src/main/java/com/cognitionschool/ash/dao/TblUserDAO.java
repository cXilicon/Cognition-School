package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TblUserDAO extends JpaRepository<UserEntity,Integer> {

    @Modifying
    @Query(value = "update user set delete_flag = 1 where openid=? ",nativeQuery = true)
    void deleteUser(String openID);

    @Modifying
    @Query(value = "insert into user(openid,user_name,area,birthday,education,sex,sign,delete_flag) values (?,?,?,?,?,?,?,0)",nativeQuery = true)
    void addUser(String openID, String UserName, String area, String birthday, String education, String sex, String sign);

    @Query(value = "select * from user where openid = ? and delete_flag = 0",nativeQuery = true)
    UserEntity findByOpenid(String openID);

    @Modifying
    @Query(value = "update user set user_name = ?, area=?,birthday=?,education=?,sex=?,sign=? where openid=?",nativeQuery = true)
    void modifyUser(String UserName, String area, String birthday,String education,String sex,String sign,String openID);

}
