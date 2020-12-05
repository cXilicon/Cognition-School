package com.cognitionschool.ash.dao;

import com.cognitionschool.ash.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TblAdminDAO extends JpaRepository<AdminEntity,Integer> {
    AdminEntity findByAdminAccount(String adminAccount);
}
