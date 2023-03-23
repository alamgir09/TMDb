package edu.usc.csci310.project.demo.steps;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class logInStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        WebDriverManager.chromedriver().setup();
    }
    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        driver = new ChromeDriver(options);
    }

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
        driver.findElement(By.id("submitBtn")).click();
    }


    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertEquals(driver.findElement(By.id("response")).getText(), "");
    }

    @After
    public void after(){
        driver.quit();
    }
}