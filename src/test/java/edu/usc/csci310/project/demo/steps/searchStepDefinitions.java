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
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.Assert.*;

public class searchStepDefinitions {

    private static final String ROOT_URL = "https://localhost:8080/";
    private static WebDriver driver;


    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriverManager.chromedriver().setup();

    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        // options.addArguments("--headless");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        options.setAcceptInsecureCerts(true);
        driver = new ChromeDriver(options);
    }

    @After
    public void after() {
        driver.quit();
    }

    @Given("I am on the search page")
    public void iAmOnTheSearchpage() throws InterruptedException {

        driver.navigate().to(ROOT_URL + "Search");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().to(ROOT_URL + "Search");

        Thread.sleep(5000);


    }


    @When("I press the submit search button")
    public void iPressTheSubmitSearchButton() throws InterruptedException {

        driver.findElement(By.xpath("//*[@id=\"search-form\"]/div/button[1]")).click();
        Thread.sleep(1000);
    }


    @Then("I should see {string} in results div")
    public void iShouldSeeInResultsDiv(String arg0) {
        String result = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div[2]/div[1]")).getText();
        assertEquals(arg0, result);
    }

    @When("I enter {string} into search input")
    public void iEnterIntoSearchInput(String arg0) {
        System.out.println(driver.getPageSource());
        driver.findElement(By.className("search")).sendKeys(arg0);

    }

    @Then("I should see {string} title as a result")
    public void iShouldSeeTitleAsAResult(String arg0) {
        Duration duration = Duration.ofSeconds(30);
        WebDriverWait wait = new WebDriverWait(driver, duration);
        wait.until(ExpectedConditions.textToBePresentInElementLocated(By.tagName("body"), arg0));
        assertTrue(driver.getPageSource().contains(arg0));
    }


    @And("I filter by {string}")
    public void iFilterBy(String arg0) {
        Actions action = new Actions(driver);

        WebElement ele = driver.findElement(By.xpath("//*[@id=\"active-nav\"]"));

        action.moveToElement(ele);

        WebElement sub = driver.findElement(By.xpath("//a[text()='" + arg0 + "']"));

        action.moveToElement(sub);

        action.click().build().perform();
    }

    @Then("I should see a title in the result")
    public void iShouldSeeATitleInTheResult() {

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        WebElement childElement = parentElement.findElement(By.className("title"));

        // title is not empty
        assertFalse(childElement.getText().isEmpty());
    }

    @Then("I should see a release date in the result")
    public void iShouldSeeAReleaseDateInTheResult() {

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        WebElement childElement = parentElement.findElement(By.className("release-date"));

        // title is not empty
        assertFalse(childElement.getText().isEmpty());
    }

    @Then("I should see an image in the result")
    public void iShouldSeeAnImageInTheResult() {
        WebElement parentElement = driver.findElement(By.className("movieButton"));
        WebElement childElement = parentElement.findElement(By.tagName("img"));
        String src = childElement.getAttribute("src");

        // src is not empty
        assertFalse(src.isEmpty());

    }

    @Then("I should see a rating in the result")
    public void iShouldSeeARatingInTheResult() {

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        WebElement childElement = parentElement.findElement(By.className("rating"));

        // rating is not empty
        assertFalse(childElement.getText().isEmpty());
    }


    @Then("I should see the filter be {string}")
    public void iShouldSeeTheFilterBe(String arg0) {

        WebElement element = driver.findElement(By.xpath("//*[@id=\"active-nav\"]"));

        assertEquals(arg0, element.getText());
    }

    @When("I press the home button")
    public void iPressTheHomeButton() {

        driver.findElement(By.xpath("//*[@id=\"search-form\"]/div/div/button")).click();


    }

    @Then("I should be on the home page")
    public void iShouldBeOnTheHomePage() {

        assertEquals("http://localhost:8080/", driver.getCurrentUrl());
    }


    @Then("I should see {string} button on hover of a movie")
    public void iShouldSeeButtonOnHoverOfAMovie(String arg0) {

        Actions action = new Actions(driver);

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        action.moveToElement(parentElement).build().perform();

        WebElement addToWatchlistButton = driver.findElement(By.className("fa-plus"));

        assertTrue(addToWatchlistButton != null);

    }

    @Then("I should see the eye icon on hover of a movie")
    public void iShouldSeeTheEyeIconOnHoverOfAMovie() {

        Actions action = new Actions(driver);

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        action.moveToElement(parentElement).build().perform();

        WebElement element = driver.findElement(By.className("eye-icon"));

        // Assert that the element exists
        assertTrue(element.isDisplayed());
    }

    @Then("I should see the dollar icon on hover of a movie")
    public void iShouldSeeTheDollarIconOnHoverOfAMovie() {

        Actions action = new Actions(driver);

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        action.moveToElement(parentElement).build().perform();

        WebElement element = driver.findElement(By.className("dollar-icon"));

        // Assert that the element exists
        assertTrue(element.isDisplayed());
    }

    @Given("I am on the search page with userID")
    public void iAmOnTheSearchPageWithUserID() throws InterruptedException {
        driver.get(ROOT_URL + "Search");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");

        Duration duration = Duration.ofSeconds(30);


        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().refresh();
        Thread.sleep(10000);
    }

    @And("I add the movie to {string}")
    public void iAddTheMovieTo(String arg0) {

        Actions action = new Actions(driver);

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        action.moveToElement(parentElement).build().perform();

        WebElement imgElement = parentElement.findElement(By.tagName("img"));
        String src = imgElement.getAttribute("src");

        //parentElement.findElement(By.xpath("//*[@id='" + src + "']")).click();
        parentElement.findElement(By.className("fa-plus")).click();

        System.out.println(driver.getPageSource());

        driver.findElement(By.xpath("//a[text()='" + arg0 + "']")).click();

    }

    @Then("I should see {string} in {string}")
    public void iShouldSeeIn(String arg0, String arg1) throws InterruptedException {
        driver.get(ROOT_URL + "WatchlistDetail");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");
        jsExecutor.executeScript("localStorage.setItem('watchlist', '" + arg1 + "');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().refresh();
        Thread.sleep(10000);

        assertTrue(driver.getPageSource().contains(arg0));

    }

    @When("I press the myWatchList button")
    public void iPressTheMyWatchListButton() {
        WebElement element = driver.findElement(By.cssSelector("a.nav-link[href='/Watchlist']"));
        element.click();
    }

    @Then("I should be on the Watchlists page")
    public void iShouldBeOnTheWatchlistsPage() {
        assertEquals(ROOT_URL + "Watchlist", driver.getCurrentUrl());
    }

    @Then("I should see {string} rating as a result")
    public void iShouldSeeRatingAsAResult(String arg0) {
        List<WebElement> elements = driver.findElements(By.className("rating"));
        if (elements.size() > 1) {
            WebElement secondElement = elements.get(1);
            String ratingText = secondElement.getText();
            boolean containsQuestionMark = ratingText.contains("?");
            assertTrue(containsQuestionMark);
        }
    }

    @When("I press the Log Out button")
    public void iPressTheLogOutButton() {
        WebElement element = driver.findElement(By.cssSelector("a.nav-link[href='/LogIn']"));
        element.click();
    }

    @Then("I should be on the Log In page")
    public void iShouldBeOnTheLogInPage() {
        assertEquals(ROOT_URL + "LogIn", driver.getCurrentUrl());
    }

    @Then("I should see movies from all years")
    public void iShouldSeeMoviesFromAllYears() {
        String result = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div[2]/div[1]")).getText();
        assertEquals("Showing 70 result(s).", result);
    }

    @And("I select starting year {string}")
    public void iSelectStartingYear(String arg0) {
        driver.findElement(By.id("startDate")).sendKeys(arg0);
    }


    @Then("I should see all movies made after starting year {string}")
    public void iShouldSeeAllMoviesMadeAfterStartingYear(String arg0) {
        int afterYear = Integer.parseInt(arg0) - 1;

        assertFalse(driver.getPageSource().contains(Integer.toString(afterYear)));
    }

    @And("I select ending year {string}")
    public void iSelectEndingYear(String arg0) {
        driver.findElement(By.id("endDate")).sendKeys(arg0);
    }

    @Then("I should see all movies made before starting year {string}")
    public void iShouldSeeAllMoviesMadeBeforeStartingYear(String arg0) {
        int beforeYear = Integer.parseInt(arg0) + 1;

        assertFalse(driver.getPageSource().contains(Integer.toString(beforeYear)));
    }

    @And("I select the dollar icon")
    public void iSelectTheDollarIcon() {
        Actions action = new Actions(driver);

        WebElement parentElement = driver.findElement(By.className("movieButton"));

        action.moveToElement(parentElement).build().perform();

        WebElement dollarIcon = driver.findElement(By.className("fa-dollar-sign"));

        dollarIcon.click();
    }

    @Then("I should be redirected to movie theatre website")
    public void iShouldBeRedirectedToMovieTheatreWebsite() {
        assertEquals("https://www.fandango.com/", driver.getCurrentUrl());
    }

    @Then("I should see {string} on the search page")
    public void iShouldSeeOnTheSearchPage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

}

