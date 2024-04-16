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

# Scroll to load posts
for i in range(10):  # Adjust the range as needed
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)  # Wait for posts to load

# Extract and print post details
posts = driver.find_elements(By.CSS_SELECTOR, "div[data-pagelet='GroupFeed'] div[role='article']")
for post in posts:
    try:
        # Assuming the post text is within a span under an article element
        post_text = post.find_element(By.XPATH, ".//div[contains(@class, 'ecm0bbzt hv4rvrfc ihqw7lf3 dati1w0a')]").text
        print("Post:", post_text)

        # Find and click the comments link to load comments, if not already loaded
        comments_link = post.find_element(By.XPATH, ".//span[contains(text(),'Comments') or contains(text(),'Comment')]")
        comments_link.click()
        time.sleep(1)  # Allow comments to load

        # Extract and print comment details
        comments = post.find_elements(By.XPATH, ".//div[contains(@class, 'tw6a2znq sj5x9vvc d1544ag0 cxgpxx05')]")
        for comment in comments:
            comment_text = comment.text
            print("Comment:", comment_text)
    except Exception as e:
        print("Error extracting post/comment:", str(e))
# Close the browser

driver.quit()
