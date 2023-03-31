package edu.usc.csci310.project.demo.api.requests;

public class SignUpRequest {
    private String firstName;
    private String lastName;
    private String username;
    private String password;


    public String getFirstName() {
        return firstName;
    }
    public String getLastName() { return lastName;}
    public String getUsername() {
        return username;
    }
    public String getPassword() { return password;}

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) { this.lastName = lastName;}
    public void setUsername(String email) { this.username = email;}
    public void setPassword(String password) { this.password = password;}
}
