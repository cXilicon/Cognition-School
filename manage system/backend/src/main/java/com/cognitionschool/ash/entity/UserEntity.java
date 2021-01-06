package com.cognitionschool.ash.entity;

import javax.persistence.*;

@Entity
@Table(name = "user", schema = "softwareWX", catalog = "")
public class UserEntity {
    private int id;
    private String userName;
    private String openid;
    private String area;
    private String birthday;
    private String education;
    private String sex;
    private String sign;
    private int deleteFlag;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "user_name")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name = "openid")
    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    @Basic
    @Column(name = "area")
    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    @Basic
    @Column(name = "birthday")
    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    @Basic
    @Column(name = "education")
    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    @Basic
    @Column(name = "sex")
    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Basic
    @Column(name = "sign")
    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    @Basic
    @Column(name = "delete_flag")
    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (id != that.id) return false;
        if (deleteFlag != that.deleteFlag) return false;
        if (userName != null ? !userName.equals(that.userName) : that.userName != null) return false;
        if (openid != null ? !openid.equals(that.openid) : that.openid != null) return false;
        if (area != null ? !area.equals(that.area) : that.area != null) return false;
        if (birthday != null ? !birthday.equals(that.birthday) : that.birthday != null) return false;
        if (education != null ? !education.equals(that.education) : that.education != null) return false;
        if (sex != null ? !sex.equals(that.sex) : that.sex != null) return false;
        if (sign != null ? !sign.equals(that.sign) : that.sign != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (userName != null ? userName.hashCode() : 0);
        result = 31 * result + (openid != null ? openid.hashCode() : 0);
        result = 31 * result + (area != null ? area.hashCode() : 0);
        result = 31 * result + (birthday != null ? birthday.hashCode() : 0);
        result = 31 * result + (education != null ? education.hashCode() : 0);
        result = 31 * result + (sex != null ? sex.hashCode() : 0);
        result = 31 * result + (sign != null ? sign.hashCode() : 0);
        result = 31 * result + deleteFlag;
        return result;
    }
}
