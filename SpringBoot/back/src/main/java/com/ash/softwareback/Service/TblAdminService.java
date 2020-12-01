package com.ash.softwareback.Service;


import com.ash.softwareback.entity.AdminEntity;

public interface TblAdminService {

    AdminEntity loginAdmin(String adminName, String password);
}
