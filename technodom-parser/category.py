import time
import json

from selenium import webdriver
from selenium.webdriver.common.by import By

headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
}


def extract_links_from_category(category_url, driver):

	def get_page(url):
		driver.get(url)

		time.sleep(.5)

		elements = driver.find_elements(By.CLASS_NAME, "catalog-page__subcategory")
		return [el.find_element(By.TAG_NAME, "a").get_attribute("href") for el in elements]

	return get_page(category_url)


start_time = time.time()


driver = webdriver.Chrome(executable_path="./chromedriver")
def get_links(driver):
    links = extract_links_from_category("https://www.technodom.kz/catalog", driver)
	
    with open("category.json", "w") as f:
        json.dump(links, f)


get_links(driver)


end_time = time.time() - start_time


print(f"\nExecution time: {end_time} seconds")
	
	
