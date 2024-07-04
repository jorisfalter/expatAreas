import praw
import csv

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

reddit_secret = os.getenv('REDDIT_SECRET')
reddit_id = os.getenv('REDDIT_ID')

# Setup Reddit API credentials
reddit = praw.Reddit(client_id=reddit_id, client_secret=reddit_secret, user_agent='Amsterdam-last-year')

# Get the top 1,000 posts from the subreddit
top_posts = reddit.subreddit('Amsterdam').new(limit=10)

# Function to fetch all comments from a post
def get_all_comments(submission):
    submission.comments.replace_more(limit=None)
    return submission.comments.list()

# Open a CSV file to write the data
with open('top_1000.csv', 'w', newline='') as csvfile:
    fieldnames = ['title', 'body','score', 'num_comments', 'author']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for post in top_posts:
        print(f'Title: {post.title}')
        writer.writerow({
            'title': post.title,
            'body': post.selftext,
            'score': post.score,
            'num_comments': post.num_comments,
            'author': str(post.author)
        })
        comments = get_all_comments(post)
        for comment in comments:
            writer.writerow({
                # 'title': comment.level,
                'body': comment.body

            })
            print(f'Comment by {comment.author}: {comment.body}')
            # write comments to CVS