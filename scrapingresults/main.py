from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from time import sleep
from bs4 import BeautifulSoup
import json

all=[]
groupUrl="https://www.facebook.com/groups/NewEraExpats/"
with open('posts.txt', 'r') as file:
    lines = file.readlines()
my_list = [line.strip() for line in lines]

options = Options()
options.add_argument(r"user-data-dir=C:\Users\Shatha\AppData\Local\Google\Chrome\User Data")
# options.add_argument("profile-directory=Profile 1")
driver = webdriver.Chrome(options=options)
driver.maximize_window()
driver.implicitly_wait(10)
driver.set_page_load_timeout(50)


def openComments():
    while True:
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")
        if len(soup.select('.x78zum5.x1w0mnb.xeuugli span'))>0:
        # if len(driver.find_elements(By.CSS_SELECTOR, '.x78zum5.x1w0mnb.xeuugli span'))>0:
            for btn in driver.find_elements(By.CSS_SELECTOR, '.x78zum5.x1w0mnb.xeuugli span'):
                try:
                    btnLoctation = btn.location
                
                    driver.execute_script("window.scrollTo(" + str(btnLoctation['x']) + "," + str(btnLoctation['y']-500) +");")

                    btn.click()
                    sleep(4)
                except Exception as e:
                    pass
        else:
            break


def openSeeMore():
    while True:
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")
        print(len(soup.select("div:contains('See more')[role='button']")))
        if len(soup.select("div:contains('See more')[role='button']"))>0:
        # if len(driver.find_elements(By.XPATH, "//div[text()='See more' and @role='button']"))>0:

            for btn in driver.find_elements(By.XPATH, "//div[text()='See more' and @role='button']"):
                        try:
                            btnLoctation = btn.location
                    
                            driver.execute_script("window.scrollTo(" + str(btnLoctation['x']) + "," + str(btnLoctation['y']-500) +");")
                            btn.click()
                            sleep(4)
                        except:
                            pass
        else:
            break

def getData(item,soup):
    for num,row in enumerate( soup.select('script')):
        if str(row).find('"comments":')!=-1   :
            break
    for elem in json.loads(str(row).split('json">')[1].replace('</script>',''))['require'][0][-1][0]['__bbox']['require']:
        if str(elem).find('comment_list_renderer')!=-1:
            break

    postText=elem[-1][-1]['__bbox']['result']['data']['node']['comet_sections']['content']['story']['comet_sections']['message_container']['story']['message']['text']
    item["post_text"]=postText
    images=elem[-1][-1]['__bbox']['result']['extensions']['prefetch_uris_v2'][1:]
    item["images"]=images
    return item

def getComments(item,soup):
    comments = []

    for i in soup.select('.x169t7cy.x19f6ikt'):
        comment_text = i.select('.x1lliihq.xjkvuk6.x1iorvi4')[0].text.strip()
        comment_obj = {
            'comment': comment_text,
            'subcomments': []
        }

        for j in i.select('.x1n2onr6.x46jau6'):
            try:
                subcomment_text = j.select_one('.xeaf4i8.x13faqbe .x1lliihq.xjkvuk6.x1iorvi4').text.strip()
                if subcomment_text:
                    subcomment_obj = {
                        'subcomment': subcomment_text,
                        'subsubcomments': []
                    }
                    comment_obj['subcomments'].append(subcomment_obj)

                    subsub_section = j.parent.find_all('div', recursive=False)[-1].select('.xeaf4i8.x13faqbe .x1lliihq.xjkvuk6.x1iorvi4')
                    for k in subsub_section:
                        subsubcomment_text = k.text.strip().replace(comment_text, '')
                        if subsubcomment_text and subsubcomment_text not in [sc['subcomment'] for sc in comment_obj['subcomments']]:
                            subcomment_obj['subsubcomments'].append(subsubcomment_text)

            except Exception as e:
                print(f'Error parsing subcomment: {e}')

        comments.append(comment_obj)
    item['comments']=comments
    return item
    



for post_id in my_list:
    try:

        item={}
        url=groupUrl+'permalink/'+post_id
        print(url)
        item["post_id"]=post_id
        print(item)
        # url='https://www.facebook.com/groups/NewEraExpats/permalink/7837356169647782'
        driver.get(url)
        sleep(4)
        
        openComments()
        openSeeMore()

        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")
        item=getData(item,soup)
        for a_tag in soup.select('.xzsf02u.x1s688f'):
            a_tag.decompose()

        # get comments
        item=getComments(item,soup)
        # all.append(item)

        # Output the result as a JSON string
        json_output = json.dumps(item, indent=4)
        

        # Optionally, write the JSON output to a file
        with open('c.json', 'a') as f:
            f.write(json_output+',')
        # break


    except Exception as e:
        print(f'Error parsing post: {post_id}')
        print(f'Error: {e}')

