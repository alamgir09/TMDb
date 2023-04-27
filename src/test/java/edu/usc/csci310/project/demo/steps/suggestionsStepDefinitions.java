package edu.usc.csci310.project.demo.steps;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.Assert.*;

public class suggestionsStepDefinitions {
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
		options.addArguments("--headless");
		options.addArguments("--disable-extensions");
		options.addArguments("--remote-allow-origins=*");
		driver = new ChromeDriver(options);
	}

	@After
	public void after() {
		driver.quit();
	}

	@Given("I am on the watchlist")
	public void iAmOnTheWatchlist() throws InterruptedException {
		driver.navigate().to("http://localhost:8080/Watchlist");

		JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
		jsExecutor.executeScript("localStorage.setItem('userID', '6438b175a342ef447b35a203');");

		Duration duration = Duration.ofSeconds(30);

		WebDriverWait wait = new WebDriverWait(driver, duration); // wait up to 30 seconds
		wait.until(ExpectedConditions.jsReturnsValue("return localStorage.getItem('userID');"));

		driver.navigate().refresh();
		Thread.sleep(10000);
	}

	@When("I click create suggestion list")
	public void iClickCreateSuggestionList() {
		driver.findElement(By.xpath("//*[@id=\"CreateSuggestionlistButton\"]")).click();
	}

	@And("I make the name {string}")
	public void setName(String arg0) {
		driver.findElement(By.xpath("/html/body/div[3]/div/div/div[2]/form/div[1]/input")).sendKeys(arg0);
	}

	@And("I want {string} movies")
	public void setNumMovies(String arg0) {
		WebElement inputField = driver.findElement(By.cssSelector("[data-testid='numSuggestions']"));
		JavascriptExecutor js = (JavascriptExecutor) driver;
		js.executeScript("arguments[0].value = arguments[1];", inputField, arg0); // Set field value to "5"
		String actualValue = inputField.getAttribute("value");
		System.out.println("mewo: " + arg0);
		assertEquals(arg0, actualValue);
	}

	@And("I enter out of bounds number")
	public void setOutOfBounds() {
		driver.findElement(By.cssSelector("[data-testid='numSuggestions']")).sendKeys("5");
	}

	@And("I select {string}")
	public void setSourceList(String arg0) {
		WebElement selectElement = driver.findElement(By.cssSelector("[data-testid='sourceLists']"));
		List<WebElement> options = selectElement.findElements(By.tagName("option"));

		for (WebElement option : options) {
			String optionText = option.getText();
			if (optionText.contains(arg0)) {
				option.click();
				break;
			}
		}
	}

	@And("I click create")
	public void clickCreate() {
		driver.findElement(By.xpath("/html/body/div[3]/div/div/div[3]/button[2]")).click();
	}

	@And("I click enter")
	public void clickEnter() {
		Actions actions = new Actions(driver);
		actions.sendKeys(Keys.ENTER).perform();
	}

	@Then("I should see Creating Suggestions Based On {string}")
	public void confirmationCreatingSuggestions(String arg0) {
		assertTrue(driver.getPageSource().contains(arg0));
	}

	@Then("I should see Confirmation: Watchlist {string} created")
	public void confirmationWatchlistCreated(String arg0) {
		String expectedText = "Confirmation: Watchlist " + arg0 + " created";
		Duration duration = Duration.ofSeconds(20);
		WebDriverWait wait = new WebDriverWait(driver, duration);
		WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'" + expectedText + "')]")));
		String actualText = element.getText();
		assertEquals(expectedText, actualText);
	}

	@Then("I should see Confirmation: {string} recommendations")
	public void confirmationNumMovies(String arg0) {
		String expectedText = "Confirmation: " + arg0 + " recommendations";
		Duration duration = Duration.ofSeconds(60);
		WebDriverWait wait = new WebDriverWait(driver, duration);
		WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'" + expectedText + "')]")));
		String actualText = element.getText();
		System.out.println("HERE: " + actualText);
		assertEquals(expectedText.toString(), actualText.toString());
	}

	@Then("I should see error {string}")
	public void errorDisplay(String arg0) {
		Duration duration = Duration.ofSeconds(60);
		WebDriverWait wait = new WebDriverWait(driver, duration);
		WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'" + arg0 + "')]")));
		assertEquals(element.getText(), arg0);
	}


}
