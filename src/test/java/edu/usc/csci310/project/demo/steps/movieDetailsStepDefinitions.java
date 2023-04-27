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

import static org.junit.Assert.*;

import java.time.Duration;
import java.util.List;

public class movieDetailsStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
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
//		options.addArguments("--headless");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @After
    public void after() {
        driver.quit();
    }

    @Given("I search for {string}")
    public void search_for_movie(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "Search"); //go to search

        driver.findElement(By.className("search")).sendKeys(arg0); //fill in search field

        driver.findElement(By.xpath("//*[@id=\"search-form\"]/div/button[1]")).click();
        Thread.sleep(1000);
    }

    @Given("I am on the movie details page")
    public void iAmOnTheWatchlistDetailsPage() throws InterruptedException {
        driver.get("http://localhost:3000/movies/1726");
        Thread.sleep(2000);
    }

    @Given("I am on the movie details page for all is lost")
    public void allIsLost() throws InterruptedException {
        driver.get("http://localhost:3000/movies/152747");
        Thread.sleep(2000);
    }

    @When("I click on the top result")
    public void click_movie() {
        Duration duration = Duration.ofSeconds(60);
        WebDriverWait wait = new WebDriverWait(driver, duration);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("movieButton")));
        WebElement parentElement = driver.findElement(By.xpath("/html/body/div/div/div/div[2]/div[3]/div[2]/div"));
        parentElement.click();
    }

    @Then("I should navigate to a new page")
    public void navigate_to_new_page() throws InterruptedException {
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.matches("http://localhost:8080/movies/\\d+"));
        Thread.sleep(2000);
    }

    @And("I should see the movie's title in the result")
    public void verify_movie_title() {
        WebElement title = driver.findElement(By.className("movie-title"));
        assertNotNull(title);
    }

    @And("I should see the movie's image in the result")
    public void verify_movie_image() {
        WebElement image = driver.findElement(By.className("movie-image"));
        assertNotNull(image);
    }

    @And("I should see the movie's genres in the result")
    public void verify_movie_genres() {
        WebElement genre = driver.findElement(By.className("genre"));
        assertNotNull(genre);
    }

    @And("I should see the movie release date in the result")
    public void verify_movie_release_date() {
        WebElement date = driver.findElement(By.className("release-date"));
        assertNotNull(date);
    }

    @And("I should see the movie rating in the result")
    public void verify_movie_rating() {
        WebElement rating = driver.findElement(By.className("rating"));
        assertNotNull(rating);
    }

    @And("I should see the movie’s directors in the result")
    public void verify_movie_directors() {
        WebElement directors = driver.findElement(By.className("director"));
        assertNotNull(directors);
    }

    @And("I should see the movie’s production studios in the result")
    public void verify_movie_studios() {
        WebElement studios = driver.findElement(By.className("studio"));
        assertNotNull(studios);
    }

    @And("I should see the movie cast in the result")
    public void verify_movie_cast() {
        WebElement cast = driver.findElement(By.className("movie-cast"));
        assertNotNull(cast);
    }

    @And("I should see the movie description in the results")
    public void verify_movie_description() {
        WebElement description = driver.findElement(By.className("movie-description"));
        assertNotNull(description);
    }

    @And("the cast list should be horizontally scrollable")
    public void check_cast_list_scrollability() {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

        jsExecutor.executeScript("arguments[0].scrollBy(" + 100 + ",0)", castList);
        assertEquals(100L, jsExecutor.executeScript("return arguments[0].scrollLeft", castList));
    }

    @And("the cast list does fit on the screen")
    public void check_cast_list_size_fit() {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        int castListWidth = castList.getSize().getWidth();
        int viewportWidth = driver.manage().window().getSize().getWidth();

        assertTrue(castListWidth <= viewportWidth);
    }

    @And("the cast list should not be horizontally scrollable")
    public void check_cast_list_scrollability_not() {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

        jsExecutor.executeScript("arguments[0].scrollBy(" + 100 + ",0)", castList);
        assertEquals(0L, jsExecutor.executeScript("return arguments[0].scrollLeft", castList));
    }

    @When("I click on {string} from the cast list")
    public void click_on_actor(String actorName) throws InterruptedException {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        WebElement actorLink = castList.findElement(By.xpath("//button[text()='" + actorName + "']"));
        actorLink.click();
        Thread.sleep(1000);
    }

    @Then("I should navigate to the search page")
    public void navigateToSearchPage() {
        // Assuming driver is the WebDriver instance
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/Search"));
    }

    @And("the search URL should contain Actors")
    public void verifySearchURLContainsActors() {
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/Search/Actors/"));
    }

    @And("the search URL should contain {string}")
    public void verifySearchURLContainsActorName(String actorName) {
        String currentUrl = driver.getCurrentUrl();
//        System.out.println("PRINTING: " + currentUrl);
        String urlActorName = actorName.replaceAll(" ", "%20");
//        System.out.println("New string: " + urlActorName);
        assertTrue(currentUrl.contains("/Search/Actors/" + urlActorName));
    }

    @And("the search field should be {string}")
    public void verifySearchField(String expectedValue) {
        WebElement searchField = driver.findElement(By.xpath("//*[@id=\"search-form\"]/div/input")); // Assuming the search field has name "q"
        String actualValue = searchField.getAttribute("value");
        assert (actualValue.equals(expectedValue));
    }

    @And("the search criteria should say Actors")
    public void verifySearchCriteria() {
        WebElement searchCriteria = driver.findElement(By.xpath("//*[@id=\"active-nav\"]/a")); // Assuming the search criteria has class "search-criteria"
        String actualValue = searchCriteria.getText();
        assert (actualValue.equals("Actors"));
    }

    @When("I click on {string} from the genre list")
    public void click_on_genre(String genre) throws InterruptedException {
        WebElement genreList = driver.findElement(By.className("genre"));
        WebElement genreLink = genreList.findElement(By.xpath("//button[text()='" + genre + "']"));
        genreLink.click();
        Thread.sleep(1000);
    }

    @And("the search URL should contain Keywords")
    public void verifySearchURLContainsGenres() {
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/Search/Keywords/"));
    }

    @And("the search URL should contain {string} genre")
    public void verifySearchURLContainsGenres(String genre) {
        String currentUrl = driver.getCurrentUrl();
//        System.out.println("PRINTING: " + currentUrl);
        String urlGenre = genre.replaceAll(" ", "%20");
        System.out.println("New string: " + urlGenre);
        assertTrue(currentUrl.contains("/Search/Keywords/" + urlGenre));
    }

    @And("the search criteria should say Keywords")
    public void verifySearchCriteriaGenre() {
        WebElement searchCriteria = driver.findElement(By.xpath("//*[@id=\"active-nav\"]/a")); // Assuming the search criteria has class "search-criteria"
        String actualValue = searchCriteria.getText();
        assert (actualValue.equals("Keywords"));
    }

    @And("I add movie to {string}")
    public void findAddToWatchlistButton(String arg0) throws InterruptedException {
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '6438b175a342ef447b35a203');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().refresh();
        Thread.sleep(10000);

        WebElement imgElement = driver.findElement(By.tagName("img"));
        String src = imgElement.getAttribute("src");

