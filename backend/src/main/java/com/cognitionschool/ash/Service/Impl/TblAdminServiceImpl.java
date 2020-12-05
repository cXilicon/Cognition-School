package com.cognitionschool.ash.Service.Impl;

import com.cognitionschool.ash.Service.TblAdminService;
import com.cognitionschool.ash.dao.TblAdminDAO;
import com.cognitionschool.ash.entity.AdminEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Component
public class TblAdminServiceImpl implements TblAdminService {
    @Autowired
    private TblAdminDAO tblAdminDAO;
    @Override
    public AdminEntity loginAdmin(String adminName, String password) {
        AdminEntity adminEntity = tblAdminDAO.findByAdminAccount(adminName);
//        password = md5.GetMD5Code(password);
        if (adminEntity == null ){
            return null;
        }
        else {
            return adminEntity;
        }
    }
}