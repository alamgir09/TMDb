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
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.Assert.assertEquals;

public class SecurityStepDefinitions {
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
        options.setAcceptInsecureCerts(true);
        driver = new ChromeDriver(options);
    }

    @After
    public void after() {
        driver.quit();
    }

    @When("I navigate to the {string} without SSL")
    public void iNavigateToTheWithoutSSL(String arg0) {
        driver.get("http://localhost:8080/" + arg0);
    }

    @Given("I am logged in")
    public void iAmLoggedIn() {
        driver.navigate().to("https://localhost:8080/Watchlist");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));
    }


    @Then("I should see error message and not be able to access the page  without SSl")
    public void iShouldSeeErrorMessageAndNotBeAbleToAccessThePageWithoutSSl() {
        String result = driver.findElement(By.xpath("/html/body/pre")).getText();
        assertEquals("Bad Request\nThis combination of host and port requires TLS.", result);
    }


    @And("I navigate securely to the {string}")
    public void iNavigateSecurelyToThe(String arg0) throws InterruptedException {
        driver.get("https://localhost:8080/" + arg0);

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration);
        WebElement logout = driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/a"));
        wait.until(ExpectedConditions.elementToBeClickable(logout));

        Thread.sleep(5000);

//        driver.navigate().refresh();
    }

    @Then("I should see that I am on the {string} page")
    public void iShouldSeeThatIAmOnThePage(String arg0) {
        driver.navigate().refresh();
        assertEquals(driver.getCurrentUrl(), "https://localhost:8080/" + arg0);
    }

    @Given("I am not logged in")
    public void iAmNotLoggedIn() {
        driver.navigate().to("https://localhost:8080/Watchlist");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', null);");

        driver.navigate().refresh();

    }

    @And("I logout")
    public void iLogout() {
//        Duration duration = Duration.ofSeconds(30);
//
//        WebDriverWait wait = new WebDriverWait(driver, duration);
//        WebElement logout = driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/a"));
//        wait.until(ExpectedConditions.elementToBeClickable(logout));

        driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/a")).click();
    }

    @And("I am inactive for {int} seconds")
    public void iAmInactiveForSeconds(int arg0) throws InterruptedException {
        Thread.sleep(65000);
//        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
//        jsExecutor.executeScript("localStorage.setItem('userID', null);");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return document.getElementsByClassName('container-fluid') !== null;"));



    }

    @When("I enter {string} into username and {string} into password")
    public void iEnterIntoUsernameAndIntoPassword(String arg0, String arg1) {
        driver.findElement(By.id("username")).sendKeys(arg0);
        driver.findElement(By.id("password")).sendKeys(arg1);
    }

    @And("I submit my login credentials")
    public void iSubmitMyLoginCredentials() throws InterruptedException {
        driver.findElement(By.id("submitBtn")).click();
        Thread.sleep(10000);

    }

    @Then("I should see response on the screen {string}")
    public void iShouldSeeResponseOnTheScreen(String arg0) {
        String result = driver.findElement(By.id("response")).getText();
        assertEquals(arg0, result);
    }


    @And("I navigate securely to the {string} without logging in")
    public void iNavigateSecurelyToTheWithoutLoggingIn(String arg0) {
        driver.get("https://localhost:8080/" + arg0);
    }
}
