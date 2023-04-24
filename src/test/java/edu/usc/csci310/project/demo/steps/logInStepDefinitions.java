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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.Assert.assertEquals;

public class logInStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriverManager.chromedriver().setup();
    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @Given("I am on the login page")
    public void iAmOnTheLoginPage() {
        driver.get(ROOT_URL + "LogIn");
    }

    @When("I enter {string} and the {string}")
    public void iEnterAndThe(String arg0, String arg1) {
        driver.findElement(By.id("username")).sendKeys(arg0);
        driver.findElement(By.id("password")).sendKeys(arg1);
    }

    @And("I press the submit button")
    public void iPressTheSubmitButton() {
        driver.findElement(By.id("submitBtn")).click();
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        if(arg0 == "Username not found"){
            assertEquals(driver.findElement(By.id("response")).getText(), "Username not found");
        }
        if(arg0 == "Success"){
            assertEquals(driver.findElement(By.id("response")).getText(), "Success");
        }
    }
    @After
    public void after() {
        driver.quit();
    }

    @When("I press the sign up button")
    public void iPressTheSignUpButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/p[2]/a")).click();
    }

    @Then("I am on the signup page")
    public void iAmOnTheSignupPage() {
        assertEquals(driver.getCurrentUrl(), ROOT_URL + "SignUp");
    }

    @Then("I should be redirected to the SignUp page")
    public void iShouldBeRedirectedToTheSignUpPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(6));
        wait.until(ExpectedConditions.urlToBe(ROOT_URL + "SignUp"));
        assertEquals(ROOT_URL + "SignUp", driver.getCurrentUrl());
    }

    @When("I click on the {string} hyperlink at the bottom")
    public void iClickOnTheHyperlinkAtTheBottom(String arg0) {
        driver.findElement(By.linkText(arg0)).click();
    }

}
