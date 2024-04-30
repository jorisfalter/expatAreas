from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

import time

# Set up Chrome options
options = Options()
options.add_argument("--disable-notifications")  # Disable all notifications

# Initialize the browser
driver = webdriver.Chrome(options=options)

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
print("last screen height: ",last_height)
counter = 0;

while True:
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(5)  # More time to load

    new_height = driver.execute_script("return document.body.scrollHeight")
    print("new screen height: ",new_height)
    # if new_height == last_height:
    if counter == 2:
        break  # Break the loop if no new posts were loaded
    last_height = new_height
    counter = 2 # for debugging

# Extract and print post details
posts = driver.find_elements(By.CSS_SELECTOR, "div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']")
print(f"Found {len(posts)} posts")  # Debugging output




for post in posts:
    try:
         # Debugging output to check progress
        print("Attempting to extract post text...")

        # Assuming the post text is within a span under an article element
        # post_text = post.find_element(By.XPATH, ".//div[contains(@class, 'xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs')]").text
        # print("Post:", post_text)


        # THIS IS THE WORKING ONE
        # post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
        # for post_text_element in post_texts:
        #     text_content = post_text_element.text
        #     print("Post Text:", text_content)

        # Look for the "View more answers" button within each post
        view_more_answers_buttons = post.find_elements(By.XPATH, ".//div[@role='button'][contains(@class, 'x193iq5w xeuugli')]")
        print(view_more_answers_buttons)


        # Check if the button exists
        if view_more_answers_buttons:
            print("We're in the view more answers")
            # If the button exists, click it
            view_more_answers_button = view_more_answers_buttons[0]  # Assuming there is only one such button per post
            if view_more_answers_button.is_displayed() and view_more_answers_button.is_enabled():
                view_more_answers_button.click()
                # Wait for the additional answers to load, if necessary
                time.sleep(5)  # This is a naive wait; consider using WebDriverWait to wait for a specific condition

        # Extract text from each post
        post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
        for post_text_element in post_texts:
            text_content = post_text_element.text
            print("Post Text:", text_content)


        # # Look for the "View more answers" link within each post
        # # Wait for the clickable button to be visible and clickable
        # view_more_answers_button = WebDriverWait(driver, 20).until(
        #     EC.element_to_be_clickable((By.XPATH, "//div[@role='button'][contains(@class, 'x193iq5w xeuugli')]"))
        # )

        # # Click the button to view more answers
        # view_more_answers_button.click()
        # # Wait for the additional answers to load, if necessary
        # time.sleep(5)  # This is a naive wait; it's better to use WebDriverWait
        # post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
        # for post_text_element in post_texts:
        #     text_content = post_text_element.text
        #     print("Post Text:", text_content)


        # ik moet de modal terug sluiten, ik moet zorgen dat ie geen andere posts gaat lezen buiten de modal
        # ik moet een oplossing hebben als er geen view more answers button is

        # view_more_links = post.find_elements(By.PARTIAL_LINK_TEXT, "View more answers")
        # print(view_more_links)
        # for link in view_more_links:
        #     # Check if the link is visible and clickable before clicking
        #     if link.is_displayed() and link.is_enabled():
        #         link.click()
        #         print("opened view more answers")

               
        #     else:
        #         post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
        #         for post_text_element in post_texts:
        #             text_content = post_text_element.text
        #             print("Post Text:", text_content)
                

        print("End of post")
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
        # print("Error extracting post/comment:", str(e))
        print("Error extracting post/comment:")

# Close the browser

# driver.quit()
