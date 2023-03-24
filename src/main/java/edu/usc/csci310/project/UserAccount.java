package edu.usc.csci310.project;

public class UserAccount {
    String firstName;
    String lastName;
    String password;
    String userID;

    // setters
    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }
    public void setLastName(String lastname) {
        this.lastName = lastname;
    }
    public void setUserID(String userid){this.userID = userid;}
    public void setPassword(String password) {
        this.password = password;
    }

    // getters
    public String getPassword() {
        return password;
    }
    public String getUserID(){return userID;}

}
