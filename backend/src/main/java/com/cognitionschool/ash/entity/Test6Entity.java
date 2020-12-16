package com.cognitionschool.ash.entity;

import javax.persistence.*;

@Entity
@Table(name = "test6", schema = "softwareWX", catalog = "")
public class Test6Entity {
    private int id;
    private String questionImgAddress;
    private String choice1;
    private String choice2;
    private String choice3;
    private String choice4;
    private String choice5;
    private String choice6;
    private int deleteFlag;
    private int level;

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "question_img_address")
    public String getQuestionImgAddress() {
        return questionImgAddress;
    }

    public void setQuestionImgAddress(String questionImgAddress) {
        this.questionImgAddress = questionImgAddress;
    }

    @Basic
    @Column(name = "choice1")
    public String getChoice1() {
        return choice1;
    }

    public void setChoice1(String choice1) {
        this.choice1 = choice1;
    }

    @Basic
    @Column(name = "choice2")
    public String getChoice2() {
        return choice2;
    }

    public void setChoice2(String choice2) {
        this.choice2 = choice2;
    }

    @Basic
    @Column(name = "choice3")
    public String getChoice3() {
        return choice3;
    }

    public void setChoice3(String choice3) {
        this.choice3 = choice3;
    }

    @Basic
    @Column(name = "choice4")
    public String getChoice4() {
        return choice4;
    }

    public void setChoice4(String choice4) {
        this.choice4 = choice4;
    }

    @Basic
    @Column(name = "choice5")
    public String getChoice5() {
        return choice5;
    }

    public void setChoice5(String choice5) {
        this.choice5 = choice5;
    }

    @Basic
    @Column(name = "choice6")
    public String getChoice6() {
        return choice6;
    }

    public void setChoice6(String choice6) {
        this.choice6 = choice6;
    }

    @Basic
    @Column(name = "delete_flag")
    public int getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(int deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Basic
    @Column(name = "level")
    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Test6Entity that = (Test6Entity) o;

        if (id != that.id) return false;
        if (deleteFlag != that.deleteFlag) return false;
        if (level != that.level) return false;
        if (questionImgAddress != null ? !questionImgAddress.equals(that.questionImgAddress) : that.questionImgAddress != null)
            return false;
        if (choice1 != null ? !choice1.equals(that.choice1) : that.choice1 != null) return false;
        if (choice2 != null ? !choice2.equals(that.choice2) : that.choice2 != null) return false;
        if (choice3 != null ? !choice3.equals(that.choice3) : that.choice3 != null) return false;
        if (choice4 != null ? !choice4.equals(that.choice4) : that.choice4 != null) return false;
        if (choice5 != null ? !choice5.equals(that.choice5) : that.choice5 != null) return false;
        if (choice6 != null ? !choice6.equals(that.choice6) : that.choice6 != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (questionImgAddress != null ? questionImgAddress.hashCode() : 0);
        result = 31 * result + (choice1 != null ? choice1.hashCode() : 0);
        result = 31 * result + (choice2 != null ? choice2.hashCode() : 0);
        result = 31 * result + (choice3 != null ? choice3.hashCode() : 0);
        result = 31 * result + (choice4 != null ? choice4.hashCode() : 0);
        result = 31 * result + (choice5 != null ? choice5.hashCode() : 0);
        result = 31 * result + (choice6 != null ? choice6.hashCode() : 0);
        result = 31 * result + deleteFlag;
        result = 31 * result + level;
        return result;
    }
}
