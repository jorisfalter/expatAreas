from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

import time

# Initialize the browser
driver = webdriver.Chrome()

# Open Facebook and login
driver.get("https://www.facebook.com")
time.sleep(2)  # Wait for the page to load
driver.find_element(By.ID, "email").send_keys(os.getenv('FB_EMAIL'))
driver.find_element(By.ID, "pass").send_keys(os.getenv('FB_PASS'))
driver.find_element(By.ID, "pass").send_keys(Keys.RETURN)

# Navigate to the group
time.sleep(5)  # Wait for the login to complete
driver.get("https://www.facebook.com/groups/1511516022497356")
time.sleep(5)  # Wait for the loading to complete


last_height = driver.execute_script("return document.body.scrollHeight")
print(last_height)

while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(5)  # More time to load

    new_height = driver.execute_script("return document.body.scrollHeight")
    print(new_height)
    if new_height == last_height:
        break  # Break the loop if no new posts were loaded
    last_height = new_height

# Extract and print post details
posts = driver.find_elements(By.CSS_SELECTOR, "div.x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z")
print(f"Found {len(posts)} posts")  # Debugging output


for post in posts:
    try:
         # Debugging output to check progress
        print("Attempting to extract post text...")

        # Assuming the post text is within a span under an article element
        post_text = post.find_element(By.XPATH, ".//div[contains(@class, 'xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs x126k92a')]").text
        print("Post:", post_text)

        # # Find and click the comments link to load comments, if not already loaded
        # comments_link = post.find_element(By.XPATH, ".//span[contains(text(),'Comments') or contains(text(),'Comment')]")
        # comments_link.click()
        # time.sleep(1)  # Allow comments to load

        # # Extract and print comment details
        # comments = post.find_elements(By.XPATH, ".//div[contains(@class, 'tw6a2znq sj5x9vvc d1544ag0 cxgpxx05')]")
        # for comment in comments:
        #     comment_text = comment.text
        #     print("Comment:", comment_text)
    except Exception as e:
        print("Error extracting post/comment:", str(e))
# Close the browser

driver.quit()
