package com.cognitionschool.ash.Service;

import com.cognitionschool.ash.entity.AdminEntity;

public interface TblAdminService {
    AdminEntity loginAdmin(String adminName, String password);
}
