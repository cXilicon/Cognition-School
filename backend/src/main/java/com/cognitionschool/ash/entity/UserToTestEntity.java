package com.cognitionschool.ash.entity;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "user_to_test", schema = "softwareWX", catalog = "")
public class UserToTestEntity {
    private int id;
    private String userId;
    private int testId;
    private BigInteger score;
    private int testNumber;
    private String finishTime;
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
    @Column(name = "user_openid")
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "test_id")
    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    @Basic
    @Column(name = "score")
    public BigInteger getScore() {
        return score;
    }

    public void setScore(BigInteger score) {
        this.score = score;
    }

    @Basic
    @Column(name = "test_number")
    public int getTestNumber() {
        return testNumber;
    }

    public void setTestNumber(int testNumber) {
        this.testNumber = testNumber;
    }

    @Basic
    @Column(name = "finish_time")
    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
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

        UserToTestEntity that = (UserToTestEntity) o;

        if (id != that.id) return false;
        if (userId != null ? !userId .equals(that.userId ) : that.userId != null) return false;
        if (testId != that.testId) return false;
        if (testNumber != that.testNumber) return false;
        if (deleteFlag != that.deleteFlag) return false;
        if (score != null ? !score.equals(that.score) : that.score != null) return false;
        if (finishTime != null ? !finishTime.equals(that.finishTime) : that.finishTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (userId != null ? userId.hashCode() : 0);
        result = 31 * result + testId;
        result = 31 * result + (score != null ? score.hashCode() : 0);
        result = 31 * result + testNumber;
        result = 31 * result + (finishTime != null ? finishTime.hashCode() : 0);
        result = 31 * result + deleteFlag;
        return result;
    }
}
