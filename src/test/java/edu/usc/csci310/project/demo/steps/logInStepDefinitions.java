package edu.usc.csci310.project.demo.steps;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.After;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;

public class logInStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private final WebDriver driver = new ChromeDriver();

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        driver.get(ROOT_URL + "LogIn");
    }

    @When("I enter {string} and the {string}")
    public void iEnterAndThe(String arg0, String arg1) {
        driver.findElement(By.id("email")).sendKeys(arg0);
        driver.findElement(By.id("password")).sendKeys(arg1);
    }
    @And("I press the submit button")
    public void iPressTheSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/button")).click();
    }

    /**
     * another step function to check valid output to the logIn page, no too sure what
     * is going to happend when you press submit
     */
//    @Then("I should see {string} in the page")
//    public void iShouldSeeInThePage(String arg0) {
//        assertTrue(driver.getPageSource().contains(arg0));
//    }

    @After
    public void after(){
        driver.quit();
    }


    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }
}
