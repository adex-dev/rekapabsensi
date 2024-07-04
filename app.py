from flask import Flask
from flask_session import Session
from routing import app

apps = Flask(__name__)
apps.secret_key = 'adexganteng'  # Ganti dengan kunci yang lebih aman
apps.config['SESSION_TYPE'] = 'filesystem'
apps.config['SESSION_PERMANENT'] = False
apps.config['SESSION_USE_SIGNER'] = True
Session(apps)

apps.register_blueprint(app)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv('FLASK_RUN_PORT'))