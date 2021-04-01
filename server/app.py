from flask import Flask, redirect, request, jsonify
import pymongo 
import os
import random
import string

COLLECTION_NAME = "urls"
DATABASE_NAME = "urls-DB"

app = Flask(__name__)
mongoClient = pymongo.MongoClient(os.environ.get('URL_DB_CONNECTION'))#os.environ.get('URL_DB_CONNECTION')) # Connect the mongo client
db = mongoClient[DATABASE_NAME]
col = db[COLLECTION_NAME]

"""
    method: GET
    Redirects to the link the short URL is pointing to or 404 page if not found
"""
@app.route('/<path>', methods=['GET'])
def get_url(path):
    url404 = 'http://ez-url.com/404' # if the item was not found redirect here
    
    try:
        record = col.find_one({ "path": path })
  
        if (not(record)):
            return redirect(url404, code=404)
        
        return redirect(record['link'], code=302)
    except:
       return "database error"
    #return redirect("https://www.google.ca", code=302)
    
"""
    Method: POST
    Adds a new URL and returns the shortened link
"""
@app.route('/submit_url', methods=['POST'])
def submit_url():
   link = request.args['url']
   path = generateRandomPath()
   try: 
       #check if path aleardy exists in db
        while (col.find_one({"path": path})):
           path = generateRandomPath()

        col.insert_one({ "path": path, "link": link })

        return path
   except:
       return "Error submitting url, Please try again"    

"""
    Generate a random string of size 6 containing number, lower and upper case characters

"""
def generateRandomPath():
    character_types = string.ascii_letters + string.digits
    path = ''.join(random.choice(character_types) for i in range(6))
    path_List = list(path)
    random.SystemRandom().shuffle(path_List)
    path = ''.join(path_List)
    return path

if __name__=="__main__":
    app.run()


