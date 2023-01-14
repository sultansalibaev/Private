import asyncio
import time
import json

import aiohttp
import bs4
from selenium import webdriver
from selenium.webdriver.common.by import By

import sys


def extract_links_from_category(category_url, driver):

	def get_page(url):
		driver.get(url)

		# Scroll to load all items
		driver.execute_script("let items = document.querySelector('.category-page-list'); if (items) { window.scrollTo(0, items.offsetHeight - items.offsetTop) }")
		time.sleep(.5)

		# Extract all links
		elements = driver.find_elements(By.CLASS_NAME, "category-page-list__item-link")

		if elements == None:
			with open("not_done_category.text", "w") as f: f.white(url+'\n\n')
			return None

		links = [el.get_attribute("href") for el in elements]

		try:
			# Find pagination
			driver.find_element(By.CLASS_NAME, "category-page-list__paginator")

		except Exception as exc:
			print(exc)
			more_pages = False
			return links, more_pages

		# Check if there are not more pagination pages, so last page is active
		pagination_pages = driver.find_elements(By.CLASS_NAME, "Paginator__List-Item")
		more_pages = "--active" not in pagination_pages[-1].get_attribute("class")

		if more_pages == False:
			print(" --- " + url)
			print(driver.find_element(By.CLASS_NAME, "category-page-list__subtitle").text[8:-7])

		return links, more_pages

	page_counter = 2
	links, more_pages = get_page(category_url)
	while more_pages:
		next_category_url = category_url + "?page=" + str(page_counter)
		next_links, more_pages = get_page(next_category_url)
		links.extend(next_links)
		page_counter += 1

	return links


async def extract_item(item_url, session, load_pages_limit):
	result = {}

	if item_url == None:
		result["url"] = item_url
		result["status"] = "not done"
		return result

	async with load_pages_limit:
		async with session.get(item_url) as resp:
			result["url"] = item_url
			soup = bs4.BeautifulSoup(await resp.read(), "html.parser")
			result["url"] = item_url

			print(result["url"])
			my_title = soup.find("h1", class_="Typography__Title")
			my_price = soup.find(class_="product-info__prices")
			my_vendor_code = soup.find(class_="product-info__sku")
			if None in (my_title, my_vendor_code, my_price):
				result["status"] = "not done"
				print(my_title, my_vendor_code, my_price)
				return result

			result["title"] = my_title.text
			result["price"] = my_price.text
			result["vendor_code"] = my_vendor_code.text
			return result

async def extract_items(links, max_concur_requests=3):
		load_pages_limit = asyncio.Semaphore(max_concur_requests)
		print(len(links))
		async with aiohttp.ClientSession() as session:
			tasks = [extract_item(link, session, load_pages_limit) for link in links]
			return await asyncio.gather(*tasks)



start_time = time.time()

if __name__ == "__main__":

	
	if sys.version_info[0] == 3 and sys.version_info[1] >= 8 and sys.platform.startswith('win'):
		asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

	# CATALOGS = "https://www.technodom.kz/catalog"
	URL = "https://www.technodom.kz/catalog/bytovaja-tehnika/hranenie-produktov-i-napitkov/holodil-niki"
	
	f = open('category.json')

	CATEGORIES = json.load(f)
	CONCURENT_REQUESTS = 3
	driver = webdriver.Chrome(executable_path="./chromedriver")
	results = []
	for category in CATEGORIES:
		links = extract_links_from_category(category, driver)
		results.extend(asyncio.run(extract_items(links, CONCURENT_REQUESTS)))

	driver.close()
	
with open("items.json", "w") as f:
    json.dump(results, f)

end_time = time.time() - start_time


print(f"\nExecution time: {end_time} seconds")
	
	
