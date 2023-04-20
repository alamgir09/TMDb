//package edu.usc.csci310.project.demo.steps;
//
//import io.cucumber.java.After;
//import io.cucumber.java.Before;
//import io.cucumber.java.BeforeAll;
//import io.cucumber.java.en.And;
//import io.cucumber.java.en.Given;
//import io.cucumber.java.en.Then;
//import io.cucumber.java.en.When;
//import io.github.bonigarcia.wdm.WebDriverManager;
//import org.openqa.selenium.By;
//import org.openqa.selenium.JavascriptExecutor;
//import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//import org.openqa.selenium.chrome.ChromeOptions;
//import org.openqa.selenium.interactions.Actions;
//import org.openqa.selenium.support.ui.ExpectedConditions;
//import org.openqa.selenium.support.ui.WebDriverWait;
//
//import java.time.Duration;
//import java.util.List;
//
//import static org.junit.Assert.*;
//public class MontageStepDefinitions {
//    private static final String ROOT_URL = "http://localhost:8080/";
//    private static WebDriver driver;
//
//    public static final String timestamp = String.valueOf(System.currentTimeMillis());
//
//    @BeforeAll
//    public static void beforeAll() {
//        System.out.println("Setting Up Cucumber Driver");
//        System.setProperty("webdriver.http.factory", "jdk-http-client");
//        WebDriverManager.chromedriver().setup();
//
//    }
//
//    @Before
//    public void before() {
//        ChromeOptions options = new ChromeOptions();
////        options.addArguments("--headless");
//        // options.addArguments("--whitelisted-ips");
//        options.addArguments("--disable-extensions");
//        options.addArguments("--remote-allow-origins=*");
//        driver = new ChromeDriver(options);
//
//    }
//
//    @After
//    public void after() {
//        driver.quit();
//    }
//
//    @Given("I am on watchlist detail page for watchlist {string}")
//    public void iAmOnTheWatchlistDetailPageForMontage(String arg0) throws InterruptedException {
//        driver.navigate().to("http://localhost:8080/WatchlistDetail");
//
//        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
//        jsExecutor.executeScript("localStorage.setItem('userID', '6440816539efa11e9b641da6');");
//        jsExecutor.executeScript("localStorage.setItem('watchlist', '" + arg0 + "');");
//
//        Duration duration = Duration.ofSeconds(30);
//
//        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
//        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));
//        wait.until(ExpectedConditions.jsReturnsValue("return document.getElementById('create-montage') !== null;"));
//        wait.until(ExpectedConditions.jsReturnsValue("return document.getElementsByClassName('movie-row-watchlist') !== null;"));
//
//        driver.navigate().refresh();
//        Thread.sleep(1000);
//    }
//
//    @When("I press the create montage button")
//    public void iPressTheCreateMontageButton() throws InterruptedException {
//        driver.findElement(By.id("create-montage")).click();
//        Thread.sleep(1000);
//    }
//
//    @Then("I should be on montage page")
//    public void iShouldBeOnMontagePage() {
//        assertEquals("http://localhost:8080/Montage", driver.getCurrentUrl());
//    }
//
//    @Then("I should see image from movie id {string}")
//    public void iShouldSeeImageFromMovieId(String arg0) throws InterruptedException {
//        Duration duration = Duration.ofSeconds(60);
//        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
//
//        wait.until(ExpectedConditions.jsReturnsValue("return document.getElementById('collage') !== null;"));
//        wait.until(ExpectedConditions.jsReturnsValue("return document.getElementsByClassName('" + arg0 + "') !== null;"));
//        Thread.sleep(10000);
//
//        List<WebElement> images = driver.findElements(By.className(arg0));
//        System.out.println("num images: " + images.size());
//
//        assertTrue("# of images for movie > 0", images.size() > 0);
//
//    }
//}
