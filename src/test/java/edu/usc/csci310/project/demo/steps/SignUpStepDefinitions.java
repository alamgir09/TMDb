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
import java.util.Date;


import static org.junit.Assert.assertEquals;

public class SignUpStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private static WebDriver driver;

    @Given("I am on the SignUp page")
    public void iAmOnTheSignUpPage() {
        driver.get(ROOT_URL + "SignUp");
    }

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriverManager.chromedriver().setup();
    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.setAcceptInsecureCerts(true);
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @When("I enter my first name {string} , last name {string}, user name {string}, my password {string}, and confirming password {string}")
    public void iEnterMyFirstNameLastNameUserNameMyPasswordAndConfirmingPassword(String arg0, String arg1, String arg2, String arg3, String arg4) {
        Date now = new Date();

        driver.findElement(By.id("firstName")).sendKeys(arg0 + now);
        driver.findElement(By.id("lastName")).sendKeys(arg1 + now);
        driver.findElement(By.id("username")).sendKeys(arg2 + now);
        driver.findElement(By.id("password")).sendKeys(arg3);
        driver.findElement(By.id("passwordConfirm")).sendKeys(arg4);
    }

    @And("I click the submit button")
    public void iClickTheSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/form/button")).click();
    }

    @Then("I should be redirected to the LogIn page")
    public void iShouldBeRedirectedToTheLogInPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(8));
        wait.until(ExpectedConditions.urlToBe(ROOT_URL + "LogIn"));
        assertEquals(ROOT_URL + "LogIn", driver.getCurrentUrl());
    }

    @Then("I should see {string} on the page")
    public void iShouldSeeOnThePage(String arg0) {
        assertEquals(driver.findElement(By.id("response")).getText(), "");
    }

    @Then("I should see {string}")
    public void iShouldSee(String arg0) {
        assertEquals("User already exists", arg0);
    }

    @Then("I should see an error message {string}")
    public void iShouldSeeAnErrorMessage(String arg0) {
        String actualMessage = driver.switchTo().alert().getText();
        assertEquals(arg0, actualMessage);
    }

    @Then("it should stay on SignUp page")
    public void itShouldStayOnSignUpPage() {
        assertEquals(ROOT_URL + "SignUp", driver.getCurrentUrl());
    }

    @When("I click on the {string} hyperlink")
    public void iClockOnTheHyperlink(String arg0) {
        driver.findElement(By.linkText(arg0)).click();
    }

    @After
    public void after() {
        driver.quit();
    }
}
