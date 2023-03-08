package edu.usc.csci310.project.demo.api.requests;

public class LogInRequest {
    private String email;

    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() { return password;}

    public void setEmail(String email) { this.email = email;}

    public void setPassword(String password) { this.password = password;}
}
