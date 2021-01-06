package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface TblAdminDAO extends JpaRepository<AdminEntity,Integer> {
    AdminEntity findByAdminAccount(String adminAccount);
}
