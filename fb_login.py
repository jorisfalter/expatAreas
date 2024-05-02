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
# posts = driver.find_elements(By.CSS_SELECTOR, "div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']")
posts = driver.find_elements(By.CSS_SELECTOR, "div[class*='x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z']")


print(f"Found {len(posts)} posts")  # Debugging output

for post in posts:
    try:
         # Debugging output to check progress
        print("We started on a new post")

        # Look for the "View more answers" button within each post
        # view_more_answers_buttons = post.find_elements(By.XPATH, ".//div[@role='button'][contains(@class, 'x193iq5w xeuugli')]")
        view_more_answers_buttons = post.find_elements(By.XPATH, ".//div[@role='button']")
        if view_more_answers_buttons:
            print("found buttons")
            for button in view_more_answers_buttons:
                # search on the classes of the span below the button
                spans = button.find_elements(By.CSS_SELECTOR, "span.x78zum5.x1w0mnb.xeuugli")
                if spans:
                    print("found a button")
                    button.click()  # Click the button
                    input("Press Enter to continue...")



        # # Keeping view more answers on hold for now - it's confusing
        # # Check if the button exists
        # if view_more_answers_buttons:
        #     print("We found a view more answers button")
        #     # If the button exists, click it
        #     view_more_answers_button = view_more_answers_buttons[0]  # Assuming there is only one such button per post
        #     print(view_more_answers_buttons)
        #     print(view_more_answers_button)
        #     print("displayed", view_more_answers_button.is_displayed()) # this was always false
        #     print("enabled", view_more_answers_button.is_enabled())
        #     # if view_more_answers_button.is_displayed() and view_more_answers_button.is_enabled():
        #     if view_more_answers_button.is_enabled():

        #         print("We're going to click view more answers")
        #         view_more_answers_button.click()
        #         print("We're clicked view more answers")
        #         input("Press Enter to continue...")

        #         # Wait for the additional answers to load, if necessary
        #         # Assume you've navigated to and opened the modal
        #         # Wait for the modal to be visible
        #         print("We're going to check the modal")
        #         # modal = WebDriverWait(driver, 20).until(
        #         #     EC.visibility_of_element_located((By.XPATH, "//div[@role='dialog']"))
        #         # )
        #         modal = driver.find_elements(By.XPATH,"//div[@role='dialog']")

        #         print(modal)
        #         # Find all comments within the modal
        #         # Adjust the selector based on actual structure
        #         comments = modal.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
                
        #         print(f"Found {len(comments)} comments")  # Debugging output
        #         for post_text_element in comments:
        #             text_content = post_text_element.text
        #             print("Modal Comment Text:", text_content)

        #         # # Extract text from each post
        #         # post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
         
        #         print("finished the view more answers")

        # ik moet de modal terug sluiten, ik moet zorgen dat ie geen andere posts gaat lezen buiten de modal


        # Extract text from each post
        # else:
        #     post_texts = post.find_elements(By.XPATH, ".//div[contains(@style, 'text-align: start')]")
        #     for post_text_element in post_texts:
                
        #         # for debugging
        #         # inner_html = post_text_element.get_attribute('innerHTML')
        #         # print("InnerHTML:", inner_html)

        #         text_content = post_text_element.text
        #         print("Post content:", text_content)

        print("End of this post")

    except Exception as e:
        # print("Error extracting post/comment:", str(e))
        print("Error extracting post/comment:")

# Close the browser

# driver.quit()
