package edu.usc.csci310.project.demo.api.responses;

public class LogInResponse {
    private String data;

    public String getData() { System.out.println("get data here"); return data;}

    public void setData(String data) {
        this.data = data;
    }
}
