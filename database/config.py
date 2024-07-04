import mysql.connector as mysql
import os
from dotenv import load_dotenv
load_dotenv()

def get_database_connection():
    try:
        connection = mysql.connect(
            host=os.getenv('DB_HOST'),
            user= os.getenv('DB_USER'),
            password= os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            port=os.getenv('DB_PORT')
        )
        if connection.is_connected():
            return connection
    except mysql.Error as err:
        print(f"Error: {err}")
        return None