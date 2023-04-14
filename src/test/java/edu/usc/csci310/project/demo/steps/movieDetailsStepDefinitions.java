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

public class movieDetailsStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private static WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        // WebDriverManager.chromedriver().driverVersion("110.0.5481").setup();
        WebDriverManager.chromedriver().setup();

    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        // options.addArguments("--whitelisted-ips");
        // options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-web-security");
        options.addArguments("--allow-file-access-from-files");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @After
    public void after() {
        //driver.quit();
    }

    @Given("I search for {string}")
    public void search_for_movie(String arg0) throws InterruptedException {
        driver.get(ROOT_URL + "Search"); //go to search

        driver.findElement(By.className("search")).sendKeys(arg0); //fill in search field

        driver.findElement(By.xpath("//*[@id=\"search-form\"]/div/button[1]")).click();
        Thread.sleep(1000);
    }

    @When("I click a movie")
    public void click_movie() {
        WebElement movie = driver.findElement(By.xpath("//*[@id=\"movies-all\"]/div[2]/div"));
        movie.click();
    }

    @Then("I should navigate to a new page")
    public void navigate_to_new_page() {
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.matches("http://localhost:8080/movies/\\d+"));
    }

    @And("I should see the movie's title in the result")
    public void verify_movie_title() {
        WebElement title = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/h1"));
        assertFalse(title.getText().isEmpty());
    }

    @And("I should see the movie's image in the result")
    public void verify_movie_image() {
        WebElement image = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]"));
        assertTrue(image.isDisplayed());
    }

    @And("I should see the movie's genres in the result")
    public void verify_movie_genres() {
        WebElement genres = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[1]"));
        assertFalse(genres.getText().isEmpty());
    }

    @And("I should see the movie release date in the result")
    public void verify_movie_release_date() {
        WebElement releaseDate = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[2]/span[1]"));
        assertFalse(releaseDate.getText().isEmpty());
    }

    @And("I should see the movie rating in the result")
    public void verify_movie_rating() {
        WebElement rating = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[2]/span[2]"));
        assertFalse(rating.getText().isEmpty());
    }

    @And("I should see the movie’s directors in the result")
    public void verify_movie_directors() {
        WebElement director = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/span[1]"));
        assertFalse(director.getText().isEmpty());
    }

    @And("I should see the movie’s production studios in the result")
    public void verify_movie_studios() {
        WebElement studio = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/span[2]"));
        assertFalse(studio.getText().isEmpty());
    }

    @And("I should see the movie cast in the result")
    public void verify_movie_cast() {
        WebElement cast = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[6]"));
        assertFalse(cast.getText().isEmpty());
    }

    @And("I should see the movie description in the results")
    public void verify_movie_description() {
        WebElement description = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[7]"));
        assertFalse(description.getText().isEmpty());
    }

    @And("the cast list does not fit on the screen")
    public void check_cast_list_size() {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        int castListWidth = castList.getSize().getWidth();
        int viewportWidth = driver.manage().window().getSize().getWidth();

        assertTrue(castListWidth > viewportWidth);
    }

    @And("the cast list should be horizontally scrollable")
    public void check_cast_list_scrollability() {
        WebElement castList = driver.findElement(By.className("movie-cast"));
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;

        // scroll the cast list horizontally by 1000 pixels
        jsExecutor.executeScript("arguments[0].scrollBy(1000,0);", castList);

        // verify that the cast list has been scrolled
        int castListScrollLeft = ((Long) jsExecutor.executeScript("return arguments[0].scrollLeft;", castList)).intValue();
        assertTrue(castListScrollLeft > 0);
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

        int castListScrollLeft = ((Long) jsExecutor.executeScript("return arguments[0].scrollLeft;", castList)).intValue();

        assertEquals(0, (int) castListScrollLeft);
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

    @And("the search URL should contain Genres")
    public void verifySearchURLContainsGenres() {
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/Search/Genres/"));
    }

    @And("the search URL should contain {string} genre")
    public void verifySearchURLContainsGenres(String genre) {
        String currentUrl = driver.getCurrentUrl();
//        System.out.println("PRINTING: " + currentUrl);
        String urlGenre = genre.replaceAll(" ", "%20");
        System.out.println("New string: " + urlGenre);
        assertTrue(currentUrl.contains("/Search/Genres/" + urlGenre));
    }

    @And("the search criteria should say Genres")
    public void verifySearchCriteriaGenre() {
        WebElement searchCriteria = driver.findElement(By.xpath("//*[@id=\"active-nav\"]/a")); // Assuming the search criteria has class "search-criteria"
        String actualValue = searchCriteria.getText();
        assert (actualValue.equals("Genres"));
    }

}

