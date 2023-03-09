package edu.usc.csci310.project.demo.api.responses;

public class LogInResponse {
    private String data;

    public String getData() {
//        System.out.println("get data here");
        return data;
    }

    public void setData(String data) {
//        System.out.println("Data contains: " + data);
        if (data.contains("tommytrojan@usc.edu") && data.contains("Password123"))
        {
            this.data = "True";
        } else if (data.contains("tommytrojan@usc.edu")){
            this.data = "False";
        } else {
            this.data = "Null";
        }
//        this.data = data;
    }
}
