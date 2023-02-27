package edu.usc.csci310.project.demo.steps;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class CounterStepDefinitions {

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

    @Given("I am on endpoint {string}")
    public void iAmOnEndpoint(String arg0) {
        driver.get(ROOT_URL + arg0);
    }

    @When("I click on the increment counter button")
    public void iClickOnTheIncrementCounterButton() {
        driver.findElement(By.id("incrementcounter")).click();
    }

    @Then("I should see the text update to {string}")
    public void iShouldSeeTheTextUpdateTo(String arg0) {
        assertEquals(driver.findElement(By.id("counter")).getText(), arg0);
    }

    @When("I click on the clear counter button")
    public void iClickOnTheClearCounterButton() {
        driver.findElement(By.id("clearcounter")).click();
    }
}