//		driver.findElement(By.xpath("//*[@id='" + src + "']")).click();
        WebElement elem = driver.findElement(By.xpath("//*[@id='" + src + "']"));
        assertEquals(elem.getText(), "Add to Watchlist");
        elem.click();

        driver.findElement(By.xpath("//a[text()='" + arg0 + "']")).click();
    }

    @Then("I should see {string} in {string} watchlist")
    public void iShouldSeeIn(String arg0, String arg1) throws InterruptedException {
        driver.get(ROOT_URL + "WatchlistDetail");

        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        jsExecutor.executeScript("localStorage.setItem('userID', '6438b175a342ef447b35a203');");
        jsExecutor.executeScript("localStorage.setItem('watchlist', '" + arg1 + "');");

        Duration duration = Duration.ofSeconds(30);

        WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
        wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

        driver.navigate().refresh();
        Thread.sleep(10000);

        assertTrue(driver.getPageSource().contains(arg0));

    }

    @And("I should see the dollar icon in the result")
    public void findDollarIcon() {
        WebElement element = driver.findElement(By.className("dollar-icon"));
        // Assert that the element exists
        assertTrue(element.isDisplayed());
    }

    @And("I should see the eye icon in the result")
    public void findEyeIcon() {
        WebElement element = driver.findElement(By.className("eye-icon"));
        // Assert that the element exists
        assertTrue(element.isDisplayed());
    }

}

