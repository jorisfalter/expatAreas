from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from time import sleep
from bs4 import BeautifulSoup
import json
import random
import requests
from bs4 import BeautifulSoup
from time import sleep
import csv 
import datetime
today = datetime.date.today()

groupUrl="https://www.facebook.com/groups/NewEraExpats/"
url='https://www.facebook.com/api/graphql/'


h = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9,ar-YE;q=0.8,ar;q=0.7",
    "Content-Length": "2827",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "",
    "Dnt": "1",
    "Origin": "https://www.facebook.com",
    "Priority": "u=1, i",
    "Referer": "https://www.facebook.com/groups/NewEraExpats/?sorting_setting=CHRONOLOGICAL",
    "Sec-Ch-Prefers-Color-Scheme": "dark",
    "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    "Sec-Ch-Ua-Full-Version-List": '"Chromium";v="124.0.6367.208", "Google Chrome";v="124.0.6367.208", "Not-A.Brand";v="99.0.0.0"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Model": '""',
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Ch-Ua-Platform-Version": '"10.0.0"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "X-Asbd-Id": "129477",
    "X-Fb-Friendly-Name": "GroupsCometFeedRegularStoriesPaginationQuery",
    "X-Fb-Lsd": "Z-b6QttFDbsSUKKKkhUjED"
}




options = Options()
options.add_argument(r"user-data-dir=C:\Users\Shatha\AppData\Local\Google\Chrome\User Data")

driver = webdriver.Chrome(options=options)
driver.maximize_window()
driver.implicitly_wait(10)
driver.set_page_load_timeout(50)
driver.get(groupUrl)
page_source = driver.page_source
soup = BeautifulSoup(page_source, "html.parser")

for num,row in enumerate( soup.select('script')):

    if str(row).find('"has_next_page":true}')!=-1 and str(row).find('end_cursor')!=-1  :
        break
json_data = json.loads(str(row).split('json">')[1].replace('</script>',''))

for  i in json_data['require'][0][-1][0]['__bbox']['require']:
   
    if str(i).find('end_cursor')!=-1:
        break
end_cursor=i[-1][-1]['__bbox']['result']['data']['page_info']['end_cursor']
print(end_cursor)


while True:
    try:
        posts=[]
        data = {
        
        "av": 100004893364568,
    "__aaid": "0",
    "__user": "100004893364568",
    "__a": "1",
    "__req": "9",
    "__hs": "19860.HYP:comet_pkg.2.1..2.1",
    "dpr": "1",
    "__ccg": "MODERATE",
    "__rev": "1013589094",
    "__s": "s5bmwp:6ah2a8:65cwdh",
    "__hsi": 7370041346341625719,
    "__dyn": "7xeu4HwkEng5K8G6EjBAg35xu13wsongS3q2ibwNwcyawba1DwUx60GE3Qwb-q1ew65xO321Rw8G11wBz83WwgEcEhwGwQw9m1YwBgao1aU2sx-3m1CK0zEkxe2Gew9O222SUbElxm3y11xe5VUfEe88o5i7U19VoarCwLyES0gq0z8c84q58jyUaUcojxK2B0bK1Iwqo35wjHBU-4EdouwjUy2-",
    "__csr": "gB1Ld7hW4MgllttEQA_RbZ9YSKgJjQJTr9OOmRvJl8GtZRO6rTYJ8zAkKDAhlirClqtdLpqrZGjQjG-SQp5BKcFbG9_qjoyihp9EiJGUGq9udBK9FKFKFVHGiiGy9Aut2kqi_zoKuFqzUigeU-dxfzFEGczonAgSieG2i54u8BwSUWaxWbwyzojKami366rhU4uudG7UdolwmUjxu6Ugwgo24wp8KubxW68CE5yawKwbC3O2C1Rx-10wu8cUG05dU0yS0i60h-0sy0mNBg06Qy00Wt8-06v81TE4-5E08z80gEg0gOw1xe0y46U1Hpax91pFw3bE07CG0Ro5-0bWw",
    "__comet_req": 15,
    "fb_dtsg": "NAcPdAJzbmPNpbEcKU0xeCCd_WjafCfX4ncqPG1qWZKjoBJV9keCOMg:50:1715958178",
    "jazoest": 25555,
    "lsd": "Z-b6QttFDbsSUKKKkhUjED",
    "__spin_r": 1013589094,
    "__spin_b": "trunk",
    "__spin_t": 1715971470,
    "fb_api_caller_class": "RelayModern",
    "fb_api_req_friendly_name": "GroupsCometFeedRegularStoriesPaginationQuery",
    "variables": '{"count":3,"cursor":"'+end_cursor+'","feedLocation":"GROUP","feedType":"DISCUSSION","feedbackSource":0,"focusCommentID":null,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"group","scale":1,"sortingSetting":"CHRONOLOGICAL","stream_initial_count":1,"useDefaultActor":false,"useGroupFeedWithEntQL_EXPERIMENTAL":false,"id":"374703029246504","__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__CometIsAdaptiveUFIEnabledrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":false,"__relay_internal__pv__StoriesRingrelayprovider":false,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false}',
        "server_timestamps": True,
        "doc_id": 6982860548480180
        }
        sleep(random.randint(1,7))
        
        response = requests.post(url, data=data,headers=h)
        print( response.text.split('\/permalink\/'))
        for i in response.text.split('\/permalink\/')[1:]:
            post = i.split(',')[0].replace('"',"").replace('/','').replace('\\','').replace('}','')
            if post not in posts:
                print(post)
                posts.append(post)

        print(posts)
        # save to txt
        with open("posts.txt", "a") as file:
            for item in posts:
                file.write(item + "\n")

        # get the next cursor    
        for cursor in response.text.split('end_cursor'):
            if cursor.find('"has_next_page":true')!=-1:
                end_cursor=cursor.split(',')[0].replace('":"','')[:-1]

        # calculate if is post from a year ago then stop
        check=[]
        for x in response.text.split('publish_time')[1:]:
            timestamp=int(x.replace('\\":','').replace('":','').split(',')[0])
            dt_object = datetime.datetime.utcfromtimestamp(timestamp)
            check.append((today-dt_object.date()).days>=366)
        print(check)
            
        if all(check):
            break
    except  Exception as e:
        print(e)
                        
            
