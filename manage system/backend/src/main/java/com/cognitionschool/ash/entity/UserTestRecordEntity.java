package com.cognitionschool.ash.entity;

public class UserTestRecordEntity {
    private int testNumber;
    private String testTime;
    private int testAllScore = 0;

    public String getTestTime() {
        return testTime;
    }

    public void setTestTime(String testTime) {
        this.testTime = testTime;
    }

    public int getTestAllScore() {
        return testAllScore;
    }

    public int getTestNumber() {
        return testNumber;
    }

    public void setTestNumber(int testNumber) {
        this.testNumber = testNumber;
    }

    public void setTestAllScore(int testAllScore) {
        this.testAllScore = testAllScore;
    }
    public void addScore(int score)
    {
        this.testAllScore += score;
    }
}
