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
import java.util.List;

import static org.junit.Assert.*;

public class watchlistStepDefinitions {

    private static final String ROOT_URL = "https://localhost:8080/";
    private static WebDriver driver;

    public static final String timestamp = String.valueOf(System.currentTimeMillis());

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
        // options.addArguments("--whitelisted-ips");
        options.setAcceptInsecureCerts(true);
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);

    }

    @Given("I am on the watchlist page")
    public void iAmOnTheWatchlistPage() throws InterruptedException {

        driver.navigate().to(ROOT_URL + "Watchlist");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().to(ROOT_URL + "Watchlist");

        // driver.navigate().refresh();
        Thread.sleep(10000);
    }


    @When("I press the create watchlist button")
    public void iPressTheCreateWatchlistButton() {
        driver.findElement(By.id("createWatchlist")).click();
    }

    @And("I type {string}")
    public void iType(String arg0) {
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[1]/input")).sendKeys(arg0 + timestamp);
    }


    @And("I press the create button")
    public void iPressTheCreateButton() throws InterruptedException {
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();

        // wait for fetch
        Thread.sleep(10000);
    }

    @And("I type {string} into modal")
    public void iTypeIntoModal(String arg0) {
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[1]/input")).sendKeys(arg0);
    }

    @Then("I should see {string} error message on the modal")
    public void iShouldSeeErrorMessageOnTheModal(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @When("I press the edit watchlist button")
    public void iPressTheEditWatchlistButton() {
        driver.findElement(By.xpath("//*[@id=\"editWatchlist\"]")).click();
    }

    @And("I type {string} into edit watchlist modal")
    public void iTypeIntoEditWatchlistModal(String arg0) {

        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div/input")).sendKeys(arg0);


    }

    @And("I type {string} with timestamp")
    public void iTypeWithTimestamp(String arg0) {
        driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[1]/input")).sendKeys(arg0 + timestamp);

    }

    @Then("I should see {string} with timestamp on the page")
    public void iShouldSeeWithTimestampOnThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0 + timestamp));
    }

    @When("I press the delete watchlist button")
    public void iPressTheDeleteWatchlistButton() {
        driver.findElement(By.xpath("//*[@id=\"deleteWatchlist\"]")).click();
    }

    @Then("I should not see {string} on the page")
    public void iShouldNotSeeOnThePage(String arg0) throws InterruptedException {
        Thread.sleep(5000);
        String pageSource = driver.getPageSource();
        assertFalse(pageSource.contains(arg0));
    }

    @When("I press on Watchlist Test Div")
    public void iPressOnWatchlistTestDiv() {
        driver.findElement(By.xpath("//*[contains(text(), 'Watchlist Test')]")).click();
    }


    @And("I click on {string} dropdown item")
    public void iClickOnDropdownItem(String arg0) {
        driver.findElement(By.xpath("//*[text() = '" + arg0 + "']")).click();
    }

    @Then("I should see {string} on {string}")
    public void iShouldSeeOn(String arg0, String arg1) {
        driver.navigate().to(ROOT_URL + "WatchlistDetail");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");
        jsExecutor.executeScript("localStorage.setItem('watchlist', '" + arg1 + "');");
        driver.navigate().refresh();

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration);
        wait.until(ExpectedConditions.textToBePresentInElement(driver.findElement(By.tagName("body")), arg0));

        assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I press the copy button where movie box is {string}")
    public void iPressTheCopyButtonWhereMovieBoxIs(String arg0) {
        // find the div element with text "Iron Man 2"
        WebElement iron_man_div = driver.findElement(By.xpath("//*[contains(text(), '" + arg0 + "')]"));

        WebElement grandParentDiv = (WebElement) ((JavascriptExecutor) driver)
                .executeScript("return arguments[0].parentElement.parentElement;", iron_man_div);

        // find the svg element with data-icon="copy" inside the Iron Man 2 div
        WebElement copy_svg = grandParentDiv.findElement(By.className("fa-copy"));

        // click on the svg element
        copy_svg.click();
    }

    @And("I press the confirm button")
    public void iPressTheConfirmButton() {
        driver.findElement(By.xpath("//*[contains(text(), 'Confirm')]")).click();
    }

    @Given("I am on the watchlist detail page for {string}")
    public void iAmOnTheWatchlistDetailPageFor(String arg0) throws InterruptedException {
        driver.navigate().to(ROOT_URL + "WatchlistDetail");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '642617a23405041b9f616538');");
        jsExecutor.executeScript("localStorage.setItem('watchlist', '" + arg0 + "');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().to(ROOT_URL + "WatchlistDetail");

        // driver.navigate().refresh();
        Thread.sleep(10000);
    }

    @When("I press the {string} where movie is {string}")
    public void iPressTheWhereMovieIs(String arg0, String arg1) {
        Duration duration = Duration.ofSeconds(60);

        WebDriverWait wait = new WebDriverWait(driver, duration); // Wait for up to 60 seconds
        WebElement movie_box_div = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[text() = '" + arg1 + "']")));

        // find the div element with text "arg1"
        // WebElement movie_box_div = driver.findElement(By.xpath("//*[text() = '" + arg1 + "']"));

        // Scroll down to the div element
        // ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(false);", movie_box_div);

        WebElement grandParentDiv = (WebElement) ((JavascriptExecutor) driver)
                .executeScript("return arguments[0].parentElement.parentElement;", movie_box_div);

        // create a new WebDriverWait object
        Duration duration1 = Duration.ofSeconds(60);
        WebDriverWait wait1 = new WebDriverWait(driver, duration1);

        // create a new Actions object
        // Actions actions = new Actions(driver);

        // find the svg element with data-icon="arg0" inside the movie_box div
        WebElement svg = grandParentDiv.findElement(By.className(arg0));

        // scroll to the element
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", svg);

        // wait for the element to be clickable
        wait1.until(ExpectedConditions.elementToBeClickable(svg));

        // move to the element and click it
        // actions.moveToElement(svg).click().perform();
        svg.click();
    }

    @When("I press the change watchlist type button")
    public void iPressTheChangeWatchlistTypeButton() {
        driver.findElement(By.id("watchlistTypeBtn")).click();
    }

    @And("I press the {string} dropdown menu item")
    public void iPressTheDropdownMenuItem(String arg0) {
        driver.findElement(By.id(arg0)).click();
    }

    @And("I press the cancel button")
    public void iPressTheCancelButton() throws InterruptedException {
        driver.findElement(By.xpath("//*[contains(text(), 'Cancel')]")).click();
        Thread.sleep(10000);
    }

    @Then("I should not see the pop-up modal")
    public void iShouldNotSeeThePopUpModal() {

        List<WebElement> elements = driver.findElements(By.id("editMovieModal"));
        assertEquals(0, elements.size());

    }

    @Then("I should see {string} on the watchlist page")
    public void iShouldSeeOnTheWatchlistPage(String arg0) {
        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration);
        wait.until(ExpectedConditions.textToBePresentInElement(driver.findElement(By.tagName("body")), arg0));

        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void after() {
        driver.quit();
    }

    @When("I press the edit watchlist for button for {string}")
    public void iPressTheEditWatchlistForButtonFor(String arg0) {

        WebElement element = driver.findElement(By.xpath("//*[text() = '" + arg0 + "']"));

        WebElement grandParentDiv = (WebElement) ((JavascriptExecutor) driver)
                .executeScript("return arguments[0].parentElement.parentElement;", element);

        Duration duration = Duration.ofSeconds(60);

        // create a new WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // find the copy icon
        WebElement svg = grandParentDiv.findElement(By.className("fa-pen"));

        // wait for the element to be clickable
        wait.until(ExpectedConditions.elementToBeClickable(svg));

        // click on the svg element
        svg.click();

    }

    @When("I press the delete watchlist button for {string}")
    public void iPressTheDeleteWatchlistButtonFor(String arg0) {
        WebElement element = driver.findElement(By.xpath("//*[text() = '" + arg0 + "']"));

        WebElement grandParentDiv = (WebElement) ((JavascriptExecutor) driver)
                .executeScript("return arguments[0].parentElement.parentElement;", element);

        Duration duration = Duration.ofSeconds(60);

        // create a new WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // find the delete icon
        WebElement svg = grandParentDiv.findElement(By.className("fa-trash"));

        // wait for the element to be clickable
        wait.until(ExpectedConditions.elementToBeClickable(svg));

        // click on the svg element
        svg.click();
    }

    @Then("I should not see {string} with timestamp on the page")
    public void iShouldNotSeeWithTimestampOnThePage(String arg0) throws InterruptedException {
        Thread.sleep(5000);
        String pageSource = driver.getPageSource();
        assertFalse(pageSource.contains(arg0 + timestamp));
    }

    @When("I click on {string} button")
    public void iClickOnButton(String arg0) {
        WebElement element = driver.findElement(By.xpath("//*[text() = '" + arg0 + "']"));

        Duration duration = Duration.ofSeconds(60);

        // create a new WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // wait for the element to be clickable
        wait.until(ExpectedConditions.elementToBeClickable(element));

        element.click();

    }

    @And("I click on {string} user")
    public void iClickOnUser(String arg0) {
        WebElement element = driver.findElement(By.xpath("//*[text() = '" + arg0 + "']"));

        Duration duration = Duration.ofSeconds(60);

        // create a new WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // wait for the element to be clickable
        wait.until(ExpectedConditions.elementToBeClickable(element));

        element.click();
    }

    @And("I click on {string} watchlist")
    public void iClickOnWatchlist(String arg0) {
        WebElement element = driver.findElement(By.xpath("//*[text() = '" + arg0 + "']"));

        Duration duration = Duration.ofSeconds(60);

        // create a new WebDriverWait object
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // wait for the element to be clickable
        wait.until(ExpectedConditions.elementToBeClickable(element));

        element.click();
    }


    @When("I press {string} on the navbar")
    public void iPressOnTheNavbar(String arg0) {

        Duration duration = Duration.ofSeconds(60);

        // create an explicit wait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, duration);

        // wait until the link element is located by its visible text
        WebElement link = driver.findElement(By.xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]"));
        wait.until(ExpectedConditions.elementToBeClickable(link));

        // click the link
        link.click();

    }

    @Then("I should be on the Watchlist page")
    public void iShouldBeOnTheWatchlistPage() {
        assertEquals(ROOT_URL + "Watchlist", driver.getCurrentUrl());
    }

    @Then("I should see a list containing union of both users watchlist")
    public void iShouldSeeAListContainingUnionOfBothUsersWatchlist() {
        assertTrue(driver.getPageSource().contains("Iron Man"));
        assertTrue(driver.getPageSource().contains("Iron Man 2"));
        assertTrue(driver.getPageSource().contains("Happy"));
    }

    @Then("I should be on the search page")
    public void iShouldBeOnTheSearchPage() {
        assertEquals(ROOT_URL + "Search", driver.getCurrentUrl());
    }

    @When("I press Search on the navbar")
    public void iPressSearchOnTheNavbar() {
        WebElement element = driver.findElement(By.cssSelector("a.nav-link[href='/Search']"));
        element.click();
    }
}
